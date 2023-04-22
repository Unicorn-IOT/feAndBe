import { status200 } from '../../../libs/http/status200';
import { status400 } from '../../../libs/http/status400';
import { status403 } from '../../../libs/http/status403';
import { useDB, withDB } from '../../../libs/wrapper/withDB';
import { withHttp } from '../../../libs/wrapper/withHttp';
import { Lambda } from '../../../../../types/lambda';
import { MesurementAttributes, TYPE } from '../../../libs/database/models/mesurement';
import { ONE_DAY, ONE_HOUR, ONE_MINUTE, ONE_MONTH } from '../../../projectConstants';
import { z } from 'zod';

const GranularityUnit = z.enum(['minutes', 'hours', 'days', 'months']);

const QueryParamsSchema = z.object({
	type: z.string().regex(/^((temperature|humidity)|temperature,humidity|humidity,temperature)$/),
	userId: z.string().regex(/^(?!0)\d{1,3}$/),
	startDate: z.string().datetime({ offset: true }),
	endDate: z.string().datetime({ offset: true }),
	granularity: z.string().regex(/^[1-9]|[1-5][0-9]|60$/),
	granularityUnit: GranularityUnit,
});

export const handler: Lambda = withHttp(
	withDB(async ({ queryStringParameters }) => {
		if (!queryStringParameters) return status400();

		const parsedQueryParams = QueryParamsSchema.parse(queryStringParameters);
		const { type, userId, startDate, endDate, granularity, granularityUnit } = parsedQueryParams;

		if (!type || !userId || !startDate || !endDate || !granularity || !granularityUnit) return status400();
		if (new Date(endDate) < new Date(startDate)) return status403();

		const parsedGranularity = parseInt(parsedQueryParams.granularity);
		const diffDates = new Date(endDate).getTime() - new Date(startDate).getTime();

		switch (granularityUnit) {
			case 'minutes':
				if (diffDates >= ONE_DAY || parsedGranularity < 5 || parsedGranularity > 60) return status403();
				break;
			case 'hours':
				if (diffDates >= ONE_MONTH || parsedGranularity < 1 || parsedGranularity > 24) return status403();
				break;
			case 'days':
				if (diffDates >= ONE_MONTH * 3 || parsedGranularity < 1 || parsedGranularity > 30) return status403();
				break;
			case 'months':
				if (diffDates >= ONE_MONTH * 24 || parsedGranularity < 1 || parsedGranularity > 12) return status403();
				break;
			default:
				return status403();
		}

		const { Mesurement } = await useDB();

		const types = type.split(',') as TYPE[];

		const result = await Mesurement.findBetweenDates(types, parseInt(parsedQueryParams.userId), new Date(startDate), new Date(endDate));

		//granularity 1 hodinu

		const time =
			granularityUnit === 'minutes'
				? ONE_MINUTE
				: granularityUnit === 'hours'
				? ONE_HOUR
				: granularityUnit === 'days'
				? ONE_DAY
				: granularityUnit === 'months'
				? ONE_MONTH
				: undefined;
		if (!time) return status400();

		const multipliedTime = time * parsedGranularity;

		const finalResult = result.reduce<MesurementAttributes[]>((acc, currentItem) => {
			if (acc.length === 0) acc.push(currentItem);

			const lastItem = acc[acc.length - 1];
			const limitTime = new Date(lastItem.date.getTime() - multipliedTime);

			if (currentItem.date <= limitTime) acc.push(currentItem);
			return acc;
		}, []);

		return status200({ data: { finalResult } });
	}),
);

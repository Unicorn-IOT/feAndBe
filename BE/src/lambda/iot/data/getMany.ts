import { status200 } from '../../../libs/http/status200';
import { status400 } from '../../../libs/http/status400';
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
		if (new Date(endDate) < new Date(startDate)) return status400({ data: { msg: 'StartDate has to be smaller than endDate' } });
		const parsedGranularity = parseInt(parsedQueryParams.granularity);

		switch (granularityUnit) {
			case 'minutes':
				if (parsedGranularity < 5 || parsedGranularity > 60)
					return status400({ data: { msg: 'For minutes the granularity has to be between 5 and 60' } });
				break;
			case 'hours':
				if (parsedGranularity < 1 || parsedGranularity > 24)
					return status400({ data: { msg: 'For hours the granularity has to be between 1 and 24' } });
				break;
			case 'days':
				if (parsedGranularity < 1 || parsedGranularity > 30)
					return status400({ data: { msg: 'For days the granularity has to be between 1 and 30' } });
				break;
			case 'months':
				if (parsedGranularity < 1 || parsedGranularity > 12)
					return status400({ data: { msg: 'For months the granularity has to be between 1 and 12' } });
				break;
			default:
				return status400();
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
		const hum = result.filter((item) => item.type === TYPE.HUMIDITY);
		const temp = result.filter((item) => item.type === TYPE.TEMPERATURE);

		const temperatureResult = temp.reduce<MesurementAttributes[]>((temperatureAcc, currentItem) => {
			if (temperatureAcc.length === 0) temperatureAcc.push(currentItem);
			const lastItem = temperatureAcc[temperatureAcc.length - 1];
			const limitTime = new Date(lastItem.date.getTime() - multipliedTime);

			if (currentItem.date <= limitTime) temperatureAcc.push(currentItem);
			return temperatureAcc;
		}, []);

		const humidityResult = hum.reduce<MesurementAttributes[]>((humidityAcc, currentItem) => {
			if (humidityAcc.length === 0) humidityAcc.push(currentItem);
			const lastItem = humidityAcc[humidityAcc.length - 1];
			const limitTime = new Date(lastItem.date.getTime() - multipliedTime);

			if (currentItem.date <= limitTime) humidityAcc.push(currentItem);
			return humidityAcc;
		}, []);

		const finalResult = temperatureResult.concat(humidityResult);
		finalResult.sort((a, b) => b.date.getTime() - a.date.getTime());

		return status200({ data: { finalResult } });
	}),
);

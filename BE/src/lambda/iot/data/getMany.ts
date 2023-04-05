import { status200 } from '../../../libs/http/status200';
import { status400 } from '../../../libs/http/status400';
import { useDB, withDB } from '../../../libs/wrapper/withDB';
import { withHttp } from '../../../libs/wrapper/withHttp';
import { Lambda } from '../../../../../types/lambda';
import { MesurementAttributes, TYPE } from 'libs/database/models/mesurement';
import { ONE_DAY, ONE_HOUR, ONE_MINUTE, ONE_MONTH } from 'projectConstants';

export const handler: Lambda = withHttp(
	withDB(async ({ queryStringParameters }) => {
		if (!queryStringParameters) return status400();
		const { type, userId, endDate, granularity, granularityUnit } = queryStringParameters;
		if (!type || !userId || !endDate || !granularity || !granularityUnit) return status400();

		const parsedGranularity = parseInt(granularity);

		if (granularityUnit === 'minutes' && parsedGranularity < 5) return status400();
		if (new Date(endDate) < new Date(new Date().getTime() - ONE_MONTH * 12) && granularityUnit === 'minutes' && parsedGranularity < 10)
			return status400();

		const { Mesurement } = await useDB();

		const types = type.split(',') as TYPE[];

		const result = await Mesurement.findBetweenDates(new Date(endDate), types, parseInt(userId));

		//granularity 1 hodinu

		const time =
			granularityUnit === 'minutes'
				? ONE_MINUTE
				: granularityUnit === 'hours'
				? ONE_HOUR
				: granularityUnit === 'days'
				? ONE_DAY
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

import { status200 } from '../../../libs/http/status200';
import { status400 } from '../../../libs/http/status400';
import { useDB, withDB } from '../../../libs/wrapper/withDB';
import { withHttp } from '../../../libs/wrapper/withHttp';
import { Lambda } from '../../../../../types/lambda';
import { Op } from 'sequelize';

export const handler: Lambda = withHttp(
	withDB(async ({ queryStringParameters }) => {
		if (!queryStringParameters) return status400();
		const { type, userId, startDate, endDate } = queryStringParameters;
		if (!type || !userId || !startDate || !endDate) return status400();

		const { Mesurement } = await useDB();

		const types = type.split(',');
		const measurementWhereClauses = types.map((t) => {
			return {
				type: {
					[Op.eq]: t,
				},
				userId: {
					[Op.eq]: userId,
				},
			};
		});

		const temperatureData = await Mesurement.findBetweenDates(new Date(startDate), new Date(endDate), measurementWhereClauses);

		return status200({ data: { temperatureData } });
	}),
);

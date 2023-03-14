import { status200 } from '../../libs/http/status200';
import { status400 } from '../../libs/http/status400';
import { useDB, withDB } from '../../libs/wrapper/withDB';
import { withHttp } from '../../libs/wrapper/withHttp';
import { Lambda } from '../../../../types/lambda';
import { Op } from 'sequelize';

export const handler: Lambda = withHttp(
	withDB(async ({ queryStringParameters }) => {
		if (!queryStringParameters) return status400();
		const { type, userId, days } = queryStringParameters;
		if (!type || !userId || !days) return status400();

		const { Mesurement } = await useDB();

		const types = type.split(','); // hodnoty oddělené čárkou -> pole

		// data z databáze v rozmezí od 1 minuty do dnů pro všechny typy
		const measurementWhereClauses = types.map((t) => {
			return {
				type: {
					[Op.eq]: t,
				},
				userId: {
					[Op.eq]: userId,
				},
				createdAt: {
					[Op.gte]: new Date(new Date().getTime() - 60 * 1000 * 60 * 24 * parseInt(days)),
				},
			};
		});

		const temperatureData = await Mesurement.findAll({
			where: {
				[Op.or]: measurementWhereClauses,
			},
			order: [['createdAt', 'DESC']],
		});

		return status200({ data: { temperatureData } });
	}),
);

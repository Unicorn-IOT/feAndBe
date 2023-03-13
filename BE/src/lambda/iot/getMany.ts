import { status200 } from '../../libs/http/status200';
import { status400 } from '../../libs/http/status400';
import { useDB, withDB } from '../../libs/wrapper/withDB';
import { withHttp } from '../../libs/wrapper/withHttp';
import { Lambda } from '../../../../types/lambda';
import { Op } from 'sequelize';

export const handler: Lambda = withHttp(
	withDB(async ({ body }) => {
		//const user = useUser();
		// const payload = await user.getPayload();
		// const token = await user.getToken(payload);
		console.log(body);
		if (!body) return status400();
		const { type, userId, days } = JSON.parse(body); // získání dat z requestu dny
		if (!type || !userId || !days) return status400();

		const { Mesurement } = await useDB();

		// Získání teplotních dat z databáze v rozmezí od 1 minuty do 1 dne
		const temperatureData = await Mesurement.findAll({
			//pipeline
			where: {
				createdAt: {
					[Op.gte]: new Date(new Date().getTime() - 60 * 1000 * 60 * 24 * days), // od 1 minuty zpět
				},
				type: {
					[Op.eq]: type,
				},
				userId: {
					[Op.eq]: userId,
				},
			},
			order: [['createdAt', 'DESC']],
		});

		return status200({ data: { temperatureData } });
	}),
);

import { status200 } from '../../libs/http/status200';
import { useDB, withDB } from '../../libs/wrapper/withDB';
import { withHttp } from '../../libs/wrapper/withHttp';
import { withUser, useUser } from '../../libs/wrapper/withUser';
import { Lambda } from '../../../../types/lambda';
import { Op } from 'sequelize';
import { Mesurement } from 'libs/database/models/mesurement';

export const handler: Lambda = withHttp(
	withDB(
		withUser(async ({ body }) => {
			const user = useUser();
			const payload = await user.getPayload();
			const token = await user.getToken(payload);
			const db = await useDB();
			// TO FIX: const { Mesurement } = await useDB();
			const { value, type } = JSON.parse(body); // získání dat z requestu dny
			if (!value || !type) return status400();

			// Získání teplotních dat z databáze v rozmezí od 1 minuty do 1 dne
			const temperatureData = await Mesurement.findAll({
				//pipeline
				where: {
					createdAt: {
						[Op.lte]: new Date(new Date().getTime() - 60 * 1000 * 60 * 24 * days), // od 1 minuty zpět
					},
				},
				order: [['createdAt', 'DESC']],
			});

			return status200({ data: { temperatureData } });
		}),
	),
);

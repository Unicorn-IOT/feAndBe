import { status200 } from '../../libs/http/status200';
import { useDB, withDB } from '../../libs/wrapper/withDB';
import { withHttp } from '../../libs/wrapper/withHttp';
import { withUser, useUser } from '../../libs/wrapper/withUser';
import { Lambda } from '../../../../types/lambda';
import { Op } from 'sequelize';
import { Mesurement } from 'libs/database/models/mesurement';

export const handler: Lambda = withHttp(
	withUser(
		withDB(async () => {
			const user = useUser();
			const payload = await user.getPayload();
			const token = await user.getToken(payload);
			const db = await useDB();

			// Získání teplotních dat z databáze v rozmezí od 1 minuty do 1 dne
			const temperatureData = await Mesurement.findAll({
				//pipeline
				where: {
					createdAt: {
						[Op.gte]: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // od 1 dne zpět
						[Op.lte]: new Date(new Date().getTime() - 60 * 1000), // od 1 minuty zpět
					},
				},
				order: [['createdAt', 'DESC']],
			});

			const temperatures = temperatureData.map((temp) => temp.temperature);

			return status200({ data: { temperatures, user: payload, token } });
		}),
	),
);

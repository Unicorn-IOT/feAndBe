import { status200 } from '../../libs/http/status200';
import { withDB } from '../../libs/wrapper/withDB';
import { withHttp } from '../../libs/wrapper/withHttp';
import { withUser, useUser } from '../../libs/wrapper/withUser';
import { Lambda } from '../../../../types/lambda';
import { Mesurement } from 'libs/database/models/mesurement';

// Endpoint pro získání posledního záznamu z DB

export const handler: Lambda = withHttp(
	withDB(
		withUser(async () => {
			// uživatel
			const user = useUser();
			const payload = await user.getPayload();
			const token = await user.getToken(payload);

			// poslední záznamu z databáze
			const measurement = await Mesurement.findOne({
				order: [['createdAt', 'DESC']],
			});

			// výsledek
			return status200({ data: { measurement, user: payload, token } });
		}),
	),
);

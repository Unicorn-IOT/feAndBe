import { status200 } from '../../libs/http/status200';
import { withDB } from '../../libs/wrapper/withDB';
import { withHttp } from '../../libs/wrapper/withHttp';
import { Lambda } from '../../../../types/lambda';
import { Mesurement } from 'libs/database/models/mesurement';

// Endpoint pro získání posledního záznamu z DB

export const handler: Lambda = withHttp(
	withDB(async () => {
		// poslední záznamu z databáze
		const measurement = await Mesurement.findOne({
			order: [['createdAt', 'DESC']],
		});

		// výsledek
		return status200({ data: { measurement } });
	}),
);

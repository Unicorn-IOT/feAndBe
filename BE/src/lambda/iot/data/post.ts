import { status200 } from '../../../libs/http/status200';
import { status400 } from '../../../libs/http/status400';
import { useDB, withDB } from '../../../libs/wrapper/withDB';
import { withHttp } from '../../../libs/wrapper/withHttp';
import { useUser } from '../../../libs/wrapper/withUser';
import { Lambda } from '../../../../../types/lambda';
import { withRole } from 'libs/wrapper/withRole';
import { Role } from 'libs/database/models/user';

// Endpoint pro zápis dat z IoT do DB

export const handler: Lambda = withHttp(
	withDB(
		withRole([Role.IOT], async ({ body }) => {
			// získání dat z requestu
			if (!body) return status400();
			const { value, type, location, date } = JSON.parse(body);
			if (!value || !type || !location || !date) return status400();

			// nalezení uživatele
			const user = useUser();

			// uložení záznamu do DB
			const { Mesurement } = await useDB();
			const measurement = await Mesurement.create({
				value,
				type,
				userId: user.id,
				location,
				date,
			});

			// výsledek
			return status200({ data: { measurement } });
		}),
	),
);

import { status200 } from '../../libs/http/status200';
import { status400 } from '../../libs/http/status400';
import { useDB, withDB } from '../../libs/wrapper/withDB';
import { withHttp } from '../../libs/wrapper/withHttp';
import { withUser, useUser } from '../../libs/wrapper/withUser';
import { Lambda } from '../../../../types/lambda';
import { User } from 'libs/database/models/user';
import { withRole } from 'libs/wrapper/withRole';
import { Role } from 'libs/database/models/user';

// Endpoint pro zápis dat z IoT do DB

export const handler: Lambda = withHttp(
	withDB(
		// TODO: odstranit roli USER
		withRole([Role.IOT, Role.USER], async ({ body }) => {
			// získání dat z requestu
			if (!body) return status400();
			const { value, type } = JSON.parse(body);
			if (!value || !type) return status400();

			// nalezení uživatele
			const user = useUser();

			// uložení záznamu do DB
			const { Mesurement } = await useDB();
			const measurement = await Mesurement.create({
				value,
				type,
				userId: user.id,
			});

			// výsledek
			return status200({ data: { measurement } });
		}),
	),
);

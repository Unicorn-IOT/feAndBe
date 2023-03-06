import { status200 } from '../../libs/http/status200';
import { status400 } from '../../libs/http/status400';
import { withDB } from '../../libs/wrapper/withDB';
import { withHttp } from '../../libs/wrapper/withHttp';
import { withUser } from '../../libs/wrapper/withUser';
import { Lambda } from '../../../../types/lambda';
import { Mesurement, TYPE } from 'libs/database/models/mesurement';
import { User } from 'libs/database/models/user';
import { withRole } from 'libs/wrapper/withRole';
import { Role } from 'libs/database/models/user';

// Endpoint pro zápis dat z IoT do DB

export const handler: Lambda = withHttp(
	withDB(
		withUser(
			withRole([Role.IOT], async (event) => {
				// získání dat z requestu
				const { value, type } = event.body;

				// nalezení uživatele
				const user = await User.findOne({ where: { role: Role.IOT } });
				if (!user) {
					return status400();
				}

				// uložení záznamu do DB
				const measurement = await Mesurement.create({
					value,
					type,
					userId: user.id,
				});

				// výsledek
				return status200({ data: { measurement } });
			}),
		),
	),
);

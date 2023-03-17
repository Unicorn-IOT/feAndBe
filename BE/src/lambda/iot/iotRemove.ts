import { status200 } from '../../libs/http/status200';
import { withDB } from '../../libs/wrapper/withDB';
import { withHttp } from '../../libs/wrapper/withHttp';
import { useUser, withUser } from '../../libs/wrapper/withUser';
import { Lambda } from '../../../../types/lambda';
import { User } from 'libs/database/models/user';
import { status403 } from 'libs/http/status403';

export const handler: Lambda = withHttp(
	withDB(
		withUser(async () => {
			const user = useUser();
			if (user.role !== 'iot') {
				// Pokud uživatel nemá roli iot
				return status403();
			}
			await User.destroy({ where: { id: user.id } });

			return status200();
		}),
	),
);

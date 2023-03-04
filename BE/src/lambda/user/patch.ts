import { status200 } from '../../libs/http/status200';
import { status400 } from '../../libs/http/status400';
import { withDB } from '../../libs/wrapper/withDB';
import { withHttp } from '../../libs/wrapper/withHttp';
import { useUser, withUser } from '../../libs/wrapper/withUser';
import { Lambda } from '../../../../types/lambda';

export const handler: Lambda = withHttp(
	withDB(
		withUser(async ({ body }) => {
			if (!body) return status400();
			const { name } = JSON.parse(body);
			if (!name) return status400();

			const user = useUser();
			await user.update({ name });

			return status200();
		}),
	),
);

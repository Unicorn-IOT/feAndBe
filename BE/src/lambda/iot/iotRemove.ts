import { status200 } from '../../libs/http/status200';
import { status403 } from '../../libs/http/status403';
import { status400 } from '../../libs/http/status400';
import { status404 } from '../../libs/http/status404';
import { useDB, withDB } from '../../libs/wrapper/withDB';
import { withHttp } from '../../libs/wrapper/withHttp';
import { useUser, withUser } from '../../libs/wrapper/withUser';
import { Lambda } from '../../../../types/lambda';

export const handler: Lambda = withHttp(
	withDB(
		withUser(async ({ body }) => {
			if (!body) return status400();

			const { id } = JSON.parse(body);
			if (!id) return status400();

			console.log('id', id);

			const user = useUser();
			const emailId = user.emailId;

			const { User } = await useDB();
			const iotId = await User.findWithIotId(id);
			if (!iotId) return status404();

			const iotEmailId = iotId.emailId;
			if (iotEmailId !== emailId) return status403();

			await User.removeIot(id);

			return status200();
		}),
	),
);

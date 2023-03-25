import { status200 } from '../../libs/http/status200';
import { status400 } from '../../libs/http/status400';
import { status403 } from '../../libs/http/status403';
import { status404 } from '../../libs/http/status404';
import { useDB, withDB } from '../../libs/wrapper/withDB';
import { withHttp } from '../../libs/wrapper/withHttp';
import { Lambda } from '../../../../types/lambda';
import { withUser, useUser } from '../../libs/wrapper/withUser';

export const handler: Lambda = withHttp(
	withDB(
		withUser(async ({ body }) => {
			if (!body) return status400();
			console.log('body', body);

			const user = useUser();
			const emailId = user.emailId;

			const { name, password } = JSON.parse(body);
			if (!name || !password) return status400();

			const { User } = await useDB();
			const iot = await User.findWithEmail(emailId);
			if (!iot) return status404();

			const iotName = await User.findByName(name);
			if (!iotName) return status404();

			const emailIdIot = iotName.emailId;

			const { Email } = await useDB();
			const email = await Email.findWithEmailId(emailId);
			if (!email) return status404();
			if (emailId !== emailIdIot) return status400();

			const verified = iot.verifyPassword(password);
			if (!verified) return status403();

			const token = await iot.getToken();

			return status200({ data: { token } });
		}),
	),
);

import { status200 } from '../../libs/http/status200';
import { status400 } from '../../libs/http/status400';
import { useDB, withDB } from '../../libs/wrapper/withDB';
import { withHttp } from '../../libs/wrapper/withHttp';
import { Lambda } from '../../../../types/lambda';
import { Role } from 'libs/database/models/user';
import { useUser, withUser } from 'libs/wrapper/withUser';
import { hashPassword } from 'libs/hmac';
import { status404 } from 'libs/http/status404';

export const handler: Lambda = withHttp(
	withDB(
		withUser(async ({ body }) => {
			if (!body) return status400();

			const { name, password } = JSON.parse(body);
			if (!name || !password) return status400();

			const user = useUser();
			const emailId = user.emailId;

			const { User } = await useDB();
			const iotName = await User.findByName(name);
			if (iotName) return status400();

			const { hash, salt } = hashPassword({ password });
			const iot = await User.create({ emailId, name, salt, password: hash, terms: true, role: Role.IOT });

			if (!iot) return status404();

			const token = await iot.getToken();
			return status200({ data: { token } });
		}),
	),
);

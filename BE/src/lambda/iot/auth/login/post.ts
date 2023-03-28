import { status200 } from '../../../../libs/http/status200';
import { status400 } from '../../../../libs/http/status400';
import { status403 } from '../../../../libs/http/status403';
import { status404 } from '../../../../libs/http/status404';
import { useDB, withDB } from '../../../../libs/wrapper/withDB';
import { withHttp } from '../../../../libs/wrapper/withHttp';
import { Lambda } from '../../../../../../types/lambda';

export const handler: Lambda = withHttp(
	withDB(async ({ body }) => {
		if (!body) return status400();

		const { name, password } = JSON.parse(body);
		if (!name || !password) return status400();

		const { User } = await useDB();
		const iotName = await User.findByName(name);
		if (!iotName) return status404();

		const verified = iotName.verifyPassword(password);
		if (!verified) return status403();

		const token = await iotName.getToken();

		return status200({ data: { token } });
	}),
);

import { status200 } from '../../../libs/http/status200';
import { status400 } from '../../../libs/http/status400';
import { status403 } from '../../../libs/http/status403';
import { status404 } from '../../../libs/http/status404';
import { useDB, withDB } from '../../../libs/wrapper/withDB';
import { withHttp } from '../../../libs/wrapper/withHttp';
import { Lambda } from '../../../../../types/lambda';

export const handler: Lambda = withHttp(
	withDB(async ({ body }) => {
		if (!body) return status400();

		const { email, password } = JSON.parse(body);
		if (!email || !password) return status400();

		const { User } = await useDB();
		const user = await User.findByEmail(email);
		if (!user) return status404();

		const verified = user.verifyPassword(password);
		if (!verified) return status403();

		const token = await user.getToken();

		return status200({ data: { token } });
	}),
);

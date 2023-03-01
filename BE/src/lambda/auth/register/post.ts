import { status200 } from 'libs/http/status200';
import { status400 } from 'libs/http/status400';
import { status403 } from 'libs/http/status403';
import { useDB, withDB } from 'libs/wrapper/withDB';
import { withHttp } from 'libs/wrapper/withHttp';
import { Lambda } from '../../../../../types/lambda';

export const handler: Lambda = withHttp(
	withDB(async ({ body }) => {
		if (!body) return status400();

		const { email, name, terms, newsletter, password } = JSON.parse(body);
		if (!email || !name || !terms || !password) return status400();

		const { User } = await useDB();
		const [user, created] = await User.findOrCreateByEmail(email);
		if (!created) return status403();

		await user.register(name, password, terms, newsletter);

		const token = await user.getToken();
		return status200({ data: { token } });
	}),
);

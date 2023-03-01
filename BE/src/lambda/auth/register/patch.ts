import { status200 } from 'libs/http/status200';
import { status400 } from 'libs/http/status400';
import { status404 } from 'libs/http/status404';
import { useDB, withDB } from 'libs/wrapper/withDB';
import { withHttp } from 'libs/wrapper/withHttp';
import { Lambda } from '../../../../../types/lambda';

export const handler: Lambda = withHttp(
	withDB(async ({ body }) => {
		if (!body) return status400();

		const { magic, name, terms, newsletter, password } = JSON.parse(body);
		if (!magic || !name || !terms || !password) return status400();

		const { User } = await useDB();
		const user = await User.findByMagic(magic);
		if (!user) return status404();

		await user.register(name, password, terms, newsletter);

		const token = await user.getToken();
		return status200({ data: { token } });
	}),
);

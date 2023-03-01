import { status200 } from 'libs/http/status200';
import { status400 } from 'libs/http/status400';
import { status404 } from 'libs/http/status404';
import { status500 } from 'libs/http/status500';
import { useDB, withDB } from 'libs/wrapper/withDB';
import { withHttp } from 'libs/wrapper/withHttp';
import { Lambda } from '../../../../../types/lambda';

export const handler: Lambda = withHttp(
	withDB(async ({ body }) => {
		if (!body) return status400();

		const { magic, email, password } = JSON.parse(body);
		if (!magic || !email || !password) return status400();

		const { User, Email } = await useDB();
		const user = await User.findByMagic(magic);
		if (!user) return status404();

		const [emailEntity, created] = await Email.findOrCreateByEmail(email);
		if (!emailEntity) return status500();

		if (!created) {
			const existingUser = await emailEntity.getUser();
			if (existingUser && existingUser.id !== user.id) return status400();
		}

		await user.changeEmail(emailEntity);
		await user.setPassword(password);

		const token = await user.getToken();

		return status200({ data: { token } });
	}),
);

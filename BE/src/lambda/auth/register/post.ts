import { status200 } from '../../../libs/http/status200';
import { status400 } from '../../../libs/http/status400';
import { status403 } from '../../../libs/http/status403';
import { useDB, withDB } from '../../../libs/wrapper/withDB';
import { withHttp } from '../../../libs/wrapper/withHttp';
import { Lambda } from '../../../../../types/lambda';
import { z } from 'zod';
import { validation } from '../../../libs/validation';

const Schema = z.object({
	email: z.string().email().min(5),
	name: z.string().min(5),
	terms: z.boolean(),
	password: z
		.string()
		.regex(/^(?=.*[A-Z])(?=.*\d).+$/)
		.min(5),
});

export const handler: Lambda = withHttp(
	withDB(async ({ body }) => {
		if (!body) return status400();

		const parsedBody = JSON.parse(body);
		const { email, name, terms, password } = validation(Schema, parsedBody);
		if (terms !== true) return status403();

		const { User } = await useDB();
		const [user, created] = await User.findOrCreateByEmail(email);
		if (!created) return status403();

		await user.register(name, password, terms);

		const token = await user.getToken();
		return status200({ data: { token } });
	}),
);

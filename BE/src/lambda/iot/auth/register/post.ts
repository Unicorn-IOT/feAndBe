import { status200 } from '../../../../libs/http/status200';
import { status400 } from '../../../../libs/http/status400';
import { status403 } from '../../../../libs/http/status403';
import { useDB, withDB } from '../../../../libs/wrapper/withDB';
import { withHttp } from '../../../../libs/wrapper/withHttp';
import { Lambda } from '../../../../../../types/lambda';
import { useUser, withUser } from '../../../../libs/wrapper/withUser';
import { z } from 'zod';
import { validation } from '../../../../libs/validation';

const Schema = z.object({
	name: z.string().min(5),
	password: z
		.string()
		.regex(/^(?=.*[A-Z])(?=.*\d).+$/)
		.min(5),
});

export const handler: Lambda = withHttp(
	withDB(
		withUser(async ({ body }) => {
			if (!body) return status400();

			const parsedBody = JSON.parse(body);
			const { name, password } = validation(Schema, parsedBody);

			const user = useUser();
			const emailId = user.emailId;

			const { User } = await useDB();
			const iotName = await User.findIotByName(name);
			if (iotName) return status403();

			// const { hash, salt } = hashPassword({ password });
			// const iot = await User.create({ emailId, name, salt, password: hash, terms: true, role: Role.IOT });

			const iot = await User.createIot(name, password, emailId);

			if (!iot) return status403();

			const token = await iot.getToken();
			return status200({ data: { token } });
		}),
	),
);

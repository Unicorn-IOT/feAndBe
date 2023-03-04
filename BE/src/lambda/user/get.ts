import { status200 } from '../../libs/http/status200';
import { withDB } from '../../libs/wrapper/withDB';
import { withHttp } from '../../libs/wrapper/withHttp';
import { useUser, withUser } from '../../libs/wrapper/withUser';
import { Lambda } from '../../../../types/lambda';

export const handler: Lambda = withHttp(
	withDB(
		withUser(async () => {
			const user = useUser();
			const payload = await user.getPayload();
			const token = await user.getToken(payload);
			return status200({ data: { user: payload, token } });
		}),
	),
);

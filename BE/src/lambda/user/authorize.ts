import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda';
import { getAuthorizerEvent } from '../../libs/getAuthorizerEvent';
import { allow, deny } from '../../libs/iamPolicy';
import { decodeJwt } from '../../libs/jwt';
import { useDB, withDB } from '../../libs/wrapper/withDB';
import { Lambda, RequestAuthorizerEvent } from '../../../../types/lambda';
import { UserJWTPayload } from '../../../../types/User';

export const handler: Lambda<RequestAuthorizerEvent | APIGatewayTokenAuthorizerEvent> = withDB(async (event) => {
	const { arn, authorizationToken } = getAuthorizerEvent(event);
	if (!authorizationToken) return deny(arn);

	const jwt = authorizationToken.split(' ')[1];
	console.log(jwt);
	if (!jwt) return deny(arn);

	const payload = await decodeJwt<UserJWTPayload>({ jwt });
	if (!payload || !payload.id) return deny(arn);

	const { User } = await useDB();

	const user = await User.findWithEmail(payload.id);

	if (!user || !user.password) return deny(arn);

	try {
		await user.verifyToken(jwt);
	} catch {
		return deny(arn);
	}

	const userPayload = await user.getPayload();
	return allow(arn, `${payload.id}`, userPayload);
});

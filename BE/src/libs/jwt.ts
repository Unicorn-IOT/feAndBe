import { JWTPayload, SignJWT } from 'jose/jwt/sign';
import { jwtVerify } from 'jose/jwt/verify';
import { decode } from 'jose/util/base64url';
import { ONE_MONTH } from 'projectConstants';

const getKey = (secret: string) => Buffer.from(secret);

export const signJwt = ({ payload = {}, secret }: { payload: JWTPayload; secret: string }) =>
	new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS512' })
		.setIssuedAt()
		.setExpirationTime(Math.floor((Date.now() + ONE_MONTH) / 1000))
		.setIssuer('unicorniot:api')
		.setAudience('unicorniot:user')
		.sign(getKey(secret));

export const verifyJwt = async <Payload = unknown>({ jwt, secret }: { jwt: string; secret: string }): Promise<JWTPayload & Payload> => {
	const { payload } = await jwtVerify(jwt, getKey(secret), { issuer: 'unicorniot:api', audience: 'unicorniot:user' });
	return payload as JWTPayload & Payload;
};

export const decodeJwt = async <Payload = unknown>({ jwt }: { jwt: string }): Promise<(JWTPayload & Payload) | undefined> => {
	const payloadString = jwt.split('.')[1];
	if (!payloadString) return undefined;

	return JSON.parse(Buffer.from(decode(payloadString)).toString('utf-8'));
};

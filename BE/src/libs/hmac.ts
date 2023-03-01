import { createHmac, randomBytes } from 'crypto';

export const getSalt = () => randomBytes(64).toString('hex');

export const hashPassword = ({ password, salt = getSalt() }: { password: string; salt?: string }) => {
	const hash = createHmac('sha512', salt).update(password).digest('hex');
	return { salt, hash };
};

export const verifyPassword = ({ password, salt, hash }: { password: string; salt: string; hash: string }) => {
	const { hash: result } = hashPassword({ password, salt });
	return result === hash;
};

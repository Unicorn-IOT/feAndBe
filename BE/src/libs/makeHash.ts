import md5 from 'md5';
import { HASH_LENGTH } from 'projectConstants';

export const makeHash = (s: string) => {
	const start = Math.floor(Math.random() * (32 - HASH_LENGTH + 1));
	const hash = md5(s).substring(start, start + HASH_LENGTH);

	return hash;
};

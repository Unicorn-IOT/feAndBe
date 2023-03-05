import { GetServerSidePropsContext } from 'next/types';

export const shouldFetchUserInfo = ({ req }: GetServerSidePropsContext) => {
	const fetchHeader = Array.isArray(req.headers['sec-fetch-mode']) ? req.headers['sec-fetch-mode'][0] : req.headers['sec-fetch-mode'];
	if (fetchHeader) {
		// Browser supports Sec-Fetch-Mode
		if (fetchHeader === 'cors') {
			// Client-side routing, skip fetching
			return false;
		}
		// Possibly navigation, fetch
		return true;
	}

	const acceptHeader = Array.isArray(req.headers['accept']) ? req.headers['accept'][0] : req.headers['accept'];
	if (acceptHeader) {
		// Should always be present, this is just for typescript
		if (fetchHeader === '*/*') {
			// Client-side routing, skip fetching
			return false;
		}
		// Possibly navigation, fetch
		return true;
	}

	return true;
};

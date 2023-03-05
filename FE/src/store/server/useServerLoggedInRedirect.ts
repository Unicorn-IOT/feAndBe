import { GetServerSidePropsContext, Redirect } from 'next/types';

export const useServerLoggedInRedirect = ({ req }: GetServerSidePropsContext): Redirect | undefined => {
	let token;
	const cookieToken = req.cookies.token;
	if (cookieToken) {
		token = JSON.parse(cookieToken);
	}

	if (typeof token === 'string' && token.length > 0) {
		return {
			destination: '/dashboard',
			permanent: false,
		};
	}
};

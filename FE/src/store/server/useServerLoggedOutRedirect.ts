import { GetServerSidePropsContext, Redirect } from 'next/types';

export const useServerLoggedOutRedirect = ({ req }: GetServerSidePropsContext, destination = '/login'): Redirect | undefined => {
	let token;
	const cookieToken = req.cookies.token;
	if (cookieToken) {
		token = JSON.parse(cookieToken);
	}

	if (typeof token !== 'string' || token.length === 0) {
		return {
			destination: destination,
			permanent: false,
		};
	}
};

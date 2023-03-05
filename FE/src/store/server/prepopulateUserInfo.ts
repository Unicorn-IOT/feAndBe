import { AppStore } from '../';
import { userApi } from '../api/userApi';
import { shouldFetchUserInfo } from '../server/shouldFetchUserInfo';
import { tokenSlice } from '../slices/tokenSlice';
import { GetServerSidePropsContext } from 'next/types';

export const prepopulateUserInfo = ({ dispatch }: AppStore, context: GetServerSidePropsContext) => {
	if (!shouldFetchUserInfo(context)) return;

	let token;
	const cookieToken = context.req.cookies.token;
	if (cookieToken) {
		token = JSON.parse(cookieToken);
	}

	if (typeof token === 'string' && token.length > 0) {
		dispatch(tokenSlice.actions.set(token));
		dispatch(userApi.endpoints.getUser.initiate());
	}
};

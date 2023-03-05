import { Role } from 'BE/src/libs/database/models/user';
import { AppStore } from '../';
import { userApi } from '../api/userApi';
import { shouldFetchUserInfo } from '../server/shouldFetchUserInfo';
import { GetServerSidePropsContext, Redirect } from 'next/types';

export const useServerNotAdminRedirect = (
	context: GetServerSidePropsContext,
	{ getState }: AppStore,
	destination = '/',
): Redirect | undefined => {
	if (!shouldFetchUserInfo(context)) return;

	const { data } = userApi.endpoints.getUser.select()(getState());

	if (data?.data.user.role != Role.ADMIN) {
		return {
			destination: destination,
			permanent: false,
		};
	}
};

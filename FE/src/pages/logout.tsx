import { useCallback, useEffect } from 'react';
import { NextPage } from 'next';
import { useAppDispatch, wrapper } from 'FE/src/store';
import { useRouter } from 'next/router';
import { tokenSlice } from 'FE/src/store/slices/tokenSlice';
import { appApi } from 'FE/src/store/api';
import { prepopulateUserInfo } from '../store/server/prepopulateUserInfo';

const Logout: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const logout = useCallback(async () => {
		dispatch(tokenSlice.actions.reset());
		dispatch(appApi.util.resetApiState());
		await router.push('/login');
	}, [dispatch, router]);

	useEffect(() => {
		logout();
	}, [logout]);

	return null;
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
	prepopulateUserInfo(store, context);
	return {
		props: {},
	};
});

export default Logout;

import { useCallback, useEffect } from 'react';
import { NextPage } from 'next';
import { useAppDispatch } from 'FE/src/store';
import { useRouter } from 'next/router';
import { tokenSlice } from 'FE/src/store/slices/tokenSlice';
import { appApi } from '../store/api';

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

export default Logout;

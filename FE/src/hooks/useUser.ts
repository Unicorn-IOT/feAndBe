import { useAppSelector } from 'FE/src/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useUser = () => {
	const token = useAppSelector(({ token }) => token);
	const router = useRouter();

	useEffect(() => {
		if (!token) {
			router.push('/login');
		}
	}, [router, token]);
};

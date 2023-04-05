import React from 'react';
import { useRouter } from 'next/router';

import { Button, Grid, Typography } from '@mui/material';
import LoginForm from '../components/Login/LoginForm';
import { wrapper } from '../store';
import { prepopulateUserInfo } from '../store/server/prepopulateUserInfo';

const Login = () => {
	const router = useRouter();

	return (
		<>
			<LoginForm />

			<Grid container direction="column" display="flex" justifyContent="center" alignContent="center">
				<Grid item>
					<Typography variant="body1">If you do not have account yet, lets make it right now ! </Typography>
				</Grid>
				<Grid item sx={{ textAlign: 'center' }}>
					<Button onClick={() => router.push('/registration')}>Registration</Button>
				</Grid>
			</Grid>
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
	prepopulateUserInfo(store, context);
	return {
		props: {},
	};
});

export default Login;

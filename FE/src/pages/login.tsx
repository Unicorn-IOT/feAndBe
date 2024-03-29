import React from 'react';
import { useRouter } from 'next/router';

import { Button, Grid, Typography } from '@mui/material';

import { NextPage } from 'next';
import { LoginForm } from 'FE/src/components/Login/LoginForm';

const Login: NextPage = () => {
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

export default Login;

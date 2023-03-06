import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';

import { Button, Grid, Typography } from '@mui/material';
import { LoginUserPassword } from './LoginUserPassword';
import { LoginUserEmail } from './LoginUserEmail';

export type LoginPageType = {
	email: string;
	password: string;
};

const schema = yup.object({
	email: yup.string().required('User email is required'),
	password: yup.string().min(3, 'Min 3 chars').max(10, ' Max 10 chars').required('Password is required'),
});

export default function LoginForm() {
	const { control, handleSubmit } = useForm<LoginPageType>({
		resolver: yupResolver(schema),
		defaultValues: { email: '', password: '' },
	});
	const router = useRouter();

	const handleClick = (data: LoginPageType) => {
		router.push('/dashboard');
		console.log(JSON.stringify(data));
	};

	return (
		<Grid>
			<form onSubmit={handleSubmit(handleClick)}>
				<Grid
					sx={{
						marginTop: 10,
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column',
					}}
				>
					<Typography
						variant="h4"
						color={'black'}
						marginBottom={2}
						fontWeight={'bold'}
						sx={{ display: 'flex', justifyContent: 'center' }}
					>
						Login
					</Typography>
					<Grid sx={{ display: 'flex', justifyContent: 'center' }}>
						<LoginUserEmail control={control} />
					</Grid>
					<Grid sx={{ display: 'flex', justifyContent: 'center' }}>
						<LoginUserPassword control={control} />
					</Grid>
					<Button type="submit" sx={{ marginTop: 2, fontWeight: 'bold' }}>
						Log in
					</Button>
				</Grid>
			</form>
		</Grid>
	);
}

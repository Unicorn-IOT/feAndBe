import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Alert, Button, Grid, Typography } from '@mui/material';
import { LoginUserPassword } from './LoginUserPassword';
import { LoginUserEmail } from './LoginUserEmail';
import { useLoginMutation } from 'FE/src/store/api/authenticationApi';

export type LoginPageType = {
	email: string;
	password: string;
};

const schema = yup.object({
	email: yup.string().required('User email is required'),
	password: yup.string().required('Password is required'),
});

export function LoginFormHopeSo() {
	const { control, handleSubmit } = useForm<LoginPageType>({
		resolver: yupResolver(schema),
		defaultValues: { email: '', password: '' },
	});
	const router = useRouter();
	const [login, { isSuccess, isError }] = useLoginMutation();

	const onSubmit = async (data: LoginPageType) => {
		await Promise.all([router.prefetch('/'), login(data)]);
	};

	useEffect(() => {
		if (isSuccess) router.push('/');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
				{isError && (
					<Alert severity="error" sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
						There is an error, please check your registration data.
					</Alert>
				)}
				<Grid sx={{ display: 'flex', justifyContent: 'center' }}>
					<LoginUserEmail control={control} />
				</Grid>
				<Grid sx={{ display: 'flex', justifyContent: 'center' }}>
					<LoginUserPassword control={control} />
				</Grid>
				<Grid sx={{ display: 'flex', justifyContent: 'center' }}>
					<Button type="submit" sx={{ marginTop: 2, fontWeight: 'bold' }}>
						Log in
					</Button>
				</Grid>
			</Grid>
		</form>
	);
}

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Container, Grid, Typography } from '@mui/material';
import { LoginClientPassword } from './LoginClientPassword';
import { LoginClientName } from './LoginClientName';

export type LoginPageType = {
	clientName: string;
	clientPassword: string;
};

const schema = yup.object({
	clientName: yup.string().required('User name is required'),
	clientPassword: yup.string().min(3, 'Minimálně 3 znaky').max(10, ' Maximálně 10 znaků').required('Je povinné zadat heslo'),
});

export default function LoginForm() {
	const { control, handleSubmit } = useForm<LoginPageType>({
		resolver: yupResolver(schema),
		defaultValues: { clientName: '', clientPassword: '' },
	});
	const router = useRouter();

	const handleClick = (data: LoginPageType) => {
		router.push('/dashboard');
		console.log(data);
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
						<LoginClientName control={control} />
					</Grid>
					<Grid sx={{ display: 'flex', justifyContent: 'center' }}>
						<LoginClientPassword control={control} />
					</Grid>
					<Button type="submit" sx={{ marginTop: 2, fontWeight: 'bold' }}>
						Log in
					</Button>
				</Grid>
			</form>
		</Grid>
	);
}

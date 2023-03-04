import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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
	clientName: yup.string().required('Je povinné zadat uživatelské jméno'),
	clientPassword: yup.string().min(3, 'Minimálně 3 znaky').max(10, ' Maximálně 10 znaků').required('Je povinné zadat heslo'),
});

export default function LoginForm() {
	const { control, handleSubmit } = useForm<LoginPageType>({
		resolver: yupResolver(schema),
		defaultValues: { clientName: '', clientPassword: '' },
	});

	const handleClick = (data: LoginPageType) => {
		// navigate(ROUTES.DASHBOARD);
		console.log(data);
	};

	return (
		<Grid>
			<form onSubmit={handleSubmit(handleClick)}>
				<Container sx={{ marginTop: 10, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
					<Typography variant="h4" color={'black'} marginBottom={2} fontWeight={'bold'}>
						Přihlášení
					</Typography>
					<LoginClientName control={control} />

					<LoginClientPassword control={control} />
					<Button type="submit" sx={{ marginTop: 2, fontWeight: 'bold' }}>
						Log in
					</Button>
				</Container>
			</form>
		</Grid>
	);
}

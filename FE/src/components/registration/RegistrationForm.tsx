import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import * as yup from 'yup';

import { Alert, Button, Grid, Typography } from '@mui/material';
import { RegistrationUserPassword } from './RegistrationUserPassword';
import { RegistrationUserEmail } from './RegistrationUserEmail';
import { useRegisterMutation } from 'FE/src/store/api/authenticationApi';
import { RegistrationUserName } from './RegistrationUserName';
import { RegistrationUserTerms } from './RegistrationUserTerms';

export type RegistrationPageType = {
	name: string;
	email: string;
	password: string;
	terms: boolean;
};

const schema = yup.object({
	name: yup.string().required('User name is required'),
	email: yup.string().required('User email is required'),
	password: yup.string().required('Password is required').min(3, 'Min 3 chars').max(30, ' Max 30 chars'),
	terms: yup.bool().required('Accept terms is required'),
});

export default function RegistrationForm() {
	const { control, handleSubmit } = useForm<RegistrationPageType>({
		resolver: yupResolver(schema),
		defaultValues: { email: '', password: '', name: '', terms: false },
	});

	const router = useRouter();
	const [registration, { isSuccess, isError }] = useRegisterMutation();

	const onSubmit = async (data: RegistrationPageType) => {
		console.log('Ahoj Registr', data);
		await Promise.all([router.prefetch('/'), registration(data)]);
	};

	useEffect(() => {
		isSuccess && router.push('/');
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
					Registration
				</Typography>
				{isError && (
					<Alert severity="error" sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
						There is an error, please check your registration data.
					</Alert>
				)}
				<Grid sx={{ display: 'flex', justifyContent: 'center' }}>
					<RegistrationUserName control={control} />
				</Grid>
				<Grid sx={{ display: 'flex', justifyContent: 'center' }}>
					<RegistrationUserEmail control={control} />
				</Grid>
				<Grid sx={{ display: 'flex', justifyContent: 'center' }}>
					<RegistrationUserPassword control={control} />
				</Grid>
				<Grid sx={{ display: 'flex', justifyContent: 'center' }}>
					<RegistrationUserTerms control={control} />
				</Grid>
				<Grid sx={{ display: 'flex', justifyContent: 'center' }}>
					<Button type="submit" sx={{ marginTop: 2, fontWeight: 'bold' }}>
						Registration
					</Button>
				</Grid>
			</Grid>
		</form>
	);
}

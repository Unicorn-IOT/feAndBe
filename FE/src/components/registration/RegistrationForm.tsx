import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';

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
	password: yup.string().required('Password is required').min(3, 'Min 3 chars').max(10, ' Max 10 chars'),
	terms: yup.boolean().required('Accept terms is required'),
});

export default function RegistrationForm() {
	const { control, handleSubmit } = useForm<RegistrationPageType>({
		resolver: yupResolver(schema),
		defaultValues: { email: '', password: '', name: '', terms: false },
	});

	const router = useRouter();
	const [registration, { isSuccess, isError, error }] = useRegisterMutation();

	const onSubmit = async (data: RegistrationPageType) => {
		console.log('Ahoj Registr', data);
		await Promise.all([router.prefetch('/dashboard'), registration(data)]);
	};
	useEffect(() => {
		isSuccess && router.push('/dashboard');
	}, [isSuccess]);

	return (
		<Grid>
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
					<Button type="submit" sx={{ marginTop: 2, fontWeight: 'bold' }}>
						Registration
					</Button>
				</Grid>
			</form>
		</Grid>
	);
}

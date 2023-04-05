import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Grid, Typography } from '@mui/material';
import CreateStationName from './CreateStationName';
import CreateStationPassword from './CreateStationPassword';

export type CreateStationType = {
	name: string;
	password: string;
};

const schema = yup.object({
	name: yup.string().required('Station name is required'),
	password: yup.string().required('Password is required'),
});

export default function CreateStationForm() {
	const { control, handleSubmit } = useForm<CreateStationType>({
		resolver: yupResolver(schema),
		defaultValues: { name: '', password: '' },
	});
	const router = useRouter();

	const onSubmit = async (data: CreateStationType) => {
		console.log('createStationData', data);
	};

	return (
		<Grid>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid
					sx={{
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column',
					}}
				>
					<Typography
						variant="h5"
						color={'black'}
						marginBottom={2}
						fontWeight={'bold'}
						sx={{ display: 'flex', justifyContent: 'center' }}
					>
						Create your stations
					</Typography>

					<Grid sx={{ display: 'flex', justifyContent: 'center' }}>
						<CreateStationName control={control} />
					</Grid>
					<Grid sx={{ display: 'flex', justifyContent: 'center' }}>
						<CreateStationPassword control={control} />
					</Grid>
					<Grid sx={{ display: 'flex', justifyContent: 'center' }}>
						<Button type="submit" onClick={() => router.push('/')} sx={{ marginTop: 2, fontWeight: 'bold' }}>
							Create Station
						</Button>
					</Grid>
				</Grid>
			</form>
		</Grid>
	);
}

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Grid, Dialog, Typography, Paper } from '@mui/material';
import CreateStationName from './CreateStationName';
import CreateStationPassword from './CreateStationPassword';
// import { useAppDispatch } from 'FE/src/store';
// import { setName, setPassword } from 'FE/src/store/slices/createStationSlice';
import { useCreateStationMutation } from 'FE/src/store/api/stationApi';

export type CreateStationType = {
	name: string;
	password: string;
};

const schema = yup.object({
	name: yup.string().required('Station name is required'),
	password: yup.string().required('Password is required'),
});

export default function CreateStationForm() {
	const [open, setOpen] = useState(false);
	const { control, handleSubmit } = useForm<CreateStationType>({
		resolver: yupResolver(schema),
		defaultValues: { name: '', password: '' },
	});
	// const dispatch = useAppDispatch();

	// const router = useRouter();
	const handleOpen = () => setOpen(true);

	// const name = watch('name');
	// const password = watch('password');

	const [createStation, { isLoading, isError, isSuccess }] = useCreateStationMutation();

	useEffect(() => {
		isSuccess && setOpen(false);
	}, [isSuccess]);

	const onSubmit = async (data: CreateStationType) => {
		await createStation(data);
		console.log('createStationData', data);
	};

	return (
		<Grid>
			<Grid
				sx={{
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
				}}
			>
				<Paper sx={{ marginLeft: 'auto', marginRight: 'auto', width: 200, marginTop: 2 }}>
					<Button onClick={handleOpen}>Create your own station ! </Button>
				</Paper>
				<Dialog open={open}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Typography
							variant="h5"
							color={'black'}
							marginBottom={2}
							fontWeight={'bold'}
							sx={{ display: 'flex', justifyContent: 'center', width: 400, height: 50, margin: 3 }}
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
							<Button type="submit" sx={{ marginTop: 2, fontWeight: 'bold' }} disabled={isLoading}>
								Create Station
							</Button>
							<p>{isError && 'je error'}</p>
						</Grid>
					</form>
				</Dialog>
			</Grid>
		</Grid>
	);
}

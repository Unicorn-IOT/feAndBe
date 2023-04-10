import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Grid, Dialog, Typography, Paper } from '@mui/material';
import CreateStationName from './CreateStationName';
import CreateStationPassword from './CreateStationPassword';
import { useAppDispatch } from 'FE/src/store';
import { setName, setPassword } from 'FE/src/store/slices/createStationSlice';

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
	const { control, handleSubmit, watch } = useForm<CreateStationType>({
		resolver: yupResolver(schema),
		defaultValues: { name: '', password: '' },
	});
	const dispatch = useAppDispatch();

	const router = useRouter();
	const handleOpen = () => setOpen(true);

	const name = watch('name');
	const password = watch('password');

	const onSubmit = async (data: CreateStationType) => {
		dispatch(setName(name));
		dispatch(setPassword(password));
		setOpen(false);
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
					<Paper sx={{ marginLeft: 'auto', marginRight: 'auto', width: 200, marginTop: 2 }}>
						<Button onClick={handleOpen}>Create your own station ! </Button>
					</Paper>
					<Dialog open={open} onClose={onSubmit}>
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
							<Button type="submit" onClick={() => router.push('/')} sx={{ marginTop: 2, fontWeight: 'bold' }}>
								Create Station
							</Button>
						</Grid>
					</Dialog>
				</Grid>
			</form>
		</Grid>
	);
}

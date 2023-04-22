import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Grid, Typography } from '@mui/material';
import SelectEndDate from './end/SelectEndDate';
import SelectStartDate from './start/SelectStartDate';
import SelectStartTime from './start/SelectStartTime';
import SelectEndTime from './end/SelectEndTime';
import SelectGranularity from './granularity/SelectGranularity';
import SelectGranularityUnit from './granularity/SelectGranularityUnit';
import { useAppDispatch } from 'FE/src/store';
import { setStartDate, setEndDate, setGranularity, setGranularityUnit } from 'FE/src/store/slices/dataIoTSlice';

export type SelectFormType = {
	selectStartDate: Date;
	selectStartTime: Date;
	selectEndDate: Date;
	selectEndTime: Date;
	granularity: number;
	granularityUnit: 'minutes' | 'hours' | 'days';
};

export default function SelectForm() {
	const dispatch = useAppDispatch();

	const { control, handleSubmit } = useForm<SelectFormType>({
		defaultValues: {
			selectStartDate: new Date(),
			selectStartTime: new Date(),
			selectEndDate: new Date(),
			selectEndTime: new Date(),
			granularity: 5,
			granularityUnit: 'hours',
		},
	});

	const onSubmit = (data: SelectFormType) => {
		const startDateTime = new Date(data.selectStartDate);
		startDateTime.setHours(data.selectStartTime.getHours());
		startDateTime.setMinutes(data.selectStartTime.getMinutes());
		startDateTime.setSeconds(data.selectStartTime.getSeconds());

		const endDateTime = new Date(data.selectEndDate);
		startDateTime.setHours(data.selectEndTime.getHours());
		startDateTime.setMinutes(data.selectEndTime.getMinutes());
		startDateTime.setSeconds(data.selectEndTime.getSeconds());

		dispatch(setStartDate(startDateTime));
		dispatch(setEndDate(endDateTime));
		dispatch(setGranularity(data.granularity));
		dispatch(setGranularityUnit(data.granularityUnit));
		console.log('Data z formulare:', data);
	};

	return (
		<Grid container>
			<Typography
				variant="h5"
				color={'black'}
				marginBottom={2}
				fontWeight={'bold'}
				sx={{ display: 'flex', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto' }}
			>
				Select Range
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box
					sx={{
						p: 2,
						display: 'flex',
						flexDirection: 'row',
						height: 300,
						justifyContent: 'space-between',
					}}
				>
					<Grid container>
						<Grid item xs={12}>
							<SelectStartDate control={control} />
						</Grid>
						<Grid item xs={12}>
							<SelectStartTime control={control} />
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={12}>
							<SelectEndDate control={control} />
						</Grid>

						<Grid item xs={12}>
							<SelectEndTime control={control} />
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={12}>
							<SelectGranularity control={control} />
						</Grid>
						<Grid item xs={12}>
							<SelectGranularityUnit control={control} />
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
							<Button
								variant="text"
								size="large"
								type="submit"
								sx={{
									paddingTop: 0,
									paddingBottom: 0,
									fontWeight: 'bold',
								}}
							>
								set range !
							</Button>
						</Grid>
					</Grid>
				</Box>
			</form>
		</Grid>
	);
}

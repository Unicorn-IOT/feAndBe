import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Grid, Switch, Typography } from '@mui/material';
import SelectEndDate from './end/SelectEndDate';
import SelectStartDate from './start/SelectStartDate';
import SelectStartTime from './start/SelectStartTime';
import SelectEndTime from './end/SelectEndTime';
import SelectGranularity from './granularity/SelectGranularity';
import SelectGranularityUnit from './granularity/SelectGranularityUnit';
import { useAppDispatch } from 'FE/src/store';
import { setStartDate, setEndDate, setGranularity, setGranularityUnit } from 'FE/src/store/slices/dataIoTSlice';

export type SelectFormType = {
	selectStartDate: string | null;
	selectStartTime: string | null;
	selectEndDate: string | null;
	selectEndTime: string | null;
	granularity: number;
	granularityUnit: 'minutes' | 'hours' | 'days';
};

export default function SelectForm() {
	const dispatch = useAppDispatch();

	const { control, handleSubmit } = useForm<SelectFormType>({
		defaultValues: {
			selectStartDate: null,
			selectStartTime: null,
			selectEndDate: null,
			selectEndTime: null,
			granularity: 5,
			granularityUnit: 'hours',
		},
	});

	const onSubmit = ({ selectStartDate, selectStartTime, selectEndDate, selectEndTime, granularity, granularityUnit }: SelectFormType) => {
		if (!selectEndDate || !selectEndTime || !selectStartTime || !selectStartDate) {
			return;
		}
		const startDateTime = new Date(selectStartDate);
		startDateTime.setHours(new Date(selectStartTime).getHours());
		startDateTime.setMinutes(new Date(selectStartTime).getMinutes());
		startDateTime.setSeconds(new Date(selectStartTime).getSeconds());

		const endDateTime = new Date(selectEndDate);
		endDateTime.setHours(new Date(selectEndTime).getHours());
		endDateTime.setMinutes(new Date(selectEndTime).getMinutes());
		endDateTime.setSeconds(new Date(selectEndTime).getSeconds());

		const startDateTimeISOString = startDateTime.toISOString();
		const endDateTimeISOString = endDateTime.toISOString();

		dispatch(setStartDate(startDateTimeISOString));
		dispatch(setEndDate(endDateTimeISOString));
		dispatch(setGranularity(granularity));
		dispatch(setGranularityUnit(granularityUnit));
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
					<Grid container direction="column" display="flex" justifyContent="center" alignContent="center">
						<Grid item xs={6} justifyContent="center">
							<Switch />
						</Grid>
						<Grid item xs={6}>
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

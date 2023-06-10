import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Grid, Typography } from '@mui/material';
import SelectEndDate from './end/SelectEndDate';
import SelectStartDate from './start/SelectStartDate';
import SelectStartTime from './start/SelectStartTime';
import SelectEndTime from './end/SelectEndTime';
import SelectGranularity from './granularity/SelectGranularity';
import SelectGranularityUnit from './granularity/SelectGranularityUnit';
import { useAppDispatch, useAppSelector } from 'FE/src/store';
import { setStartDate, setEndDate, setGranularity, setGranularityUnit } from 'FE/src/store/slices/dataIoTSlice';
import CustomizedSwitch from '../reusable/CustomizeSwitch';

export type SelectFormType = {
	selectStartDate: string | null;
	selectStartTime: string | null;
	selectEndDate: string | null;
	selectEndTime: string | null;
	granularity: number;
	granularityUnit: 'minutes' | 'hours' | 'days';
};

export default function SelectForm() {
	const [err, setErr] = useState<'minutes' | 'days' | 'hours' | undefined>(undefined);
	const dispatch = useAppDispatch();
	const { endDate, granularity, granularityUnit, startDate } = useAppSelector(({ dataIoT }) => dataIoT);
	const { control, handleSubmit, watch } = useForm<SelectFormType>({
		defaultValues: {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			selectStartDate: new Date(startDate),
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			selectStartTime: new Date(startDate),
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			selectEndDate: new Date(endDate),
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			selectEndTime: new Date(endDate),
			granularity: granularity,
			granularityUnit: granularityUnit,
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

		const startDateTimeTimestamp = startDateTime.getTime();
		const endDateTimeTimestamp = endDateTime.getTime();

		const diffInHours = Math.abs((endDateTimeTimestamp - startDateTimeTimestamp) / (1000 * 60));
		const diffInMonths = Math.abs(endDateTime.getMonth() - startDateTime.getMonth());
		const diffInYears = Math.abs(endDateTime.getFullYear() - startDateTime.getFullYear());

		if (granularityUnit === 'minutes' && diffInHours >= 60) {
			setErr('minutes');
		} else if (granularityUnit === 'hours' && diffInMonths >= 1) {
			setErr('hours');
		} else if (granularityUnit === 'days' && (diffInYears > 1 || (diffInYears === 1 && diffInMonths > 0))) {
			setErr('days');
		} else if (startDateTime < endDateTime && startDateTime.getTime() <= endDateTime.getTime()) {
			dispatch(setStartDate(startDateTimeISOString));
			dispatch(setEndDate(endDateTimeISOString));
			dispatch(setGranularity(granularity));
			dispatch(setGranularityUnit(granularityUnit));
			setErr(undefined);
		}
	};

	const minTime = watch('selectStartTime');
	const maxTime = watch('selectEndTime');
	const maxDate = watch('selectEndDate');
	const minDate = watch('selectStartDate');

	return (
		<Grid container>
			<Typography
				variant="h6"
				color={err ? 'red' : 'black'}
				marginBottom={2}
				fontWeight={'bold'}
				sx={{ display: 'flex', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto' }}
			>
				{err === 'minutes'
					? 'Too big range with minutes units'
					: err === 'hours'
					? 'Too big range with hours units'
					: err === 'days'
					? 'Too big range with days units'
					: 'Select Range'}
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
							<SelectStartDate control={control} maxDate={maxDate} />
						</Grid>
						<Grid item xs={12}>
							<SelectStartTime control={control} maxTime={maxTime} />
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={12}>
							<SelectEndDate control={control} minDate={minDate} />
						</Grid>

						<Grid item xs={12}>
							<SelectEndTime control={control} minTime={minTime} />
						</Grid>
					</Grid>
					<Grid container sx={{ paddingTop: '7px' }}>
						<Grid item xs={12}>
							<SelectGranularity control={control} />
						</Grid>
						<Grid item xs={12}>
							<SelectGranularityUnit control={control} />
						</Grid>
					</Grid>

					<Grid container direction="column" display="flex" justifyContent="center" alignContent="center">
						<Grid item xs={6} justifyContent="center">
							<CustomizedSwitch />
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
								set range
							</Button>
						</Grid>
					</Grid>
				</Box>
			</form>
		</Grid>
	);
}

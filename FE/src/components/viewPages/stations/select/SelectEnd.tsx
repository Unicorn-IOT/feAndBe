import { Box, Grid, Typography, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';

import { setTime } from 'FE/src/store/slices/dataIoTSlice';
import { useGetDataIotQuery } from 'FE/src/store/api/dataIoTApi';
import { useAppDispatch, useAppSelector } from 'FE/src/store';
import { useDataIot } from 'FE/src/hooks/useDataIot';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

export default function SelectEnd() {
	const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

	const dispatch = useAppDispatch();

	const days = useAppSelector(({ dataIoT }) => dataIoT.days);

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		dispatch(setTime(event.target.value));
	};

	return (
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
				Select Range
			</Typography>
			<Box sx={{ minWidth: 120 }}>
				{/* <InputLabel>Range</InputLabel> */}
				{/* <DateTimePicker
						label="Select end Date and Time"
						// renderInput={(params: any) => <TextField {...params} />}
						value={selectedDateTime}
						onChange={(newValue) => {
							setSelectedDateTime(newValue);
						}}
					/> */}
				<StaticDateTimePicker
					value={selectedDateTime}
					onChange={(newValue) => {
						setSelectedDateTime(newValue);
					}}
				/>
			</Box>
		</Grid>
	);
}

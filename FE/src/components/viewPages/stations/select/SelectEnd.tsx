import { Box, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { setTime } from 'FE/src/store/slices/dataIoTSlice';
import { useGetDataIotQuery } from 'FE/src/store/api/dataIoTApi';
import { useAppDispatch, useAppSelector } from 'FE/src/store';
import { useDataIot } from 'FE/src/hooks/useDataIot';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function SelectEnd() {
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
				<FormControl fullWidth>
					<InputLabel>Range</InputLabel>
					<DateTimePicker></DateTimePicker>
				</FormControl>
			</Box>
		</Grid>
	);
}

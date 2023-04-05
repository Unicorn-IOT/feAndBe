import { Box, FormControl, Grid, InputLabel, Typography, Select, MenuItem } from '@mui/material';
import React from 'react';

export default function SelectStation() {
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
				Select Station
			</Typography>
			<Box sx={{ minWidth: 120 }}>
				<FormControl fullWidth>
					<InputLabel>Stations</InputLabel>
					<Select
						id="selectStation"
						value="ahoj"
						label="Stations"
						onChange={() => {
							console.log('select Station');
						}}
					>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
				</FormControl>
			</Box>
		</Grid>
	);
}

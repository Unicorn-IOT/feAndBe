import { Box, Grid, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React from 'react';

export default function SelectRange() {
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
					<Select
						id="selectRange"
						value="ahoj"
						label="Range"
						onChange={() => {
							console.log('select range');
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

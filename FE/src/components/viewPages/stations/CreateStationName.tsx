import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Grid, TextField, Typography } from '@mui/material';
import { CreateStationType } from './CreateStationForm';

type CreateStationNameProps = {
	control: Control<CreateStationType>;
};

export default function CreateStationName({ control }: CreateStationNameProps) {
	return (
		<Grid>
			<Typography variant="body2" marginTop={2} marginBottom={1}>
				Station Name
			</Typography>
			<Controller
				render={(params) => {
					const {
						field,
						fieldState: { error },
					} = params;
					return (
						<TextField
							{...field}
							type="text"
							variant="standard"
							error={Boolean(error)}
							helperText={error?.message}
							sx={{ width: '200px' }}
						/>
					);
				}}
				name="name"
				control={control}
			/>
		</Grid>
	);
}

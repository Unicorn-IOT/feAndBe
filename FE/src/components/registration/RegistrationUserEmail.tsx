import React from 'react';
import { Control, Controller } from 'react-hook-form';

import { Grid, TextField, Typography } from '@mui/material';
import { RegistrationPageType } from './RegistrationForm';

type RegistrationUserEmailProps = {
	control: Control<RegistrationPageType>;
};

export const RegistrationUserEmail = ({ control }: RegistrationUserEmailProps) => {
	return (
		<Grid>
			<Typography variant="body2" marginTop={2} marginBottom={1}>
				User email
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
				name="email"
				control={control}
			/>
		</Grid>
	);
};

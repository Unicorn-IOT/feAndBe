import React from 'react';

import { Control, Controller } from 'react-hook-form';

import { Grid, TextField, Typography } from '@mui/material';
import { RegistrationPageType } from './RegistrationForm';

type RegistrationUserNameProps = {
	control: Control<RegistrationPageType>;
};

export const RegistrationUserName = ({ control }: RegistrationUserNameProps) => {
	return (
		<Grid>
			<Typography variant="body2" marginTop={2} marginBottom={1}>
				User name
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
};

import React from 'react';

import { Control, Controller } from 'react-hook-form';

import { Grid, TextField, Typography } from '@mui/material';
import { LoginPageType } from './LoginForm';

type LoginUserEmailProps = {
	control: Control<LoginPageType>;
};

export const LoginUserEmail = ({ control }: LoginUserEmailProps) => {
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
							placeholder="User email"
							error={Boolean(error)}
							helperText={error?.message}
						/>
					);
				}}
				name="email"
				control={control}
			/>
		</Grid>
	);
};

import React from 'react';

import { Control, Controller } from 'react-hook-form';

import { Grid, Input, Typography } from '@mui/material';
import { LoginPageType } from './LoginForm';

type LoginClientNameProps = {
	control: Control<LoginPageType>;
};

export const LoginClientName = ({ control }: LoginClientNameProps) => {
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
					return <Input {...field} type="text" placeholder="Jméno" error={Boolean(error)} />;
				}}
				name="clientName"
				control={control}
			/>
		</Grid>
	);
};

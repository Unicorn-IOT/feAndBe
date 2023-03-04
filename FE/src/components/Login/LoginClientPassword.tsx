import React from 'react';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Grid, Input, Typography } from '@mui/material';
import { LoginPageType } from './LoginForm';

type LoginClientPasswordProps = {
	control: Control<LoginPageType>;
};

export const LoginClientPassword = ({ control }: LoginClientPasswordProps) => {
	return (
		<Grid>
			<Typography variant="body2" marginTop={2} marginBottom={1}>
				Password
			</Typography>
			<Controller
				render={(params) => {
					const {
						field,
						fieldState: { error },
					} = params;
					return <Input {...field} type="password" placeholder="Password" error={Boolean(error)} />;
				}}
				name="clientPassword"
				control={control}
			/>
		</Grid>
	);
};

import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import { Grid, TextField, Typography } from '@mui/material';
import { LoginPageType } from './LoginFormHopeSo';

type LoginUserPasswordProps = {
	control: Control<LoginPageType>;
};

export const LoginUserPassword = ({ control }: LoginUserPasswordProps) => {
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
					return (
						<TextField
							{...field}
							type="password"
							variant="standard"
							error={Boolean(error)}
							helperText={error?.message}
							sx={{ width: '200px' }}
						/>
					);
				}}
				name="password"
				control={control}
			/>
		</Grid>
	);
};

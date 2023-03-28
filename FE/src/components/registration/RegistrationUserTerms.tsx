import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import { FormControlLabel, Grid, Checkbox, Typography, IconButton } from '@mui/material';
import { RegistrationPageType } from './RegistrationForm';

type RegistrationUserTermsProps = {
	control: Control<RegistrationPageType>;
};

export const RegistrationUserTerms = ({ control }: RegistrationUserTermsProps) => {
	const [checkTerms, setCheckTerms] = useState(false);

	const handleCheck = () => {
		setCheckTerms(true);
	};

	const router = useRouter();

	return (
		<Grid>
			<Controller
				render={(params) => {
					const { field } = params;
					return (
						<FormControlLabel
							{...field}
							label="agree to the terms and conditions"
							control={<Checkbox checked={checkTerms} color="success" onClick={handleCheck} />}
						/>
					);
				}}
				name="terms"
				control={control}
			/>
			<Grid item>
				<Typography>
					You can find all terms and coditions
					{
						<IconButton onClick={() => router.push('/terms')}>
							<Typography variant="body1" color="primary">
								here
							</Typography>
						</IconButton>
					}
				</Typography>
			</Grid>
		</Grid>
	);
};

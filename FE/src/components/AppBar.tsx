import React from 'react';
import { AppBar as MuiAppBar } from '@mui/material';
import { Toolbar } from './Toolbar';

export const AppBar = () => {
	return (
		<>
			<MuiAppBar>
				<Toolbar />
			</MuiAppBar>
		</>
	);
};

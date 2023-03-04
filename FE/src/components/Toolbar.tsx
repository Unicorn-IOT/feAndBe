import React from 'react';
import { IconButton, Toolbar as MuiToolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';

export const Toolbar = () => {
	return (
		<MuiToolbar>
			<IconButton aria-label="menu" color="inherit" edge="start" size="large" sx={{ mr: 2 }}>
				<Menu />
			</IconButton>
			<Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
				Tým XXX IoT
			</Typography>
		</MuiToolbar>
	);
};

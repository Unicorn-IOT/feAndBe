import React, { MouseEvent, useState } from 'react';
import { Button, IconButton, MenuItem, Typography } from '@mui/material';

import { Toolbar as MuiToolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu } from './Menu';

export const Toolbar = () => {
	const [anchorE1, setAnchorE1] = useState<null | HTMLElement>(null);

	const open = Boolean(anchorE1);

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorE1(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorE1(null);
	};

	return (
		<>
			<MuiToolbar>
				<IconButton onClick={handleClick} aria-label="menu" color="inherit" edge="start" size="large" sx={{ mr: 2 }}>
					<Menu />
				</IconButton>
				<Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
					Tým XXX IoT
				</Typography>
			</MuiToolbar>
		</>
	);
};

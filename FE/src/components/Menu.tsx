import React, { useState, MouseEvent } from 'react';
import { Button, ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper, Stack } from '@mui/material';
import { Menu as MuiMenu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const Menu = () => {
	// const [anchorE1, setAnchorE1] = useState<null | HTMLElement>(null);
	// const open = Boolean(anchorE1);

	// const handleClick = (event: MouseEvent<HTMLElement>) => {
	// 	setAnchorE1(event.currentTarget);
	// };

	// const handleClose = () => {
	// 	setAnchorE1(null);
	// };

	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef<HTMLButtonElement>(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event: Event | React.SyntheticEvent) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === 'Escape') {
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current!.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<Stack direction="row" spacing={2}>
			<div>
				<IconButton
					ref={anchorRef}
					id="composition-button"
					aria-controls={open ? 'composition-menu' : undefined}
					aria-expanded={open ? 'true' : undefined}
					aria-haspopup="true"
					onClick={handleToggle}
				>
					<MenuIcon color="inherit" fontSize="medium" />
				</IconButton>
				<Popper open={open} anchorEl={anchorRef.current} role={undefined} placement="bottom-start" transition disablePortal>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{
								transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
							}}
						>
							<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList
										autoFocusItem={open}
										id="composition-menu"
										aria-labelledby="composition-button"
										onKeyDown={handleListKeyDown}
									>
										<MenuItem onClick={handleClose}>Profile</MenuItem>
										<MenuItem onClick={handleClose}>My account</MenuItem>
										<MenuItem onClick={handleClose}>Logout</MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
		</Stack>
	);
};
{
	/* <Button id="menuButton" aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
				Menu
			</Button> */
}
{
	/* <MuiMenu
				id="positioned-menu"
				anchorEl={anchorE1}
				open={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
				transformOrigin={{ vertical: 'top', horizontal: 'left' }}
			>
				<MenuItem>Home</MenuItem>
				<MenuItem>Dashboard</MenuItem>
				<MenuItem>Weather stations</MenuItem>
			</MuiMenu> */
}

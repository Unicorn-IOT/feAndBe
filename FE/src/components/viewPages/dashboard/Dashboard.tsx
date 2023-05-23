import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Toolbar, List, Typography, Divider, IconButton, Button } from '@mui/material';
import { ChevronLeft, Menu } from '@mui/icons-material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { ListItems } from './ListItems';
import { AppBar } from '../AppBar';
import { Drawer } from './Drawer';
import { useGetUserQuery } from '../../../store/api/userApi';

const mdTheme = createTheme();

type DashboardContentProps = {
	children: ReactElement;
};

export default function Dashboard({ children }: DashboardContentProps) {
	const [open, setOpen] = useState(true);
	const [userName, setUserName] = useState<string | undefined>();
	const router = useRouter();
	const { data } = useGetUserQuery();

	const toggleDrawer = () => {
		setOpen(!open);
	};

	const userData = data?.data.user.name;

	useEffect(() => {
		const arr = userData?.split(' ');
		if (arr != undefined) {
			for (let i = 0; i < arr?.length; i++) {
				arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
			}
		}
		const formattedUserName = arr?.join(' ');
		setUserName(formattedUserName);
	}, [userData]);

	return (
		<ThemeProvider theme={mdTheme}>
			<Box sx={{ display: 'flex', width: '100%' }}>
				<CssBaseline />
				<AppBar position="absolute" open={open}>
					<Toolbar
						sx={{
							pr: '24px',
						}}
					>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={toggleDrawer}
							sx={{
								marginRight: '36px',
								...(open && { display: 'none' }),
							}}
						>
							<Menu />
						</IconButton>
						<Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
							Unicorn Team IoT - 07
						</Typography>
						<Typography align="right" variant="h6">
							{userName ? `Vítej ${userName}` : 'Vítejte'}
						</Typography>
						<Button sx={{ color: '#ffff' }} onClick={() => router.push('/logout')}>
							Logout
						</Button>
					</Toolbar>
				</AppBar>
				<Drawer variant="permanent" open={open}>
					<Toolbar
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-end',
							px: [1],
						}}
					>
						<IconButton onClick={toggleDrawer}>
							<ChevronLeft />
						</IconButton>
					</Toolbar>
					<Divider />
					<List component="nav">
						<ListItems toDashboard={() => router.push('/')} toStations={() => router.push('/stations')} />
						<Divider sx={{ my: 1 }} />
					</List>
				</Drawer>
				{children}
			</Box>
		</ThemeProvider>
	);
}

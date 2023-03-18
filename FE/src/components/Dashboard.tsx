import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Toolbar, List, Typography, Divider, IconButton } from '@mui/material';
import { ChevronLeft, Menu } from '@mui/icons-material';
import { MainListItems } from './listItems';
import { AppBar } from './AppBar';
import { Drawer } from './Drawer';
import { useGetUserQuery } from '../store/api/userApi';

const mdTheme = createTheme();

type DashboardContentProps = {
	children: ReactElement;
};

function DashboardContent({ children }: DashboardContentProps) {
	const [open, setOpen] = useState(true);
	const router = useRouter();
	const { data } = useGetUserQuery();

	const toggleDrawer = () => {
		setOpen(!open);
	};

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
							Unicorn Team IoT - XX
						</Typography>
						<Typography align="right" variant="h6">
							{data?.data.user.name}
						</Typography>
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
						<MainListItems toDashboard={() => router.push('/')} toStations={() => router.push('/stations')} />
						<Divider sx={{ my: 1 }} />
					</List>
				</Drawer>
				{children}
			</Box>
		</ThemeProvider>
	);
}

type DashboardProps = {
	children: ReactElement;
};

export default function Dashboard({ children }: DashboardProps) {
	return <DashboardContent>{children}</DashboardContent>;
}

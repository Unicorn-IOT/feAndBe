import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MainListItems, SecondaryListItems } from './listItems';

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
							<MenuIcon />
						</IconButton>
						{'Vitej vole ' + data?.data.user.name}
						<Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
							Unicorn Team IoT - XX
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
							<ChevronLeftIcon />
						</IconButton>
					</Toolbar>
					<Divider />
					<List component="nav">
						<MainListItems
							toHome={() => router.push('/')}
							toDashboard={() => router.push('/dashboard')}
							toStations={() => router.push('/stations')}
						/>
						<Divider sx={{ my: 1 }} />
						<SecondaryListItems toCurrentMonth={() => router.push('/dashboard')} toLastDays={() => router.push('/dashboard')} />
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

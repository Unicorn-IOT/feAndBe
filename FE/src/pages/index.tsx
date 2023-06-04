'use client';
import * as React from 'react';
import { Box, Toolbar, Container, Grid, Paper } from '@mui/material';
import { Chart } from '../components/viewPages/Chart';
import { WeatherRIghtNow } from '../components/viewPages/dashboard/WeatherRIghtNow';
import SelectForm from '../components/select/SelectForm';
import { useUser } from 'FE/src/hooks/useUser';

const Dashboard = () => {
	useUser();

	return (
		<Box
			component="main"
			sx={{
				backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
				flexGrow: 1,
				height: '100vh',
				overflow: 'auto',
			}}
		>
			<Toolbar />
			<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={8} lg={9}>
						<Paper
							sx={{
								p: 2,
								display: 'flex',
								flexDirection: 'column',
								height: 300,
							}}
						>
							<Chart />
						</Paper>
					</Grid>

					<Grid item xs={12} md={4} lg={3}>
						<Paper
							sx={{
								p: 2,
								display: 'flex',
								flexDirection: 'column',
								height: 300,
							}}
						>
							<WeatherRIghtNow />
						</Paper>
					</Grid>
					<Grid item xs={12} md={12} lg={12}>
						<Paper
							sx={{
								p: 2,
								display: 'flex',
								flexDirection: 'column',
								height: 300,
							}}
						>
							<SelectForm />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default Dashboard;

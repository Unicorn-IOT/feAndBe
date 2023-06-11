'use client';
import * as React from 'react';
import { Box, Toolbar, Container, Grid, Paper, CircularProgress, Typography } from '@mui/material';
import { Chart } from '../components/viewPages/Chart';
import { WeatherRIghtNow } from '../components/viewPages/dashboard/WeatherRIghtNow';
import SelectForm from '../components/select/SelectForm';
import { useUser } from 'FE/src/hooks/useUser';
import { useDataIot } from '../hooks/useDataIot';
import { useCurrentDataIot } from '../hooks/useCurrentDataIot';

const Dashboard = () => {
	useUser();
	const { isFetching } = useDataIot();
	const { isFetching: isWeatherFetching, data, isError } = useCurrentDataIot();

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
					<Grid item xs={12} md={12} lg={12}>
						<Paper
							sx={{
								p: 2,
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								height: 400,
							}}
						>
							<Grid
								container
								alignItems="center"
								direction="row"
								sx={{ marginLeft: 'auto', marginRight: 'auto' }}
								spacing={1}
							>
								<Grid item xs={12} md={6} lg={3} textAlign="end">
									<Typography component="p" variant="h5">
										Name of station:
									</Typography>
								</Grid>
								<Grid item xs={12} md={6} lg={3} textAlign="start">
									<Typography component="p" variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
										{isError ? 'There is an error' : data?.data.nameStation}
									</Typography>
								</Grid>

								<Grid item xs={12} md={6} lg={3} textAlign="end">
									<Typography component="p" variant="h5">
										Location:
									</Typography>
								</Grid>
								<Grid item xs={12} md={6} lg={3} textAlign="start">
									<Typography component="p" variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
										{isError ? 'There is an error' : data?.data.location}
									</Typography>
								</Grid>

								<Grid item xs={12}>
									<SelectForm />
								</Grid>
							</Grid>
						</Paper>
					</Grid>
					<Grid item xs={12} md={8} lg={9}>
						<Paper
							sx={{
								p: 2,
								display: 'flex',
								flexDirection: 'column',
								height: 300,
							}}
						>
							{isFetching ? (
								<Grid item xs={1} lg={1} justifyContent="center" alignItems="center">
									<CircularProgress />
								</Grid>
							) : (
								<Chart />
							)}
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
							{isWeatherFetching ? (
								<Grid item xs={1} lg={1} justifyContent="center" alignItems="center">
									<CircularProgress />
								</Grid>
							) : (
								<WeatherRIghtNow />
							)}
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default Dashboard;

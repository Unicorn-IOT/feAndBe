import * as React from 'react';

import { Box, Toolbar, Container, Grid, Paper } from '@mui/material';
import { Chart } from '../components/viewPages/Chart';
import { WeatherRIghtNow } from '../components/viewPages/dashboard/WeatherRIghtNow';
// import { wrapper } from '../store';
// import { prepopulateUserInfo } from '../store/server/prepopulateUserInfo';
// import { useServerLoggedOutRedirect } from '../store/server/useServerLoggedOutRedirect';
// import { waitForRequests } from '../store/server/waitForRequests';

const Dashboard = () => {
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
				</Grid>
			</Container>
		</Box>
	);
};

export default Dashboard;

// export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
// 	prepopulateUserInfo(store, context);
// 	await waitForRequests(store);
// 	return {
// 		props: {},
// 		redirect: useServerLoggedOutRedirect(context),
// 	};
// });

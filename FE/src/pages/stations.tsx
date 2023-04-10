import React from 'react';

import { Box, Toolbar, Container, Grid } from '@mui/material';
import CreateStationForm from '../components/viewPages/stations/CreateStationForm.tsx';
import StationCard from '../components/reusable/StationCard';

const Stations = () => {
	return (
		<>
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
				<Grid item xs={12} md={4} lg={3}>
					<CreateStationForm />
				</Grid>
				<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={4} lg={3}>
							<StationCard title="nazev stanice" location="Berlin" temperature={5} humidity={4} />
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default Stations;

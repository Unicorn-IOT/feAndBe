'use client';
import React from 'react';
import { Box, Toolbar, Container, Grid } from '@mui/material';
import CreateStationForm from '../components/viewPages/stations/CreateStationForm';
import StationCard from '../components/reusable/StationCard';
import { useGetStationsQuery } from '../store/api/stationApi';
import { useUser } from 'FE/src/hooks/useUser';

const Stations = () => {
	const { data } = useGetStationsQuery();
	useUser();
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
						{data &&
							data?.data.iotResult.map((e) => {
								return (
									<Grid item xs={12} md={4} lg={3} key={e.id}>
										<StationCard
											name={e.name}
											location={e.location}
											ownerEmail={e.ownerEmail}
											ownerName={e.ownerName}
											stationId={e.id}
										/>
									</Grid>
								);
							})}
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default Stations;

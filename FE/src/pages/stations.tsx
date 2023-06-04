'use client';
import React, { useState } from 'react';
import { Box, Toolbar, Container, Grid, CircularProgress, IconButton } from '@mui/material';
import CreateStationForm from '../components/viewPages/stations/CreateStationForm';
import StationCard from '../components/reusable/StationCard';
import { useGetStationsQuery } from '../store/api/stationApi';
import { useUser } from 'FE/src/hooks/useUser';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useGetUserQuery } from '../store/api/userApi';

const Stations = () => {
	const [filter, setFilter] = useState(false);
	const { data, isLoading } = useGetStationsQuery();
	useUser();
	const { data: dataUser } = useGetUserQuery();

	const handleOnClick = () => {
		setFilter((prev) => !prev);
	};

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
				<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
					<Grid item xs={12} md={4} lg={3}>
						<CreateStationForm />
					</Grid>
					<Grid item xs={12} md={4} lg={3}>
						<IconButton size="large" onClick={handleOnClick}>
							<FilterAltIcon color={filter === true ? 'primary' : 'disabled'} />
						</IconButton>
					</Grid>
					<Grid container spacing={3}>
						<>
							{isLoading && (
								<Grid item xs={1} lg={1} justifyContent="center" alignItems="center">
									<CircularProgress />
								</Grid>
							)}

							{filter === true
								? data &&
								  data.data.iotResult
										.filter((item) => item.ownerId === dataUser?.data.user.id)
										.map((e) => {
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
										})
								: data &&
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
						</>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

export default Stations;

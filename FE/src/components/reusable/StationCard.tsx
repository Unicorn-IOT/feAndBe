import React from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Button } from '@mui/material';
import { setUserId } from 'FE/src/store/slices/dataIoTSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

type StationCardProps = {
	name?: string;
	location?: string;
	ownerEmail?: string;
	ownerName?: string;
	stationId?: number;
};

export default function StationCard({ name, location, ownerEmail, ownerName, stationId }: StationCardProps) {
	const dispatch = useDispatch();
	const router = useRouter();

	const handleButtonClick = () => {
		dispatch(setUserId(stationId));
		router.push('/');
		console.log('station ID', stationId);
	};
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardHeader name={name} />
			<CardContent>
				<Grid container alignItems="center">
					<Grid item xs={12}>
						<Typography variant="h6" component="div" gutterBottom>
							Location:
						</Typography>
						<Typography variant="body1" component="div" gutterBottom>
							{location !== undefined ? location : 'There is no location'}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h6" component="div" gutterBottom>
							Owner Email:
						</Typography>
						<Typography variant="body1" sx={{ mb: 2 }}>
							{ownerEmail}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h6" component="div" gutterBottom>
							Owner Name:
						</Typography>
						<Typography variant="body1" sx={{ mb: 2 }}>
							{ownerName}
						</Typography>
					</Grid>
					<Grid item xs={12} justifyContent="center">
						<Button size="large" onClick={handleButtonClick} sx={{ padding: 0 }}>
							Check me 🌦️
						</Button>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}

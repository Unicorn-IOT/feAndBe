import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';

type StationCardProps = {
	name?: string;
	localization?: string;
	ownerEmail?: string;
	ownerName?: string;
};

export default function StationCard({ name, localization, ownerEmail, ownerName }: StationCardProps) {
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardHeader name={name} />
			<CardContent>
				<Typography variant="h5" component="div" gutterBottom>
					Localization: {localization}
				</Typography>
				<Typography variant="body1" sx={{ mb: 2 }}>
					Owner Email: {ownerEmail}
				</Typography>
				<Typography variant="body1" sx={{ mb: 2 }}>
					Owner Name: {ownerName}
				</Typography>
			</CardContent>
		</Card>
	);
}

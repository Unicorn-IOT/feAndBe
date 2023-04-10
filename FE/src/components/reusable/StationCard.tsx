import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';

type StationCardProps = {
	title?: string;
	location?: string;
	temperature?: number;
	humidity?: number;
};

export default function StationCard({ title, location, temperature, humidity }: StationCardProps) {
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardHeader title={title} />
			<CardContent>
				<Typography variant="h5" component="div" gutterBottom>
					{location}
				</Typography>
				<Typography variant="body1" sx={{ mb: 2 }}>
					Teplota: {temperature}
				</Typography>
				<Typography variant="body1" sx={{ mb: 2 }}>
					Vlhkost: {humidity}
				</Typography>
			</CardContent>
		</Card>
	);
}

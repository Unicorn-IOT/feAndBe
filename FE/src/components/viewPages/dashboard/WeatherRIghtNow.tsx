import { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import { Title } from '../Title';

import { useCurrentDataIot } from 'FE/src/hooks/useCurrentDataIot';

export const WeatherRIghtNow = () => {
	const { data, isError } = useCurrentDataIot();

	return (
		<Fragment>
			<Title>Latest measurement</Title>
			<Typography component="p" variant="h6" sx={{ flex: 1 }}>
				{new Date(data?.data.dateTemp || '').toString().split('GMT')[0]}
			</Typography>
			<Typography component="p" variant="h6">
				Humidity:
			</Typography>
			<Typography color="text.secondary" sx={{ flex: 1 }}>
				{isError ? 'There is an error' : data?.data.humidity}%
			</Typography>
			<Typography component="p" variant="h6">
				Temperature:
			</Typography>
			<Typography color="text.secondary" sx={{ flex: 1 }}>
				{isError ? 'There is an error' : data?.data.temperature}°C
			</Typography>
		</Fragment>
	);
};

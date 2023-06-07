import { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import { Title } from '../Title';

import { useCurrentDataIot } from 'FE/src/hooks/useCurrentDataIot';

export const WeatherRIghtNow = () => {
	const { data, isError } = useCurrentDataIot();

	return (
		<Fragment>
			<Title>Weather right now !</Title>
			<Typography component="p" variant="h6">
				Location:
			</Typography>
			<Typography color="text.secondary" sx={{ flex: 1 }}>
				{isError ? 'There is an error' : data?.data.location}
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

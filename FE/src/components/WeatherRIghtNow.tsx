import { Fragment } from 'react';

import Typography from '@mui/material/Typography';
import { Title } from './Title';

export const WeatherRIghtNow = () => {
	return (
		<Fragment>
			<Title>Weather right now !</Title>
			<Typography component="p" variant="h6">
				Humidity:
			</Typography>
			<Typography color="text.secondary" sx={{ flex: 1 }}>
				32%
			</Typography>
			<Typography component="p" variant="h6">
				Temperature:
			</Typography>
			<Typography color="text.secondary" sx={{ flex: 1 }}>
				23°C
			</Typography>
		</Fragment>
	);
};

import { Fragment } from 'react';

import Typography from '@mui/material/Typography';
import { Title } from '../Title';
import { useGetDataIotQuery } from 'FE/src/store/api/dataIoTApi';
import { measurementType } from '@type/DataIoT';

export const WeatherRIghtNow = () => {
	const { data, isError, error, isFetching } = useGetDataIotQuery({ userId: 1, days: 60, type: measurementType.TEMPERATURE });

	console.log('ahojky', data);
	//TODO
	return (
		<Fragment>
			<Title>Weather right now !</Title>
			<Typography component="p" variant="h6">
				Humidity:
			</Typography>
			<Typography color="text.secondary" sx={{ flex: 1 }}>
				{data?.data.temperatureData[0].value}
			</Typography>
			<Typography component="p" variant="h6">
				Temperature:
			</Typography>
			<Typography color="text.secondary" sx={{ flex: 1 }}>
				23°C
			</Typography>

			<Typography color="text.secondary" sx={{ flex: 1 }}></Typography>
		</Fragment>
	);
};

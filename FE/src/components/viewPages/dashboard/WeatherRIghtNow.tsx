import { Fragment } from 'react';

import Typography from '@mui/material/Typography';
import { Title } from '../Title';
import { useGetDataIotQuery } from 'FE/src/store/api/dataIoTApi';
import { measurementType } from '@type/DataIoT';
import { useAppSelector } from 'FE/src/store';
import { useSelector } from 'react-redux';
import { useDataIot } from 'FE/src/hooks/useDataIot';
import { useGetCurrentDataIoTQuery } from 'FE/src/store/api/currentDataIoTApi';

export const WeatherRIghtNow = () => {
	const { data, isError, error, isFetching } = useGetCurrentDataIoTQuery();
	// const { data } = useGetCurrentDataIoTQuery((state) => state.temperature)

	// const { days } = useGetDataIotQuery((state) => state.);
	const userId = useAppSelector(({ dataIoT }) => dataIoT.userId);

	//TODO
	return (
		<Fragment>
			<Title>Weather right now !</Title>
			<Typography component="p" variant="h6">
				Humidity:
			</Typography>
			<Typography color="text.secondary" sx={{ flex: 1 }}>
				{isError ? 'There is an error' : data?.data.humidity}
			</Typography>
			<Typography component="p" variant="h6">
				Temperature:
			</Typography>
			<Typography color="text.secondary" sx={{ flex: 1 }}>
				{isError ? 'There is an error' : data?.data.temperature}
			</Typography>
		</Fragment>
	);
};

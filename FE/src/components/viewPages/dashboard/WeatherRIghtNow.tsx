import { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import { Title } from '../Title';

import { useCurrentDataIot } from 'FE/src/hooks/useCurrentDataIot';

export const WeatherRIghtNow = () => {
	const { data, isError } = useCurrentDataIot();

	const time = data && data.data.dateTemp ? new Date(data && data.data.dateTemp) : null;
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const dayOfWeek = time ? days[time.getDay()] : null;
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const month = time ? months[time.getMonth()] : null;
	const hours = time ? String(time.getHours()).padStart(2, '0') : '--';
	const minutes = time ? String(time.getMinutes()).padStart(2, '0') : '--';
	const seconds = time ? String(time.getSeconds()).padStart(2, '0') : '--';

	const finishTime = `${dayOfWeek ? dayOfWeek + ', ' : ''}${month ? month + ' ' : ''}${hours}:${minutes}:${seconds}`;

	return (
		<Fragment>
			<Title>Latest measurement</Title>
			<Typography component="p" variant="h6" sx={{ flex: 1 }}>
				{finishTime}
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

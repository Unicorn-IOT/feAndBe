import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { Title } from './Title';

// Generate Sales Data
function createData(temperature: number, humidity: number, time: string) {
	return { temperature, humidity, time };
}

const data = [
	createData(0, 0, '00:00'),
	createData(20, 33, '00:00'),
	createData(45, 15, '05:00'),
	createData(30, 23, '10:00'),
	createData(44, 39, '12:00'),
	createData(40, 26, '14:00'),
	createData(18, 29, '16:00'),
	createData(21, 33, '18:00'),
	createData(24, 36, '20:00'),
	createData(30, 40, '21:00'),
	createData(40, 45, '22:00'),
	createData(44, 30, '23:59'),
];

const now = new Date();
const Today = now.toLocaleDateString();

export const Chart = () => {
	const theme = useTheme();

	return (
		<React.Fragment>
			<Title>{Today}</Title>
			<ResponsiveContainer>
				<LineChart
					data={data}
					margin={{
						top: 6,
						right: 16,
						bottom: 40,
						left: 24,
					}}
				>
					<XAxis dataKey="time" stroke={theme.palette.text.primary} style={theme.typography.body2}>
						<Label
							angle={0}
							position="bottom"
							style={{
								textAnchor: 'end',
								fill: theme.palette.text.primary,
								...theme.typography.body1,
							}}
						>
							Time
						</Label>
					</XAxis>
					<YAxis dataKey="humidity" stroke={theme.palette.text.primary} style={theme.typography.body2} domain={[0, 100]}>
						<Label
							angle={270}
							position="left"
							style={{
								textAnchor: 'middle',
								fill: theme.palette.text.primary,
								...theme.typography.body1,
							}}
						>
							Temp & Humidity
						</Label>
					</YAxis>

					<Line isAnimationActive={true} type="natural" dataKey="temperature" stroke="red" dot={true} />
					<Line isAnimationActive={true} type="natural" dataKey="humidity" stroke="blue" dot={true} />
				</LineChart>
			</ResponsiveContainer>
		</React.Fragment>
	);
};

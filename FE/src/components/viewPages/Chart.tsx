import { Fragment, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

import { useTheme } from '@mui/material/styles';
import { Title } from './Title';
import { useDataIot } from 'FE/src/hooks/useDataIot';
import { measurementType } from '@type/DataIoT';

const now = new Date();
const Today = now.toLocaleDateString();

export const Chart = () => {
	const theme = useTheme();
	const { data } = useDataIot();

	const finalData = data?.data.finalResult.map((date) => {
		const newDate = { ...date, createdAtTime: date.createdAt.split('T')[1].split('.')[0] };
		console.log('finalData', newDate);
		return newDate;
	});
	const type = data?.data.finalResult.map((type) => type.type);
	const tooltipContentStyle = {
		padding: '5px',
		border: '1px solid black',
		backgroundColor: '#d8d8d8',
		borderRadius: 3,
	};

	const tooltipCallBack = useCallback((data: any) => {
		console.log(data);
		return (
			<g style={tooltipContentStyle}>
				<text>Value: {data.payload?.[0]?.value}</text>
			</g>
		);
	}, []);

	return (
		<Fragment>
			{/* <Title>{Today}</Title> */}
			<ResponsiveContainer>
				<LineChart
					data={finalData}
					margin={{
						top: 6,
						right: 16,
						bottom: 40,
						left: 24,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="createdAtTime" stroke={theme.palette.text.primary} style={theme.typography.body2}>
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
					<YAxis dataKey="value" stroke={theme.palette.text.primary} style={theme.typography.body2} domain={[0, 100]}>
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
					<Tooltip content={tooltipCallBack} />

					<Line
						isAnimationActive={true}
						type="linear"
						dataKey="value"
						stroke={type && type.includes(measurementType.HUMIDITY) ? 'red' : 'blue'}
						dot={true}
					/>
				</LineChart>
			</ResponsiveContainer>
		</Fragment>
	);
};

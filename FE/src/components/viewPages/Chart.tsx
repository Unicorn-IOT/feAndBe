import { Fragment, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

import { useTheme } from '@mui/material/styles';
import { useDataIot } from 'FE/src/hooks/useDataIot';
import { measurementType } from '@type/DataIoT';
import { useAppSelector } from 'FE/src/store';

export const Chart = () => {
	const theme = useTheme();
	const { data } = useDataIot();

	const { dataType, unit } = useAppSelector(({ dataIoT }) => ({ dataType: dataIoT.type, unit: dataIoT.granularityUnit }));

	const finalData = data?.data.finalResult.map((date) => {
		const createdAtTime = new Date(date.createdAt);
		const newDate = { ...date, createdAtTime };
		return newDate;
	});
	const type = data?.data.finalResult.map((type) => type.type);
	const tooltipContentStyle = {
		padding: '3px',
		border: '1px solid black',
		backgroundColor: '#d8d8d8',
		borderRadius: 3,
	};

	const tooltipCallBack = useCallback((data: any) => {
		return (
			<div style={tooltipContentStyle}>
				{data.payload?.[0]?.value} {unit}
			</div>
		);
	}, []);

	const color = dataType === measurementType.HUMIDITY ? 'blue' : 'red';

	return (
		<Fragment>
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
					<XAxis
						dataKey="createdAtTime"
						stroke={theme.palette.text.primary}
						style={theme.typography.body2}
						tickFormatter={(time) =>
							`${time.getDate()}/${time.getMonth() + 1} ${time.getHours().toString().padStart(2, '0')}:${time
								.getMinutes()
								.toString()
								.padStart(2, '0')}`
						}
						reversed={true}
					>
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
								fill: color,
								...theme.typography.body1,
							}}
						>
							{dataType === measurementType.HUMIDITY ? 'Humidity' : 'Temperature'}
						</Label>
					</YAxis>
					<Tooltip content={tooltipCallBack} />

					<Line
						isAnimationActive={true}
						type="linear"
						dataKey="value"
						stroke={type && type.includes(measurementType.HUMIDITY) ? 'blue' : 'red'}
						dot={true}
					/>
				</LineChart>
			</ResponsiveContainer>
		</Fragment>
	);
};

import { Fragment } from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

import { useTheme } from '@mui/material/styles';
import { Title } from './Title';
import { useDataIot } from 'FE/src/hooks/useDataIot';

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

					<Line isAnimationActive={true} type="linear" dataKey="value" stroke="red" dot={true} />
				</LineChart>
			</ResponsiveContainer>
		</Fragment>
	);
};

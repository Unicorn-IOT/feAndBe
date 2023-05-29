import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { setType } from 'FE/src/store/slices/dataIoTSlice';
import { useAppDispatch } from 'FE/src/store';

const AntSwitch = styled(Switch)(({ theme }) => ({
	width: 28,
	height: 16,
	padding: 0,
	display: 'flex',

	'& .MuiSwitch-switchBase': {
		padding: 2,

		'&.Mui-checked': {
			transform: 'translateX(12px)',
			color: '#fff',
			'& + .MuiSwitch-track': {
				opacity: 1,
				backgroundColor: 'red',
			},
		},
	},
	'& .MuiSwitch-thumb': {
		boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
		width: 12,
		height: 12,
		borderRadius: 6,
		transition: theme.transitions.create(['width'], {
			duration: 200,
		}),
	},
	'& .MuiSwitch-track': {
		borderRadius: 16 / 2,
		opacity: 1,
		backgroundColor: 'blue',
		boxSizing: 'border-box',
	},
}));

export default function CustomizedSwitches() {
	const [check, setCheck] = useState(true);
	const dispatch = useAppDispatch();

	const handleCheck = () => {
		setCheck((prev) => !prev);
		check === true ? dispatch(setType('humidity')) : dispatch(setType('temperature'));
		console.log('check', check);
	};

	return (
		<Stack direction="row" spacing={1} alignItems="center">
			<Typography>Temperature</Typography>
			<AntSwitch defaultChecked onChange={handleCheck} />
			<Typography>Humidity</Typography>
		</Stack>
	);
}

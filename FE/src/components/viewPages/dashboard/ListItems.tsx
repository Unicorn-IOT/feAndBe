import { Fragment } from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';

type mainListItemsProps = {
	toDashboard?: () => void;
	toStations?: () => void;
};

export const ListItems = ({ toDashboard, toStations }: mainListItemsProps) => {
	return (
		<Fragment>
			<ListItemButton onClick={toDashboard}>
				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>
				<ListItemText primary="Dashboard" />
			</ListItemButton>
			<ListItemButton onClick={toStations}>
				<ListItemIcon>
					<SatelliteAltIcon />
				</ListItemIcon>
				<ListItemText primary="Stations" />
			</ListItemButton>
		</Fragment>
	);
};

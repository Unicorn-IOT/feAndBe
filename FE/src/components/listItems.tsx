import { Fragment } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import HomeIcon from '@mui/icons-material/Home';

type mainListItemsProps = {
	toHome?: () => void;
	toDashboard?: () => void;
	toStations?: () => void;
};

export const MainListItems = ({ toHome, toDashboard, toStations }: mainListItemsProps) => {
	return (
		<Fragment>
			<ListItemButton onClick={toHome}>
				<ListItemIcon>
					<HomeIcon />
				</ListItemIcon>
				<ListItemText primary="Home" />
			</ListItemButton>
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

type secondaryListItemsProps = {
	toCurrentMonth?: () => void;
	toLastDays?: () => void;
};

export const SecondaryListItems = ({ toCurrentMonth, toLastDays }: secondaryListItemsProps) => {
	return (
		<Fragment>
			<ListSubheader component="div" inset>
				Saved reports
			</ListSubheader>
			<ListItemButton onClick={toCurrentMonth}>
				<ListItemIcon>
					<AssignmentIcon />
				</ListItemIcon>
				<ListItemText primary="Current month" />
			</ListItemButton>
			<ListItemButton onClick={toLastDays}>
				<ListItemIcon>
					<AssignmentIcon />
				</ListItemIcon>
				<ListItemText primary="Last 30 days" />
			</ListItemButton>
		</Fragment>
	);
};

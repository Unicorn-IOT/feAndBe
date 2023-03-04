import React from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const Home = () => {
	return (
		<Box
			component="main"
			sx={{
				backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
				flexGrow: 1,
				height: '100vh',
				overflow: 'auto',
			}}
		>
			<Toolbar />
			<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={8} lg={9}>
						<Paper
							sx={{
								p: 2,
								display: 'flex',
								flexDirection: 'column',
								height: '100%',
							}}
						>
							<Typography component="h1" variant="h6" color="inherit">
								Welcome !{' '}
							</Typography>
							<Typography variant="body1">This is our weather station page </Typography>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default Home;

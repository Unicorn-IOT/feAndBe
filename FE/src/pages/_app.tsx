import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../utils/theme';
import createEmotionCache from '../utils/createEmotionCache';
import Dashboard from '../components/viewPages/dashboard/Dashboard';
import { wrapper } from '../store';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

function App(props: MyAppProps) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	const router = useRouter();

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					{router.pathname == '/login' ? (
						<Component {...pageProps} />
					) : router.pathname == '/registration' ? (
						<Component {...pageProps} />
					) : router.pathname == '/terms' ? (
						<Component {...pageProps} />
					) : (
						<Dashboard>
							<Component {...pageProps} />
						</Dashboard>
					)}
				</ThemeProvider>
			</LocalizationProvider>
		</CacheProvider>
	);
}

export default wrapper.withRedux(App);

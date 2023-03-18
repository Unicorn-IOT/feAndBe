import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../utils/theme';
import createEmotionCache from '../utils/createEmotionCache';
import Dashboard from '../components/Dashboard';
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
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
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
				{/* {router.pathname == '/login' ? (
						<Component {...pageProps} />
					) : (
						<Dashboard>
							<Component {...pageProps} />
						</Dashboard>
					)} */}
			</ThemeProvider>
		</CacheProvider>
	);
}

export default wrapper.withRedux(App);

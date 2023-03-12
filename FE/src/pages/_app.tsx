import * as React from 'react';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { useRouter } from 'next/router';

import theme from '../utils/theme';
import createEmotionCache from '../utils/createEmotionCache';
import Dashboard from '../components/Dashboard';
import { wrapper } from '../store';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

function App(props: MyAppProps) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	const router = useRouter();

	if (router.pathname == '/login') {
		<Component {...pageProps} />;
	} else if (router.pathname == '/terms') {
		<Component {...pageProps} />;
	} else {
		<Dashboard>
			<Component {...pageProps} />
		</Dashboard>;
	}

	function routovani() {
		return router.pathname == '/login' ? (
			<Component {...pageProps} />
		) : router.pathname == '/terms' ? (
			<Component {...pageProps} />
		) : (
			<Dashboard>
				<Component {...pageProps} />
			</Dashboard>
		);
	}

	return (
		<>
			<CacheProvider value={emotionCache}>
				<Head>
					<meta name="viewport" content="initial-scale=1, width=device-width" />
				</Head>
				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					{router.pathname == '/login' ? (
						<Component {...pageProps} />
					) : router.pathname == '/terms' ? (
						<Component {...pageProps} />
					) : router.pathname == '/registration' ? (
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
		</>
	);
}

export default wrapper.withRedux(App);

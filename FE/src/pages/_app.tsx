import type { AppProps } from 'next/app';
import { AppBar } from '../components/AppBar';
import { Header } from '../components/Header';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<AppBar />
			<Component {...pageProps} />

			{/* <Header />
			<br />
			<Component {...pageProps} />
			<br /> */}
		</>
	);
}

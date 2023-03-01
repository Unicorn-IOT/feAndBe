import type { AppProps } from 'next/app';
import { Header } from '../components/Header';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Header />
			<br />
			<Component {...pageProps} />
			<br />
		</>
	);
}

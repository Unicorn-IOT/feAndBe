import { useRouter } from 'next/router';

export const Navbar = () => {
	const router = useRouter();

	return (
		<>
			<div onClick={() => router.push('/blog')}>Im navbar</div>
			<p>{router.pathname.split('/')[1]}</p>
		</>
	);
};

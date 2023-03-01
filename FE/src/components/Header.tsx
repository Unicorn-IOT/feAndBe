import { useGetUserQuery } from '../store/api/userApi';
import { Navbar } from './Navbar';

export const Header = () => {
	// const { data, isError, isLoading } = useGetUserQuery();

	// if (isError)
	// 	return (
	// 		<>
	// 			<h1>error</h1>
	// 		</>
	// 	);

	// if (isLoading)
	// 	return (
	// 		<>
	// 			<h1>loading</h1>
	// 		</>
	// 	);

	return (
		<>
			<Navbar />
			{/* <h1>email: {data?.email}</h1> */}
		</>
	);
};

Header.displayName = 'Header';

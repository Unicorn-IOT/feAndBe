import { NextPage } from 'next';
import { wrapper } from '../store';
import { prepopulateUserInfo } from '../store/server/prepopulateUserInfo';
import { useServerLoggedOutRedirect } from '../store/server/useServerLoggedOutRedirect';

const Error404: NextPage = () => {
	return <div>page not found... Patriku, dolad tuhle stránku pls</div>;
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
	prepopulateUserInfo(store, context);
	return {
		props: {},
		redirect: useServerLoggedOutRedirect(context),
	};
});
export default Error404;

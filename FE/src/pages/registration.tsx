import React from 'react';

import RegistrationForm from '../components/registration/RegistrationForm';
import { prepopulateUserInfo } from '../store/server/prepopulateUserInfo';
import { wrapper } from '../store';
import { useServerLoggedOutRedirect } from '../store/server/useServerLoggedOutRedirect';

const Registration = () => {
	return (
		<div>
			<RegistrationForm />
		</div>
	);
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
	prepopulateUserInfo(store, context);
	return {
		props: {},
		redirect: useServerLoggedOutRedirect(context),
	};
});

export default Registration;

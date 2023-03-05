import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HydrateCookieAction } from '../';
import { authenticationApi } from '../api/authenticationApi';
import { userApi } from '../api/userApi';
import { HYDRATE } from 'next-redux-wrapper';
import { Token } from 'types/User';

export const tokenSlice = createSlice({
	name: 'token',
	initialState: null as string | null,
	reducers: {
		set: (_state, { payload }: PayloadAction<Token>) => payload,
		reset: () => null,
	},
	extraReducers: (builder) => {
		builder.addCase<string, HydrateCookieAction>(HYDRATE, (state, { payload }) =>
			state ? state : payload.token ? payload.token : null,
		);
		builder.addMatcher(authenticationApi.endpoints.login.matchFulfilled, (_state, { payload }) => payload.data.token);
		builder.addMatcher(authenticationApi.endpoints.register.matchFulfilled, (_state, { payload }) => payload.data.token);
		builder.addMatcher(authenticationApi.endpoints.completeRegistration.matchFulfilled, (_state, { payload }) => payload.data.token);
		builder.addMatcher(authenticationApi.endpoints.completeReset.matchFulfilled, (_state, { payload }) => payload.data.token);
		builder.addMatcher(userApi.endpoints.getUser.matchFulfilled, (_state, { payload }) => payload.data.token);
		builder.addMatcher(userApi.endpoints.getUser.matchRejected, (state, { meta }) => (meta.condition ? state : null));
		builder.addMatcher(userApi.endpoints.deleteUser.matchFulfilled, () => null);
	},
});

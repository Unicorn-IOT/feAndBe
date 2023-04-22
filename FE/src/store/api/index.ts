import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { AppState } from '../';
import { HYDRATE } from 'next-redux-wrapper';
// import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';

export const appApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: `https://1fntd115qh.execute-api.eu-west-1.amazonaws.com/`,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		prepareHeaders: (headers, { getState: _getState }) => {
			// const { token } = getState() as AppState;
			// if (token)
			headers.set(
				'authorization',
				`Bearer ${'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTQsIm5hbWUiOiJQYXRpayIsImVtYWlsIjoicGF0a29AZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2ODE0MDY3MTAsImV4cCI6MTY4Mzk5ODcxMCwiaXNzIjoidW5pY29ybmlvdDphcGkiLCJhdWQiOiJ1bmljb3JuaW90OnVzZXIifQ.rXakj8_7QZAwnwEKpcpHvF_DzJoT5Tqag6vDCWYo2mgbUGka2GluJvOejf438v9yEhFoGQ8n7bKvWjxiW5D7SQ'}`,
			);
			return headers;
		},
	}),
	extractRehydrationInfo(action, { reducerPath }) {
		if (action.type === HYDRATE) {
			return action.payload[reducerPath];
		}
	},
	tagTypes: ['User', 'DataIoT', 'Station', 'CurrentDataIoT'],
	endpoints: () => ({}),
});

import { appApi } from '../api/index';
import {
	CompleteRegistrationRequest,
	CompleteRegistrationResponse,
	CompleteResetRequest,
	CompleteResetResponse,
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	RegisterResponse,
	ResetRequest,
	ResetResponse,
} from '@type/Auth';

export const authenticationApi = appApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: ({ ...body }) => ({
				url: '/auth/login',
				method: 'POST',
				body,
			}),
		}),
		register: builder.mutation<RegisterResponse, RegisterRequest>({
			query: ({ ...body }) => ({
				url: '/auth/register',
				method: 'POST',
				body,
			}),
		}),
		completeRegistration: builder.mutation<CompleteRegistrationResponse, CompleteRegistrationRequest>({
			query: ({ ...body }) => ({
				url: '/auth/register',
				method: 'PATCH',
				body,
			}),
		}),
		reset: builder.mutation<ResetResponse, ResetRequest>({
			query: ({ ...body }) => ({
				url: '/auth/reset',
				method: 'POST',
				body,
			}),
		}),
		completeReset: builder.mutation<CompleteResetResponse, CompleteResetRequest>({
			query: ({ ...body }) => ({
				url: '/auth/reset',
				method: 'PATCH',
				body,
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation, useCompleteRegistrationMutation, useResetMutation, useCompleteResetMutation } =
	authenticationApi;

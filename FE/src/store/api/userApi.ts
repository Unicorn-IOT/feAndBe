import { appApi } from '../api/index';
import { DeleteUserResponse, GetUserResponse, UpdateUserRequest, UpdateUserResponse } from '@type/User';

export const userApi = appApi.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query<GetUserResponse, void>({
			query: () => ({
				url: '/user',
				method: 'GET',
			}),
			providesTags: (result) => (result ? [{ type: 'User', id: 'USER' }] : []),
		}),
		updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
			query: ({ ...body }) => ({
				url: '/user',
				method: 'PATCH',
				body,
			}),
			invalidatesTags: [{ type: 'User', id: 'USER' }],
		}),
		deleteUser: builder.mutation<DeleteUserResponse, void>({
			query: () => ({
				url: '/user',
				method: 'DELETE',
			}),
			invalidatesTags: [{ type: 'User', id: 'USER' }],
		}),
	}),
});

export const { useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation } = userApi;

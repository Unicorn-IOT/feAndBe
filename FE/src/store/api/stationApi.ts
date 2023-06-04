import { appApi } from '../api/index';
import { CreateStationRequest, CreateStationResponse, GetStationsResponse } from '@type/Station';

export const stationApi = appApi.injectEndpoints({
	endpoints: (builder) => ({
		getStations: builder.query<GetStationsResponse, void>({
			query: () => ({
				url: '/iot/iot/get',
				method: 'GET',
			}),
			providesTags: (result) => (result ? [{ type: 'Station', id: 'LIST' }] : []),
		}),
		createStation: builder.mutation<CreateStationResponse, CreateStationRequest>({
			query: ({ ...body }) => ({
				url: 'iot/auth/register',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Station', id: 'LIST' }],
		}),
	}),
});

export const { useCreateStationMutation, useGetStationsQuery } = stationApi;

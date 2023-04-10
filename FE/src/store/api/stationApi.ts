import { appApi } from '../api/index';
import { CreateStationRequest, CreateStationResponse, GetStationsResponse } from '@type/Station';

export const stationApi = appApi.injectEndpoints({
	endpoints: (builder) => ({
		getStations: builder.query<GetStationsResponse, void>({
			query: () => ({
				url: '/iot/iot/get',
				method: 'GET',
			}),
			providesTags: (result) => (result ? [{ type: 'Station' }] : []),
		}),
		createStation: builder.mutation<CreateStationResponse, CreateStationRequest>({
			query: ({ ...body }) => ({
				url: 'iot/auth/register',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Station' }],
		}),
	}),
});

export const { useCreateStationMutation, useGetStationsQuery } = stationApi;

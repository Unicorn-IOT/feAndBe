// import { appApi } from '../api/index';
// import { CreateStationResponse, GetStationsResponse } from '@type/Station';

// export const stationApi = appApi.injectEndpoints({
// 	endpoints: (builder) => ({
// 		getStations: builder.query<GetStationsResponse, void>({
// 			query: () => ({
// 				url: '/getStations',
// 				method: 'GET',
// 			}),
// 			providesTags: (result) => (result ? [{ type: 'User', id: 'USER' }] : []),
// 		}),
// 		createStation: builder.mutation<CreateStationResponse, void>({
//TODO nadefinovat body
// 			query: ({ ...body }) => ({
// 				url: '/createStation',
// 				method: 'POST',
// 				body,
// 			}),
// 			invalidatesTags: [{ type: 'Station' }],
// 		}),
// 	}),
// });

// export const { useCreateStationMutation, useGetStationsQuery } = stationApi;
export {};

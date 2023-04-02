import { ApiResponse } from './Api';

export type Station = {
	stationName: string;
	password: string;
};

export type GetStationsResponse = ApiResponse<{
	station: Station;
}>;

export type CreateStationResponse = ApiResponse<{
	station: Station;
}>;

//TODO nadefinovat body

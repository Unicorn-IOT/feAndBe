import { ApiResponse } from './Api';

export type GetStationsResponse = ApiResponse<{
	id: number;
	name: string;
	password: string;
	role: string;
	emailId: number;
}>;

export type CreateStationResponse = ApiResponse<{
	name: string;
	password: string;
}>;

export type CreateStationRequest = {
	name: string;
};

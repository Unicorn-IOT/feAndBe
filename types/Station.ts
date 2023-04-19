import { ApiResponse } from './Api';

export type GetStationsResponse = ApiResponse<{
	iotUsers: {
		id: number;
		name: string;
		password: string;
		role: string;
		emailId: number;
	}[];
}>;

export type CreateStationResponse = ApiResponse<{
	name: string;
}>;

export type CreateStationRequest = {
	name: string;
	password: string;
};

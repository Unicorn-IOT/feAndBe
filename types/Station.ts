import { ApiResponse } from './Api';

export type GetStationsResponse = ApiResponse<{
	iotResult: {
		id: number;
		name: string;
		ownerName: string;
		ownerId: number;
		ownerEmail: string;
		ownerEmailId: number;
		location: string;
	}[];
}>;

export type CreateStationResponse = ApiResponse<{
	name: string;
}>;

export type CreateStationRequest = {
	name: string;
	password: string;
};

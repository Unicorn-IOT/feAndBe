import { ApiResponse } from './Api';

export type GetStationsResponse = ApiResponse<{
	iotUsers: {
		id: number;
		name: string;
		ownerName: string;
		ownerId: number;
		ownerEmail: string;
		ownerEmailId: number;
		localization: string;
	}[];
}>;

export type CreateStationResponse = ApiResponse<{
	name: string;
}>;

export type CreateStationRequest = {
	name: string;
	password: string;
};

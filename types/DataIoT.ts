import { ApiResponse } from './Api';

export enum measurementType {
	TEMPERATURE = 'temperature',
	HUMIDITY = 'humidity',
}

export enum granularityUnitType {
	minutes = 'minutes',
	hours = 'hours',
	days = 'days',
}

export type DataIoT = {
	temperature: string;
	humidity: string;
	type: measurementType;
};

export type GetDataResponse = ApiResponse<{
	finalResult: {
		id: number; // ID zaznamu
		value: number;
		type: measurementType;
		userId: number; // ID stanice
		location: string;
		createdAt: string;
		updatedAt: string;
	}[];
}>;

export type GetDataRequest = {
	type: measurementType;
	userId: number;
	startDate: string;
	endDate: string;
	granularity: number;
	granularityUnit: granularityUnitType;
};

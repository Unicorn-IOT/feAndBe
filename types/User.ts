import { ApiResponse } from './Api';
import { Role } from 'BE/src/libs/database/models/user';

export interface UserJWTPayload extends Record<string, string | number | boolean> {
	id: number;
	name: string;
	email: string;
	role: Role;
}

export type Token = string | null;

export type User = {
	id: number;
	name: string;
	email: string;
	role: Role;
};

export type UserJWTPayloadClient = User & {
	iat: number;
	iss: 'pagespeed:api';
	aud: 'pagespeed:user';
};

export enum UserState {
	LOADING = 'LOADING',
	LOGGED_OUT = 'LOGGED_OUT',
	LOGGED_IN = 'LOGGED_IN',
}

export type EditUserInputs = {
	name: string;
	email: string;
};

export type UpdateUserRequest = {
	name: string;
};

export type UpdateUserResponse = ApiResponse<{
	id: number;
}>;

export type GetUserResponse = ApiResponse<{
	user: User;
	token: Token;
}>;

export type DeleteUserResponse = ApiResponse;

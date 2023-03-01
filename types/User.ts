import { Role } from 'libs/database/models/user';

export interface UserJWTPayload extends Record<string, string | number | boolean> {
	id: number;
	name: string;
	email: string;
	role: Role;
}

export type GetUserResponse = {
	email: string;
};

export type UpdateUserRequest = {
	email: string;
};

export type UpdateUserResponse = {
	email: string;
};

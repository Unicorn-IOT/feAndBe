import { ApiResponse } from '@type/Api';

export enum AuthForm {
	LOGIN,
	REGISTER,
	RESET,
	RESET_LOGGED_IN,
	COMPLETE_REGISTER,
	COMPLETE_RESET,
	SENT,
}

export type RegisterInputs = {
	email: string;
	name: string;
	password: string;
	terms: boolean;
};

export type CompleteRegistrationInputs = {
	magic: string;
	name: string;
	password: string;
	terms: boolean;
};

export type ResetInputs = {
	email: string;
};

export type LoginInputs = {
	email: string;
	password: string;
};

export type CompleteResetInputs = {
	magic: string;
	email: string;
	password: string;
};

export type LoginRequest = LoginInputs;

export type LoginResponse = ApiResponse<{
	token: string;
}>;

export type RegisterRequest = RegisterInputs;

export type CompleteRegistrationRequest = CompleteRegistrationInputs;

export type RegisterResponse = LoginResponse;

export type CompleteRegistrationResponse = LoginResponse;

export type ResetRequest = ResetInputs;

export type ResetResponse = RegisterResponse;

export type CompleteResetRequest = CompleteResetInputs;

export type CompleteResetResponse = LoginResponse;

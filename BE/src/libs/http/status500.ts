import { response } from 'libs/http/response';
import { StatusProps } from '../../../../types/http';

export const status500 = (props?: StatusProps) => {
	const { message, ...rest } = props ?? {};
	return response({
		statusCode: 500,
		message: message ?? 'Internal Server Error',
		...rest,
	});
};

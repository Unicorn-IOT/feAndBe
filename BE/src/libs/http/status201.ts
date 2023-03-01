import { response } from 'libs/http/response';
import { StatusProps } from '../../../../types/http';

export const status201 = (props?: StatusProps) => {
	const { message, ...rest } = props ?? {};
	return response({
		statusCode: 201,
		message: message ?? 'Created',
		...rest,
	});
};

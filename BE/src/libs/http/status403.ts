import { response } from '../../libs/http/response';
import { StatusProps } from '../../../../types/http';

export const status403 = (props?: StatusProps) => {
	const { message, ...rest } = props ?? {};
	return response({
		statusCode: 403,
		message: message ?? 'Forbidden',
		...rest,
	});
};

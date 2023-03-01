import { User } from 'libs/database/models/user';
import { status403 } from 'libs/http/status403';
import { status404 } from 'libs/http/status404';
import { useDB } from 'libs/wrapper/withDB';
import { Lambda } from '../../../../types/lambda';

export let useUser = (): User => {
	throw new Error('Wrap Lambda handler with `withUser` function first.');
};

export const withUser = (handler: Lambda): Lambda => async (...args: Parameters<Lambda>) => {
	const [event] = args;
	const id = event.requestContext.authorizer?.lambda?.id ?? event.requestContext.authorizer?.id;
	if (!id) return status403();

	const { User } = await useDB();
	const user = await User.findByPk(id);
	if (!user) return status404();

	useUser = () => user;

	return handler(...args);
};

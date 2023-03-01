import { Role } from 'libs/database/models/user';
import { status403 } from 'libs/http/status403';
import { useUser, withUser } from 'libs/wrapper/withUser';
import { Lambda } from '../../../../types/lambda';

export const withRole = (allowedRoles: Role[], handler: Lambda): Lambda =>
	withUser(async (...args: Parameters<Lambda>) => {
		const user = useUser();
		const role = user.role;

		if (!role || !allowedRoles.includes(role)) return status403();

		return handler(...args);
	});

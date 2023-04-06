import { status200 } from '../../../libs/http/status200';
import { status400 } from '../../../libs/http/status400';
import { status404 } from '../../../libs/http/status404';
import { useDB, withDB } from '../../../libs/wrapper/withDB';
import { withHttp } from '../../../libs/wrapper/withHttp';
import { Lambda } from '../../../../../types/lambda';
import { User } from '../../../libs/database/model';
import { Role } from '../../../libs/database/models/user';
import { Op } from 'sequelize';

export const handler: Lambda = withHttp(
	withDB(async ({ body }) => {
		if (!body) return status400();

		const { email } = JSON.parse(body);
		if (!email) return status400();

		const { Email } = await useDB();
		const [emailEntity, created] = await Email.findOrCreateByEmail(email);
		if (created) return status404();

		const user = await User.findOne({
			where: { emailId: emailEntity.id, role: { [Op.ne]: Role.IOT } },
		});
		if (!user) return status404();

		await user.resetCredentials();

		return status200();
	}),
);

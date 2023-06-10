import { status200 } from '../../../libs/http/status200';
import { withDB } from '../../../libs/wrapper/withDB';
import { withHttp } from '../../../libs/wrapper/withHttp';
import { Lambda } from '../../../../../types/lambda';
import { Role, User } from '../../../libs/database/models/user';
import { Email, Mesurement } from '../../../libs/database/model';

export const handler: Lambda = withHttp(
	withDB(async () => {
		const iotUsers = await User.findAll({
			where: { role: Role.IOT },
		});

		const iotResult = [];
		for (const user of iotUsers) {
			const email = await Email.findOne({
				where: { id: user.emailId },
			});
			const ownerEmail = email?.email ?? '';

			const ownerUser = await User.findByEmail(ownerEmail);
			const ownerUserId = ownerUser?.id ?? '';
			const ownerName = ownerUser?.name ?? '';

			const measurement = await Mesurement.findOne({
				where: { userId: user.id },
			});
			const location = measurement?.location ?? '';

			iotResult.push({
				id: user.id,
				name: user.name,
				ownerName,
				ownerId: ownerUserId,
				ownerEmail,
				ownerEmailId: user.emailId,
				location,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			});
		}

		return status200({
			data: { iotResult },
		});
	}),
);

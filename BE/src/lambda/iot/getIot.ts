import { status200 } from '../../libs/http/status200';
import { withDB } from '../../libs/wrapper/withDB';
import { withHttp } from '../../libs/wrapper/withHttp';
import { Lambda } from '../../../../types/lambda';
import { User } from 'libs/database/models/user';

// Endpoint pro získání posledního záznamu z DB

export const handler: Lambda = withHttp(
	withDB(async () => {
		// iot users
		const iotUsers = await User.findAll({
			where: { role: 'iot' },
		});
		// const humidityMeasurement = await Mesurement.findOne({
		// 	where: { type: 'humidity' },
		// 	order: [['createdAt', 'DESC']],
		// });

		// výsledek
		return status200({
			data: { iotUsers },
		});
	}),
);

import { status200 } from '../../libs/http/status200';
import { withDB } from '../../libs/wrapper/withDB';
import { withHttp } from '../../libs/wrapper/withHttp';
import { Lambda } from '../../../../types/lambda';
import { Mesurement } from './../../libs/database/models/mesurement';

// Endpoint pro získání posledního záznamu z DB

export const handler: Lambda = withHttp(
	withDB(async () => {
		// poslední záznamu z databáze
		const temperatureMeasurement = await Mesurement.findOne({
			where: { type: 'temperature' },
			order: [['createdAt', 'DESC']],
		});
		const humidityMeasurement = await Mesurement.findOne({
			where: { type: 'humidity' },
			order: [['createdAt', 'DESC']],
		});

		// výsledek
		return status200({
			data: {
				temperature: temperatureMeasurement?.value,
				humidity: humidityMeasurement?.value,
			},
		});
	}),
);

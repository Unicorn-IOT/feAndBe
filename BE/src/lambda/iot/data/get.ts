import { status200 } from '../../../libs/http/status200';
import { withDB } from '../../../libs/wrapper/withDB';
import { withHttp } from '../../../libs/wrapper/withHttp';
import { Lambda } from '../../../../../types/lambda';
import { Mesurement } from '../../../libs/database/models/mesurement';
import { z } from 'zod';
import { validation } from '../../../libs/validation';
import { status400 } from '../../../libs/http/status400';

// Endpoint pro získání posledního záznamu z DB
const Schema = z.object({
	userId: z.string(),
});

export const handler: Lambda = withHttp(
	withDB(async ({ queryStringParameters }) => {
		if (!queryStringParameters) return status400();

		const { userId } = validation(Schema, queryStringParameters);

		const temperatureMeasurement = await Mesurement.findOne({
			where: { type: 'temperature', userId },
			order: [['date', 'DESC']],
		});

		const humidityMeasurement = await Mesurement.findOne({
			where: { type: 'humidity', userId },
			order: [['date', 'DESC']],
		});

		return status200({
			data: {
				location: temperatureMeasurement?.location,
				temperature: temperatureMeasurement?.value,
				dateTemp: temperatureMeasurement?.date,
				humidity: humidityMeasurement?.value,
				dateHum: humidityMeasurement?.date,
			},
		});
	}),
);

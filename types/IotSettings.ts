export type iotSettings = {
	selected: {
		type: MesurementType;
		range: ChartRange;
	};
	available: {
		type: MesurementType[];
		range: ChartRange[];
	};
};

export type MesurementType = 'temperature' | 'humidity';

export enum ChartRange {
	ONE_MONTH = 30,
	THREE_MONTHS = 90,
	ONE_YEAR = 365,
}

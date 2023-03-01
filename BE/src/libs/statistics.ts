export const min = (array: number[]) => Math.min(...array);

export const max = (array: number[]) => Math.max(...array);

export const sum = (array: number[]) => array.reduce((acc, num) => acc + num, 0);

export const mean = (array: number[]) => sum(array) / array.length;

export const median = (array: number[]) => {
	if (!array.length) return 0;
	array.sort((a, b) => a - b);
	const middle = array.length / 2;
	return middle % 1 ? array[middle - 0.5] : (array[middle - 1] + array[middle]) / 2;
};

export const mode = (array: number[]) => {
	if (!array.length) return '';
	if (array.length === 1) return `${array[0]}`;
	return array
		.reduce((acc: Record<'value' | 'count', number>[], value) => {
			const index = acc.findIndex((item) => item.value === value);
			if (~index) {
				acc[index].count += 1;
			} else {
				acc.push({ value, count: 1 });
			}

			return acc;
		}, [])
		.sort((a, b) => b.count - a.count)
		.filter((item, _, array) => (array.length ? item.count === array[0].count : true))
		.map((item) => item.value)
		.join(',');
};

export const variance = (array: number[]) => {
	const meanValue = mean(array);
	return mean(array.map((num) => (num - meanValue) ** 2));
};

export const standardDeviation = (array: number[]) => Math.sqrt(variance(array));

export const getStats = (array: number[]) => ({
	min: min(array),
	max: max(array),
	mean: mean(array),
	median: median(array),
	variance: variance(array),
	standardDeviation: standardDeviation(array),
});

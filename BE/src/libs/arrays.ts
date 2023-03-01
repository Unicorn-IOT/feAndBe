import { ONE_DAY } from 'projectConstants';

export const chunk = <T>(array: T[], size: number): T[][] => {
	const result: T[][] = [];
	for (let i = 0; i < array.length; i += size) {
		result.push(array.slice(i, i + size));
	}

	return result;
};

export const groupBy = <T extends Record<string, unknown>, U extends keyof T>(array: T[], key: U): T[][] => {
	const keys: T[U][] = [];

	return array.reduce((acc: T[][], item) => {
		const index = keys.indexOf(item[key]);
		if (~index) {
			acc[index].push(item);
		} else {
			acc.push([item]);
			keys.push(item[key]);
		}
		return acc;
	}, []);
};

export const uniques = <T>(array: T[]) => array.filter((item, index, array) => array.indexOf(item) === index);

export const uniquesBy = <T extends Record<string, unknown>, U extends keyof T>(array: T[], key: U) =>
	array.filter((item, index, array) => array.findIndex((i) => i[key] === item[key]) === index);

export const granulate = <T extends { timestamp: number }>(array: T[], interval: number): T[][] => {
	if (!array.length) return [];
	const timeStart = array[0].timestamp - (array[0].timestamp % ONE_DAY); // Round down to start of day
	return array
		.reduce((acc: T[][], item) => {
			const index = Math.floor((item.timestamp - timeStart) / interval);
			(acc[index] = acc[index] || []).push(item);
			return acc;
		}, [])
		.filter(Boolean);
};

export const filterUndefined = <T>(array: (T | undefined)[]) => array.filter((item): item is T => typeof item !== 'undefined');

export const sortAsc = (array: number[]) => array.slice().sort();
export const sortDesc = (array: number[]) => array.slice().sort((a, b) => b - a);
export const sortStringsAsc = (array: string[]) => array.slice().sort((a, b) => a.localeCompare(b));
export const sortStringsDesc = (array: string[]) => array.slice().sort((a, b) => b.localeCompare(a));

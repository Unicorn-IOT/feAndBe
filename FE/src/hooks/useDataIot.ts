import { useAppSelector } from '../store';
import { useGetDataIotQuery } from '../store/api/dataIoTApi';
import { dataIoTSlice } from '../store/slices/dataIoTSlice';

export const useDataIot = () => {
	const { type, userId, startDate, endDate, granularity, granularityUnit } = useAppSelector(({ dataIoT }) => dataIoT);

	const { data, isError, isFetching, error } = useGetDataIotQuery({ type, userId, startDate, endDate, granularity, granularityUnit });

	return { data, isError, isFetching, error };
};

// TODO: MANAS !!!!

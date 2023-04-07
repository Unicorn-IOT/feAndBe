import { useAppSelector } from '../store';
import { useGetDataIotQuery } from '../store/api/dataIoTApi';
import { dataIoTSlice } from '../store/slices/dataIoTSlice';

export const useDataIot = () => {
	const { days, time, type, userId } = useAppSelector(({ dataIoT }) => dataIoT);

	const { data, isError, isFetching, error } = useGetDataIotQuery({ days, type, userId });

	return { data, isError, isFetching, error };
};

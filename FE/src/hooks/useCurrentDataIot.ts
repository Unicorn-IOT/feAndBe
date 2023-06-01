import { useAppSelector } from '../store';
import { useGetCurrentDataIoTQuery } from '../store/api/currentDataIoTApi';

export const useCurrentDataIot = () => {
	const { userId } = useAppSelector(({ dataIoT }) => dataIoT);

	const { data, isError, error } = useGetCurrentDataIoTQuery();

	return { data, isError, error, userId };
};

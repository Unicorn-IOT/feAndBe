import { useAppSelector } from '../store';
import { useGetCurrentDataIoTQuery } from '../store/api/currentDataIoTApi';

export const useCurrentDataIot = () => {
	const { userId } = useAppSelector(({ dataIoT }) => dataIoT);

	const { data, isError, ...rest } = useGetCurrentDataIoTQuery({ userId });

	return { data, userId, isError, ...rest };
};

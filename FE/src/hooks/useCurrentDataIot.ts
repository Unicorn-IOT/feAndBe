import { useRouter } from 'next/router';
import { useAppSelector } from '../store';
import { useGetCurrentDataIoTQuery } from '../store/api/currentDataIoTApi';

export const useCurrentDataIot = () => {
	const { userId } = useAppSelector(({ dataIoT }) => dataIoT);

	const {
		query: { stationIdQuery },
	} = useRouter();

	const { data, isError, ...rest } = useGetCurrentDataIoTQuery({
		userId: stationIdQuery ? parseInt(typeof stationIdQuery === 'string' ? stationIdQuery : stationIdQuery[0]) : userId,
	});

	return { data, userId, isError, ...rest };
};

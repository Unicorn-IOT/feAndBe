import { AppStore } from '..';
import { appApi } from '../api';

export const waitForRequests = ({ dispatch }: AppStore) => Promise.all(dispatch(appApi.util.getRunningQueriesThunk()));

import { appApi } from '../api';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const waitForRequests = () => Promise.all(appApi.util.getRunningOperationPromises());

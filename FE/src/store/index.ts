import { AnyAction, configureStore, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { appApi } from './api';
import { appReducer } from './reducers';
import { tokenSlice } from './slices/tokenSlice';
import { nextReduxCookieMiddleware, wrapMakeStore } from 'next-redux-cookie-wrapper';
import { createWrapper } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const makeStore = wrapMakeStore(() =>
	configureStore({
		reducer: appReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.prepend(
					nextReduxCookieMiddleware({
						subtrees: [tokenSlice.name],
						compress: false,
						sameSite: 'lax',
					}),
				)
				.concat(appApi.middleware),
	}),
);
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunkAction<ReturnType = Promise<void>> = ThunkAction<ReturnType, AppState, unknown, AnyAction>;
export type HydrateCookieAction = PayloadAction<Pick<AppState, 'token'>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore);

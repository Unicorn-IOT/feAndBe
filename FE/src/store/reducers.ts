import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices/authSlice';
import { tokenSlice } from './slices/tokenSlice';
import { appApi } from './api';

export const appReducer = combineReducers({
	[appApi.reducerPath]: appApi.reducer,
	[authSlice.name]: authSlice.reducer,
	[tokenSlice.name]: tokenSlice.reducer,
});

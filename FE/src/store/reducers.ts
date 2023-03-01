import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices/authSlice';

export const appReducer = combineReducers({
	[authSlice.name]: authSlice.reducer,
});

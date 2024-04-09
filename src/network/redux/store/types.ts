import { Action, ThunkAction } from '@reduxjs/toolkit';
import { RootState, store } from './store'; // Adjust the import path as needed

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

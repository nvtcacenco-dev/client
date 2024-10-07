import { Action, ThunkAction } from '@reduxjs/toolkit';
import { RootState, store } from './store';

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

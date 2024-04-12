// store.ts

import { UnknownAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../reducers/categorySlice';
import productCountReducer from '../reducers/productCountSlice';
import productReducer from '../reducers/productSlice';
import pageNumberReducer from '../reducers/pageNumberSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import favReducer from '../reducers/favSlice';
import cartReducer from '../reducers/cartSlice';
import { CLEAR_PERSISTED_STATE } from '../actions/actionTypes';
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
  favs: favReducer,
  cart: cartReducer,
  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const rootReducerWithClear = (state: any, action: any) => {
  if (action.type === CLEAR_PERSISTED_STATE) {
    // Clear the persisted state by returning undefined
    state = undefined;
  }
  return persistedReducer(state, action);
};
export const store = configureStore({
  reducer: {
    persistedReducer: rootReducerWithClear,
    productCount: productCountReducer,
    pageNumber: pageNumberReducer,
  },
});


export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

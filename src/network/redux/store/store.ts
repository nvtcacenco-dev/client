// store.ts

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../reducers/categorySlice';
import productCountReducer from '../reducers/productCountSlice';
import productReducer from '../reducers/productSlice';
import pageNumberReducer from '../reducers/pageNumberSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import favReducer from '../reducers/favSlice';


const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
  favs: favReducer,
  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    persistedReducer: persistedReducer,
    productCount: productCountReducer,
    pageNumber: pageNumberReducer,
  },
});


export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

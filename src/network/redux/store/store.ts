
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../reducers/categorySlice';
import productCountReducer from '../reducers/productCountSlice';
import productReducer from '../reducers/productSlice';
import sortReducer from '../reducers/sortSlice';
import pageNumberReducer from '../reducers/pageNumberSlice';
import drawerStatusReducer from '../reducers/drawerStatusSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import favReducer from '../reducers/favSlice';
import cartReducer from '../reducers/cartSlice';
import orderReducer from '../reducers/orderSlice';
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
    
    state = undefined;
  }
  return persistedReducer(state, action);
};
export const store = configureStore({
  reducer: {
    persistedReducer: rootReducerWithClear,
    productCount: productCountReducer,
    pageNumber: pageNumberReducer,
    drawerStatus: drawerStatusReducer,
    sortState: sortReducer,
    orderReducer: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for Redux Persist
    }),
});

export const clearPersistedStateAndRestart = () => {
  persistor.pause();
  persistor.flush().then(() => {
    return persistor.purge();
  }).then(() => {
    persistor.persist();
  });
};

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

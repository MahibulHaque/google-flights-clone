import {configureStore} from '@reduxjs/toolkit';
import {type TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {apiMiddlewares, apiReducers} from './api';
import localReducer from './localReducers'; // Combine reducers

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, localReducer);

export const store = configureStore({
  reducer: {
    local: persistedReducer, // Combining the persisted reducer
    ...apiReducers, // Dynamically adding API reducers
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...apiMiddlewares), // Keep your existing API middlewares
});
export const persistor = persistStore(store);

export type RootState = Required<ReturnType<typeof store.getState>>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './apiSlice';
import authenticationReducer from './features/authentication/authenticationSlice';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, apiSlice.reducer);

const persistedLocationReducer = persistReducer(
	persistConfig,
	authenticationReducer
);

export const store = configureStore({
	reducer: {
		authenticationReducer: persistedLocationReducer, // Use the persisted reducer
		[apiSlice.reducerPath]: apiSlice.reducer, // Include the API slice
	},
	devTools: process.env.NODE_ENV === 'development',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					'persist/PERSIST',
					'persist/REHYDRATE',
					'persist/PAUSE',
					'persist/PURGE',
					'persist/REGISTER',
				],
			},
		}).concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

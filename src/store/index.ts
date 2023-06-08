import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import useApi from './path/to/apiSlice';

import checkboxSlice from './path/to/checkboxSlice ';
import refreshSlice from './path/to/refreshSlice';

export const store = configureStore({
  reducer: {
    checkbox: checkboxSlice,
    refresh: refreshSlice,
    [useApi.reducerPath]: useApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(useApi.middleware)
});

setupListeners(store.dispatch);

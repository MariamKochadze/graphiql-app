import { configureStore } from '@reduxjs/toolkit';
import { errorsNotifyMiddleware } from './middlewares/errorsNotifyMiddleware';
import { userReducer } from './userSlice';
import { responseReducer } from './features/response/responseSlice';
import { historyReducer } from './features/history/historySlice';
import { paramsReducer } from './features/response/paramSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      response: responseReducer,
      history: historyReducer,
      params: paramsReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(errorsNotifyMiddleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { errorsNotifyMiddleware } from './middlewares/errorsNotifyMiddleware';
import { userReducer } from './userSlice';
import { responseReducer } from './features/response/responseSlice';
import { historyReducer } from './features/history/historySlice';
import { paramsReducer } from './features/response/paramSlice';

const rootReducer = combineReducers({
  user: userReducer,
  response: responseReducer,
  history: historyReducer,
  params: paramsReducer,
});

export const makeStore = (preloadedState?: ReturnType<ReturnType<typeof makeStore>['getState']>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(errorsNotifyMiddleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

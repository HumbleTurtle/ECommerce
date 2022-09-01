import { configureStore, ThunkAction, Action, createReducer } from '@reduxjs/toolkit';
import { api } from '../api/api';
import counterReducer from '../features/counter/counterSlice';
import cartReducer from 'features/common/CartSlice';
import userReducer from '../features/common/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  
  middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware()
        .concat(api.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

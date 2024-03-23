import { configureStore } from '@reduxjs/toolkit';
import schedulerReducer from './schedulerSlice';

const store = configureStore({
  reducer: {
    scheduler: schedulerReducer,
  },
});

export default store;

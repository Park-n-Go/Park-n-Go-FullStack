import { configureStore } from '@reduxjs/toolkit'
import dashboardOptionReducer from '../lib/features/dashboard/dashboardOptionSlice.js'


export const store = configureStore({
  reducer: {dashboardOptionReducer},
});



import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import warehouseReducer from './slices/warehouseSlice';
import bookingReducer from './slices/bookingSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  warehouse: warehouseReducer,
  booking: bookingReducer,
});

export default rootReducer;
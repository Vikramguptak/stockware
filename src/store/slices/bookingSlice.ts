import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookingState {
  userBookings: any[];
  vendorBookings: any[];
}

const initialState: BookingState = {
  userBookings: [],
  vendorBookings: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setUserBookings: (state, action: PayloadAction<any[]>) => {
      state.userBookings = action.payload;
    },
    setVendorBookings: (state, action: PayloadAction<any[]>) => {
      state.vendorBookings = action.payload;
    },
    addBooking: (state, action: PayloadAction<any>) => {
      state.userBookings.push(action.payload);
    },
    updateBooking: (state, action: PayloadAction<any>) => {
      const index = state.userBookings.findIndex(b => b._id === action.payload._id);
      if (index !== -1) {
        state.userBookings[index] = action.payload;
      }
      const vendorIndex = state.vendorBookings.findIndex(b => b._id === action.payload._id);
      if (vendorIndex !== -1) {
        state.vendorBookings[vendorIndex] = action.payload;
      }
    },
  },
});

export const { setUserBookings, setVendorBookings, addBooking, updateBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WarehouseState {
  warehouses: any[];
  selectedWarehouse: any | null;
}

const initialState: WarehouseState = {
  warehouses: [],
  selectedWarehouse: null,
};

const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {
    setWarehouses: (state, action: PayloadAction<any[]>) => {
      state.warehouses = action.payload;
    },
    setSelectedWarehouse: (state, action: PayloadAction<any>) => {
      state.selectedWarehouse = action.payload;
    },
    updateWarehouse: (state, action: PayloadAction<any>) => {
      const index = state.warehouses.findIndex(w => w._id === action.payload._id);
      if (index !== -1) {
        state.warehouses[index] = action.payload;
      }
      if (state.selectedWarehouse && state.selectedWarehouse._id === action.payload._id) {
        state.selectedWarehouse = action.payload;
      }
    },
  },
});

export const { setWarehouses, setSelectedWarehouse, updateWarehouse } = warehouseSlice.actions;

export default warehouseSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductCountState {
  count: number;
}

const initialState: ProductCountState = {
  count: 0,
};

const productCountSlice = createSlice({
  name: 'productCount',
  initialState,
  reducers: {
    setProductCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});

export const { setProductCount } = productCountSlice.actions;

export default productCountSlice.reducer;
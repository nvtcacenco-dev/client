import { createSlice} from '@reduxjs/toolkit';
import { RootState } from '../store/store'; // Adjust the path as needed
import { setProduct} from '../actions/actions'; // Import the action creator
import { Product } from '../../../utils/types';



interface ProductState {
    product: Product | null;
  }
  
  const initialState: ProductState = {
    product: null,
  };
  
  const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      // No need to define the action creator here
    },
    extraReducers: (builder) => {
      builder.addCase(setProduct, (state, action) => {
        state.product = action.payload;
      });
    },
  });
  
  export const selectProduct = (state: RootState) => state.persistedReducer.product.product; // Access the 'product' property directly
  
  export default productSlice.reducer;

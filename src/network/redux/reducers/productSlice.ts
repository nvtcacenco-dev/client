import { createSlice} from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { setProduct} from '../actions/actions';
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

    },
    extraReducers: (builder) => {
      builder.addCase(setProduct, (state, action) => {
        state.product = action.payload;
      });
    },
  });
  
  export const selectProduct = (state: RootState) => state.persistedReducer.product.product;
  
  export default productSlice.reducer;

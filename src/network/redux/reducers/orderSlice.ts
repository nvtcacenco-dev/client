import { createSlice} from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {Product } from "../../../utils/types";
import { calculateDiscountedPrice } from "../../../utils/utils";
import { addOrder } from "../actions/actions";

export interface OrderState {
    order: {product: Product, quantity: number, size: string}[];
    total: number;
  }
  
const initialState: OrderState = {
    order: [],
    total: 0
};

const calculateTotal = (order: OrderState['order']): number => {
  const total = order.reduce((total, item) => {
   

    if(item.product.Discount > 0){
      const price = item.product.Price;
      const discount = item.product.Discount;
      const discountedPrice = calculateDiscountedPrice(price, discount);
      return total + discountedPrice * item.quantity;
    } else{
      const price = item.product.Price;
      return total + price * item.quantity;
    }
    
  }, 0);
  return parseFloat(total.toFixed(2));
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(addOrder, (state, action) => {
        const { payload } = action;
        
          state.order = payload;
        

      
      });
    
  },
});

export const selectOrder = (state: RootState) =>
  state.orderReducer.order;
export default orderSlice.reducer;

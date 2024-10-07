import { createSlice} from "@reduxjs/toolkit";
import { RootState } from "../store/store"; 
import { addToCart, decrementCartProduct, incrementCartProduct, removeFromCart } from "../actions/actions";
import {Product } from "../../../utils/types";
import { calculateDiscountedPrice } from "../../../utils/utils";

export interface CartState {
    cart: {product: Product, quantity: number, size: string}[];
    total: number;
  }
  
const initialState: CartState = {
    cart: [],
    total: 0
};

const calculateTotal = (cart: CartState['cart']): number => {
  const total = cart.reduce((total, item) => {
   

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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart, (state, action) => {
        const { payload } = action;
        const existingProduct = state.cart.find(
          (product) => product.product._id === payload.product._id && product.size === payload.size
        );
        if (existingProduct) {
          
          existingProduct.quantity++;
        } else {
          
          state.cart.push({ product: payload.product, quantity: 1, size: payload.size });
        }

        state.total = calculateTotal(state.cart)
      });
    builder.addCase(incrementCartProduct, (state, action) => {
      const { payload } = action;
      state.cart[payload].quantity++;
      state.total = calculateTotal(state.cart)
    });
    builder.addCase(decrementCartProduct, (state, action) => {
      const { payload } = action;
      if (payload >= 0 && payload < state.cart.length) {
        state.cart[payload].quantity--;
        
      } else {
        console.error("Invalid index provided for decrementing cart product quantity.");
      }
      state.total = calculateTotal(state.cart)
    });
    builder.addCase(removeFromCart, (state, action) => {
      const { payload } = action;
      if (payload >= 0 && payload < state.cart.length) {
        state.cart.splice(payload, 1);
      } else {
        console.error("Invalid index provided for decrementing cart product quantity.");
      }
      state.total = calculateTotal(state.cart)
    });
  },

  
  
});

export const selectCart = (state: RootState) =>
  state.persistedReducer.cart.cart; 

export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store"; // Adjust the path as needed
import { addToCart, decrementCartProduct, incrementCartProduct, removeFromCart } from "../actions/actions"; // Import the action creator
import { Cart, Product } from "../../../types/types";

interface CartState {
    cart: {product: Product, quantity: number, size: string}[];
    total: number;
  }
  
const initialState: CartState = {
    cart: [],
    total: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart, (state, action) => {
      const { payload } = action;
      if(state.cart.length > 0){
        const existingIndex = state.cart.findIndex(
            (product) => product.product._id === payload.product._id
          );
          if (existingIndex !== -1) {
            // Product exists, increment quantity
            if(state.cart[existingIndex].size === payload.size){
                state.cart[existingIndex].quantity++;
            }else{
                state.cart.push({ product: payload.product, quantity: 1, size: payload.size})
            }
            
            
          } else {
            // Product does not exist, add it to cart
            state.cart.push({ product: payload.product, quantity: 1, size: payload.size});
          }
      } else{
        state.cart.push({ product: payload.product, quantity: 1, size: payload.size});
      }
      
    });
    builder.addCase(incrementCartProduct, (state, action) => {
      const { payload } = action;
      state.cart[payload].quantity++;
    });
    builder.addCase(decrementCartProduct, (state, action) => {
      const { payload } = action;
      if (payload >= 0 && payload < state.cart.length) {
        if (state.cart[payload].quantity === 1) {
          // If quantity is 1, remove the item from the cart
          state.cart.splice(payload, 1);
        } else {
          // Otherwise, decrement the quantity
          state.cart[payload].quantity--;
        }
      } else {
        console.error("Invalid index provided for decrementing cart product quantity.");
      }
    });
  },
  
});

export const selectCart = (state: RootState) =>
  state.persistedReducer.cart.cart; // Access the 'product' property directly

export default cartSlice.reducer;

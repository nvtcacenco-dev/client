import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store"; // Adjust the path as needed
import { addToCart, decrementCartProduct, incrementCartProduct, removeFromCart } from "../actions/actions"; // Import the action creator
import {Product } from "../../../types/types";

interface CartState {
    cart: {product: Product, quantity: number, size: string}[];
    total: number;
  }
  
const initialState: CartState = {
    cart: [],
    total: 0
};

const calculateTotal = (cart: CartState['cart']): number => {
  const total = cart.reduce((total, item) => {
    const price = parseFloat(item.product.Price);
    return total + price * item.quantity;
  }, 0);
  return parseFloat(total.toFixed(2)); // Round to two decimal places
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
          // Product exists, increment quantity
          existingProduct.quantity++;
        } else {
          // Product does not exist with the same size, add it to cart
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
  state.persistedReducer.cart.cart; // Access the 'product' property directly

export default cartSlice.reducer;

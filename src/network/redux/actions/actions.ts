import { createAction } from '@reduxjs/toolkit';
import { SET_CATEGORY_ID, SET_CATEGORY_NAME, SET_PRODUCT, ADD_FAV, ADD_TO_CART, REMOVE_FROM_CART, INCREMENT_CART_PRODUCT, DECREMENT_CART_PRODUCT } from './actionTypes';
import { Product } from '../../../types/types';



export const setCategoryID = createAction<string|null>(SET_CATEGORY_ID);

export const setCategoryName = createAction<string|null>(SET_CATEGORY_NAME);

export const setProduct = createAction<Product|null>(SET_PRODUCT);

export const addFav = createAction<Product>(ADD_FAV);

export const addToCart = createAction<{product: Product, size: string}>(ADD_TO_CART);

export const incrementCartProduct = createAction<number>(INCREMENT_CART_PRODUCT);

export const decrementCartProduct = createAction<number>(DECREMENT_CART_PRODUCT);

export const removeFromCart = createAction<number>(REMOVE_FROM_CART);

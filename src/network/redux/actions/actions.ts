import { createAction } from "@reduxjs/toolkit";
import {
  SET_CATEGORY_ID,
  SET_CATEGORY_NAME,
  SET_PRODUCT,
  ADD_FAV,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_CART_PRODUCT,
  DECREMENT_CART_PRODUCT,
  SET_FAVS,
  CLEAR_PERSISTED_STATE,
  RESET_CATEGORY_STATE,
  SET_SORTING_PRICE,
  SET_SORTING_DATE,
  SET_SORTING_NAME,
  SET_SORTING_POPULARITY,
} from "./actionTypes";
import { Product, Sort } from "../../../utils/types";

export const setCategoryID = createAction<string | null>(SET_CATEGORY_ID);

export const setCategoryName = createAction<string | null>(SET_CATEGORY_NAME);

export const resetCategoryState = createAction(
  RESET_CATEGORY_STATE
);

export const setProduct = createAction<Product | null>(SET_PRODUCT);

export const addFav = createAction<Product>(ADD_FAV);

export const setFavs = createAction<Product[]>(SET_FAVS);

export const addToCart = createAction<{ product: Product; size: string }>(
  ADD_TO_CART
);

export const incrementCartProduct = createAction<number>(
  INCREMENT_CART_PRODUCT
);

export const decrementCartProduct = createAction<number>(
  DECREMENT_CART_PRODUCT
);

export const removeFromCart = createAction<number>(REMOVE_FROM_CART);

export const clearPersistedState = createAction(CLEAR_PERSISTED_STATE);

export const setSortingPrice = createAction<Sort>(SET_SORTING_PRICE);

export const setSortingName = createAction<Sort>(SET_SORTING_NAME);

export const setSortingDate = createAction<Sort>(SET_SORTING_DATE);

export const setSortingPopularity = createAction<Sort>(SET_SORTING_POPULARITY);

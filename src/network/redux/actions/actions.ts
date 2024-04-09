import { createAction } from '@reduxjs/toolkit';
import { SET_CATEGORY_ID, SET_CATEGORY_NAME, SET_PRODUCT, ADD_FAV } from './actionTypes';
import { Product } from '../../../types/types';



export const setCategoryID = createAction<string|null>(SET_CATEGORY_ID);

export const setCategoryName = createAction<string|null>(SET_CATEGORY_NAME);

export const setProduct = createAction<Product|null>(SET_PRODUCT);

export const addFav = createAction<Product>(ADD_FAV);

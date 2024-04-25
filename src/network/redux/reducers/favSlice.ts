import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store"; // Adjust the path as needed
import { addFav, setFavs } from "../actions/actions"; // Import the action creator
import { Product } from "../../../types/types";


interface FavState {
  favs: Product[];
}

const initialState: FavState = {
  favs: [],
};

const favSlice = createSlice({
  name: "favs",
  initialState,
  reducers: {
    // No need to define the action creator here
  },
  extraReducers: (builder) => {
    builder.addCase(addFav, (state, action) => {
      const { payload } = action;
      // Check if the product already exists in favs
      const existingIndex = state.favs.findIndex(
        (product) => product._id === payload._id
      );
      if (existingIndex !== -1) {
        // Product exists, remove it from favs
        state.favs.splice(existingIndex, 1);
      } else {
        // Product does not exist, add it to favs
        state.favs.push(payload);
      }
    });
    builder.addCase(setFavs, (state, action) => {
      const { payload } = action;
      state.favs = payload;
    });
  },
});

export const selectFavs = (state: RootState) => state.persistedReducer.favs.favs; 

export default favSlice.reducer;

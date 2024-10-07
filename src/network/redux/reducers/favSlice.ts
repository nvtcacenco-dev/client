import { createSlice} from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { addFav, setFavs } from "../actions/actions";
import { Product } from "../../../utils/types";


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

  },
  extraReducers: (builder) => {
    builder.addCase(addFav, (state, action) => {
      const { payload } = action;

      const existingIndex = state.favs.findIndex(
        (product) => product._id === payload._id
      );
      if (existingIndex !== -1) {

        state.favs.splice(existingIndex, 1);
      } else {

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

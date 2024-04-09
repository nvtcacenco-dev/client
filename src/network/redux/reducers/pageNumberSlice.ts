// pageNumberSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageNumberState {
  pageNumber: number;
}

const initialState: PageNumberState = {
  pageNumber: 1,
};

const pageNumberSlice = createSlice({
  name: "pageNumber",
  initialState,
  reducers: {
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    incrPageNumber: (state) => {
      state.pageNumber += 1;
    },
    resetPageNumber: (state) => {
        
        state.pageNumber = initialState.pageNumber;
        
    }
  },
});

export const { setPageNumber, incrPageNumber, resetPageNumber } = pageNumberSlice.actions;

export default pageNumberSlice.reducer;

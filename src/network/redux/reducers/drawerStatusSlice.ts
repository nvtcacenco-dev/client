import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface drawerStatusState {
  state: boolean;
  state2nd: boolean;
  
}

const initialState: drawerStatusState = {
  state: false,
  state2nd: false,
};

const drawerStatusSlice = createSlice({
  name: 'drawerStatus',
  initialState,
  reducers: {
    setDrawerStatus: (state, action: PayloadAction<boolean>) => {
        state.state = action.payload;
      },
    setDrawerStatus2: (state, action: PayloadAction<boolean>) => {
        state.state2nd = action.payload;
      }
  },
  
});

export const { setDrawerStatus } = drawerStatusSlice.actions;
export const { setDrawerStatus2 } = drawerStatusSlice.actions;
export default drawerStatusSlice.reducer;

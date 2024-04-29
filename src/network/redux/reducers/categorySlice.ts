import { createSlice} from '@reduxjs/toolkit';
import { RootState } from '../store/store'; 
import { resetCategoryState, setCategoryID, setCategoryName } from '../actions/actions'; // Import the action creator

interface CategoryState {
  categoryID: string | null;
  categoryName: string | null;
}

const initialState: CategoryState = {
  categoryID: null,
  categoryName: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // No need to define the action creator here
  },
  extraReducers: (builder) => {
    builder.addCase(setCategoryID, (state, action) => {
      state.categoryID = action.payload;
    });
    builder.addCase(setCategoryName, (state, action)=>{
      state.categoryName = action.payload;
    });

    builder.addCase(resetCategoryState, (state, action)=>{
      state.categoryName = null;
      state.categoryID = null;
    });
  },
});

export const selectCategoryID = (state: RootState) => state.persistedReducer.category.categoryID;

export default categorySlice.reducer;

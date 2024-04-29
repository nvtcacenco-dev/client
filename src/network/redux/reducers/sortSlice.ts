import { setSortingDate, setSortingName, setSortingPopularity, setSortingPrice } from "../actions/actions";
import { createSlice} from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export interface SortState {
    Price: {
        state: boolean,
        order: string,
    };
    Name: {
        state: boolean,
        order: string,
    };

    Date: {
        state: boolean,
        order: string,
    };

    Popularity: {
        state: boolean,
        order: string,
    };
    
  }
  
  const initialState: SortState = {
    Price: {
        state: false,
        order: 'desc',
    },

    Name: {
        state: false,
        order: 'desc',
    },

    Date: {
        state: false,
        order: 'desc',
    },

    Popularity: {
        state: false,
        order: 'desc',
    },
  };
  
  const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
      // No need to define the action creator here
    },
    extraReducers: (builder) => {
      builder.addCase(setSortingPrice, (state, action) => {
        state.Price.state= action.payload.state;
        state.Price.order= action.payload.order;
      });

      builder.addCase(setSortingName, (state, action) => {
        state.Name.state= action.payload.state;
        state.Name.order= action.payload.order;
      });

      builder.addCase(setSortingDate, (state, action) => {
        state.Date.state= action.payload.state;
        state.Date.order= action.payload.order;
      });

      builder.addCase(setSortingPopularity, (state, action) => {
        state.Popularity.state= action.payload.state;
        state.Popularity.order= action.payload.order;
      });
    },
  });

export const sortState = (state: RootState) => state.sortState;

export default sortSlice.reducer;
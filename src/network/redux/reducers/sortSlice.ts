import { setSortingCreatedAt, setSortingName, setSortingPopularity, setSortingPrice } from "../actions/actions";
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

    CreatedAt: {
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

    CreatedAt: {
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
    },
    extraReducers: (builder) => {
      builder.addCase(setSortingPrice, (state, action) => {
        state.Price.state= action.payload.state;
        state.Price.order= action.payload.order;

        state.Name.state= false;
        state.CreatedAt.state= false;
        state.Popularity.state= false;
      });

      builder.addCase(setSortingName, (state, action) => {
        state.Name.state= action.payload.state;
        state.Name.order= action.payload.order;

        state.Price.state= false;
        state.CreatedAt.state= false;
        state.Popularity.state= false;
      });

      builder.addCase(setSortingCreatedAt, (state, action) => {
        state.CreatedAt.state= action.payload.state;
        state.CreatedAt.order= action.payload.order;

        state.Price.state= false;
        state.Name.state= false;
        state.Popularity.state= false;
      });

      builder.addCase(setSortingPopularity, (state, action) => {
        state.Popularity.state= action.payload.state;
        state.Popularity.order= action.payload.order;

        state.Price.state= false;
        state.Name.state= false;
        state.CreatedAt.state= false;
      });
    },
  });

export const sortState = (state: RootState) => state.sortState;

export default sortSlice.reducer;
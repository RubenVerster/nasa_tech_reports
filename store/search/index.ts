import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ISearchResult } from '../../types';

export interface SearchState {
  genesisResults: ISearchResult[];
  replaceResults: ISearchResult[];
  loading: boolean;
  error: boolean | null;
}

const initialState: SearchState = {
  genesisResults: [],
  replaceResults: [],
  loading: false,
  error: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setGenesisResults: (state, action: PayloadAction<ISearchResult[]>) => {
      state.genesisResults = action.payload;
    },
    setReplaceResults: (state, action: PayloadAction<ISearchResult[]>) => {
      state.replaceResults = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGenesisResults, setReplaceResults } = searchSlice.actions;

export default searchSlice.reducer;

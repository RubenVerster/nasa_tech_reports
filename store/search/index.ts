import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ISearchResult, SearchState } from '../../types';

const initialState: SearchState = {
  genesisResults: [],
  replaceResults: [],
  loading: false,
  firstSearch: true,
  searchTerm: '',
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
    setFirstSearch: (state, action: PayloadAction<boolean>) => {
      state.firstSearch = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGenesisResults, setReplaceResults, setLoading, setFirstSearch, setSearchTerm } =
  searchSlice.actions;

export default searchSlice.reducer;

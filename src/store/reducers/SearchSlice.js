import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchItem: '',
    searchResult: [],
    totalSearchResultCount: 0,
};

export const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchItem(state, action) {
            state.searchItem = action.payload;
        },
        setSearchResult(state, action) {
            state.searchResult = action.payload;
        },
        setTotalSearchResultCount(state, action) {
            state.totalSearchResultCount = action.payload;
        },
    },
});

export const {
    setSearchItem,
    setSearchResult,
    setTotalSearchResultCount,
} = SearchSlice.actions;

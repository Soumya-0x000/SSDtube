import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchItem: '',
    searchResult: [],
    totalSearchResultCount: 0,
    nextPgToken: ''
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
        setNextPageToken: function (state, action) {
            state.nextPgToken = action.payload;
        },
    },
});

export const {
    setSearchItem,
    setSearchResult,
    setTotalSearchResultCount,
    setNextPageToken,
} = SearchSlice.actions;

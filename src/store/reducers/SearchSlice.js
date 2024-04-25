import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchItems: [],
    totalSearchItemCount: 0,
};

export const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchItems(state, action) {
            state.searchItems = action.payload;
        },
        setTotalSearchItemCount(state, action) {
            state.totalSearchItemCount = action.payload;
        },
    },
});

export const {
    setSearchItems,
    setTotalItemCount,
} = SearchSlice.actions;

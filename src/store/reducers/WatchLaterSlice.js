import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    watchLaterData: [],
    totalVids: 0,
    watchLaterBanner: ''
};

export const WatchLaterSlice = createSlice({
    name: 'watchLater',
    initialState,
    reducers: {
        setWatchLaterData: function (state, action) {
            state.watchLaterData = action.payload;
            state.totalVids = action.payload.length;
        },
        clearWatchLaterList: (state, action) => {
            state.watchLaterData = action.payload;
            state.totalVids = 0;
        },
        setWatchLaterBanner: function(state, action) {
            state.watchLaterBanner = action.payload;
        },
    }
});

export const {
    setWatchLaterData,
    clearWatchLaterList,
    setWatchLaterBanner
} = WatchLaterSlice.actions;

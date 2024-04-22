import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    watchQueue: [],
    isWatchQueueOn: false,
};

export const WatchQueueSlice = createSlice({
    name: 'watchQueue',
    initialState,
    reducers: {
        setWatchQueue: function(state, action) {
            state.watchQueue = action.payload;
        },
        setIsWatchQueueOn: function(state, action) {
            state.isWatchQueueOn = action.payload;
        },
    }
});

export const {
    setWatchQueue,
    setIsWatchQueueOn,
} = WatchQueueSlice.actions;

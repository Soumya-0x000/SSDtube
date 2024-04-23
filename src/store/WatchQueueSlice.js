import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    watchQueue: [],
    isWatchQueueOn: false,
    totalVdo: 0,
    currentClickIndex: 1
};

export const WatchQueueSlice = createSlice({
    name: 'watchQueue',
    initialState,
    reducers: {
        setWatchQueue: function(state, action) {
            state.watchQueue = action.payload;
            state.totalVdo = state.watchQueue.length;
        },
        setIsWatchQueueOn: function(state, action) {
            state.isWatchQueueOn = action.payload;
        },
        setCurrentClickIndex: function(state, action) {
            state.currentClickIndex = action.payload;
        },
    }
});

export const {
    setWatchQueue,
    setIsWatchQueueOn,
    setCurrentClickIndex,
} = WatchQueueSlice.actions;

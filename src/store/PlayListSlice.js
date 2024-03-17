import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    channelName: '',
    totalItemCount: 0,
    currentItemsCount: 0,
    nxtPgToken: '',
}

export const PlayListSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        setChannelName: function(state, action) {
            state.channelName = action.payload;
        }
    },
})

export const {
    setChannelName
} = PlayListSlice.actions

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    channelName: '',
    playListTitle: '',
    totalItemCount: 0,
    currentItemsCount: 0,
    nxtPgToken: '',
    playListData: [],
    playListBannerUrl: ''
}

export const PlayListSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        setChannelName: function (state, action) {
            state.channelName = action.payload;
        },
        setPlaylistName: function(state, action) {
            state.playListTitle = action.payload;
        },
        setCounting: function(state, action) {
            const {totalCount, currentCount} = action.payload;
            state.totalItemCount = totalCount;
            state.currentItemsCount = currentCount
        },
        setPlayListData: function(state, action) {
            state.playListData = action.payload;
        },
        setNextPgToken: function(state, action) {
            state.nxtPgToken = action.payload
        },
        setBannerUrl: function(state, action) {
            state.playListBannerUrl = action.payload;
        },
    },
})

export const {
    setChannelName,
    setPlaylistName,
    setCounting,
    setPlayListData,
    setNextPgToken,
    setBannerUrl
} = PlayListSlice.actions

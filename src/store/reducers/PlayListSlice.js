import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playListID: '',
    channelName: '',
    playListTitle: '',
    totalItemCount: 0,
    currentItemsCount: 0,
    prevPgItemCount: 0,
    nxtPgToken: '',
    playListData: [],
    playListBannerUrl: '',
    playListDescription: '',
    playListOn: false,
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
        setPlaylistID: function(state, action) {
            state.playListID = action.payload
        },
        setPlayListDescription: function(state, action) {
            state.playListDescription = action.payload
        },
        setPlayListOn: function (state, action) {
            state.playListOn = action.payload;
        },
        setPrevPgItemCount: function(state, action) {
            state.prevPgItemCount = action.payload;
        },
    },
})

export const {
    setChannelName,
    setPlaylistName,
    setCounting,
    setPlayListData,
    setNextPgToken,
    setBannerUrl,
    setPlaylistID,
    setPlayListDescription,
    setPlayListOn,
    setPrevPgItemCount
} = PlayListSlice.actions

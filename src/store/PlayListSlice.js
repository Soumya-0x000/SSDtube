import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playListId: '',
    channelName: '',
    playListTitle: '',
    totalItemCount: 0,
    currentItemsCount: 0,
    nxtPgToken: '',
    playListData: [],
    playListBannerUrl: '',
    playListDescription: '',
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
            // console.log(totalCount, currentCount)
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
            state.playListId = action.payload
        },
        setPlayListDescription: function(state, action) {
            state.playListDescription = action.payload
        }
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
    setPlayListDescription
} = PlayListSlice.actions

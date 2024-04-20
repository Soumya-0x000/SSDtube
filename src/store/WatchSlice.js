import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentlyPlayingVdoId: '',
    currentPlaylistId: '',
    vdoData: '',
    vdoIDarr: [],
    channelID: '',
    recommendedVdoData: [],
    nxtPgToken: '',
    isPlaylistRendered: false,
    essentialVdoItems: {
        like: 0,
        comment: 0,
        channelTitle: '',
        subscribers: 0
    }
};

export const WatchSlice = createSlice({
    name: "watch",
    initialState,
    reducers: {
        setWatchData: function (state, action) {
            state.vdoData = action.payload
        },
        setVidIdArr: function (state, action) {
            state.vdoIDarr = action.payload
        },
        setChannelId: function (state, action) {
            state.channelID = action.payload;
        },
        setRecommendedVdo: function (state, action) {
            state.recommendedVdoData = action.payload
            // console.log(state.recommendedVdoData)
        },
        setNxtPgToken: function (state, action) {
            state.nxtPgToken = action.payload;
        },
        setCurrentlyPlayingVdoId: function(state, action) {
            state.currentlyPlayingVdoId = action.payload
        },
        setCurrentPlaylistId: function(state, action) {
            state.currentPlaylistId = action.payload;
        },
        setIsPlaylistRendered: function(state, action) {
            state.isPlaylistRendered = action.payload;
        },
        setEssentialVdoItems: function(state, action) {
            state.essentialVdoItems = action.payload
        },
    }
})

export const {
    setCurrentlyPlayingVdoId,
    setWatchData,
    setVidIdArr,
    setChannelId,
    setRecommendedVdo,
    setNxtPgToken,
    // setCurrentPlaylistId,
    setIsPlaylistRendered,
    setEssentialVdoItems,
} = WatchSlice.actions;

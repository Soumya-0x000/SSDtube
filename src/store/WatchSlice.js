import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vdoData: '',
    vdoIDarr: [],
    channelID: '',
    recommendedVdoData: [],
    nxtPgToken: '',
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
    }
})

export const {
    setWatchData,
    setVidIdArr,
    setChannelId,
    setRecommendedVdo,
    setNxtPgToken,
} = WatchSlice.actions;

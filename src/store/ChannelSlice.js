import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    channelID: '',
    channelName: '',
    subscriberCount: 0,
    logoURL: [],
    channelBanner: '',
}

export const ChannelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers:{
        setChannelData: function(state, action) {
            // const {id, channelName, subscriberNo, url, banner} = action.payload;
            state.logoURL.push(action.payload);
        }
    }
});

export const {
    setChannelData
} = ChannelSlice.actions;

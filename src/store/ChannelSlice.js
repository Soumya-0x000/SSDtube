import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: '', 
    description: '',  
    subscribers: 0, 
    videoCount: 0, 
    viewCount: 0, 
    url: '',
    customUrl: '',
};

export const ChannelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers:{
        setChannelData: function(state, action) {
            const {
                title, 
                description, 
                subscribers, 
                videoCount, 
                viewCount, 
                url,
                customUrl
            } = action.payload;
            state.title = title;
            state.description = description;
            state.subscribers = subscribers;
            state.videoCount = videoCount;
            state.viewCount = viewCount;
            state.url = url;
            state.customUrl = customUrl;
        }
    }
});

export const {
    setChannelData
} = ChannelSlice.actions;

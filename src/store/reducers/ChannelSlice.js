import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: '', 
    description: '',  
    subscribers: 0, 
    videoCount: 0, 
    viewCount: 0, 
    url: '',
    customUrl: '',
    creationTime: '',
    isLoaded: false,
    channelId: '',
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
                customUrl,
                creationTime,
                isLoaded
            } = action.payload;
            state.title = title;
            state.description = description;
            state.subscribers = subscribers;
            state.videoCount = videoCount;
            state.viewCount = viewCount;
            state.url = url;
            state.customUrl = customUrl;
            state.creationTime = creationTime;
            state.title !== '' && `${state.isLoaded=true}`;
        },
        setChannelId: function (state, action) {
            state.channelId = action.payload
        }
    }
});

export const {
    setChannelData, setChannelId
} = ChannelSlice.actions;

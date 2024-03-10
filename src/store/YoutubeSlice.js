import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: true,
    videos: [],
    currentPlaying: null,
    searchItem: "",
    searchResults: [],
    nextPageToken: null,
    recommendedVideos: [],
};

export const YoutubeSlice = createSlice({
    name: 'youtube',
    initialState,
    reducers: {
        setHomePageVideo: function (state, action) {
            state.videos = action.payload
            action.payload !== undefined && `${state.isLoading = false}`
            // console.log(action.payload)
        }
    },
    extraReducers: (builder) => {

    },
});

export const {
    setHomePageVideo,
} = YoutubeSlice.actions;

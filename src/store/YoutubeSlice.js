import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: true,
    totalResults: 0,
    pageNumber: 1,
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
            action.payload !== undefined && state.videos.length > 0 && `${state.isLoading = false}`
            // console.log(action.payload)
        },
        setNxtPageToken: function (state, action) {
            state.nextPageToken = action.payload;
        },
        countTotalResults: function (state, action) {
            state.totalResults = action.payload
        },
    },
    extraReducers: (builder) => {

    },
});

export const {
    setHomePageVideo,
    setNxtPageToken,
    countTotalResults,
} = YoutubeSlice.actions;

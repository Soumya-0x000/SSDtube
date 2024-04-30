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
    categoryName: 'All',
};

export const HomePageSlice = createSlice({
    name: 'youtube',
    initialState,
    reducers: {
        setHomePageVideo: function (state, action) {
            state.videos = action.payload
            action.payload !== undefined && state.videos.length > 0 && `${state.isLoading = false}`
        },
        setNxtPageToken: function (state, action) {
            state.nextPageToken = action.payload;
        },
        countTotalResults: function (state, action) {
            state.totalResults = action.payload
        },
        setCategoryName: function (state, action) {
            state.categoryName = action.payload
        },
    },
});

export const {
    setHomePageVideo,
    setNxtPageToken,
    countTotalResults,
    setCategoryName
} = HomePageSlice.actions;

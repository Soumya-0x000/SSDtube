import { createSlice } from "@reduxjs/toolkit"

const initialState = {
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

    },
    extraReducers: (builder) => {

    },
});

export const {
} = YoutubeSlice.actions;

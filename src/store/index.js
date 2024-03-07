import { configureStore, createSlice } from "@reduxjs/toolkit"

const initialState = {
    videos: [],
    currentPlaying: null,
    searchItem: "",
    searchResults: [],
    nextPageToken: null,
    recommendedVideos: [],
};

const YoutubeSlice = createSlice({
    name: 'youtube',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    },
});

export const store = configureStore({
    reducer: {
        youtube: YoutubeSlice.reducer,
    }
})

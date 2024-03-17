import { configureStore } from "@reduxjs/toolkit";
import { SideBarSlice } from "./SidebarSlice";
import { YoutubeSlice } from "./YoutubeSlice";
import { ThemeSlice } from "./ThemeSlice";
import { ChannelSlice } from "./ChannelSlice";
import { PlayListSlice } from "./PlayListSlice";

export const store = configureStore({
    reducer: {
        youtube: YoutubeSlice.reducer,
        sidebar: SideBarSlice.reducer,
        theme: ThemeSlice.reducer,
        channel: ChannelSlice.reducer,
        playlist: PlayListSlice.reducer
    }
})
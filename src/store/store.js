import { configureStore } from "@reduxjs/toolkit";
import { SideBarSlice } from "./SidebarSlice";
import { YoutubeSlice } from "./YoutubeSlice";
import { WatchSlice } from "./WatchSlice";
import { ChannelSlice } from "./ChannelSlice";
import { PlayListSlice } from "./PlayListSlice";

export const store = configureStore({
    reducer: {
        youtube: YoutubeSlice.reducer,
        sidebar: SideBarSlice.reducer,
        watch: WatchSlice.reducer,
        channel: ChannelSlice.reducer,
        playlist: PlayListSlice.reducer
    }
})
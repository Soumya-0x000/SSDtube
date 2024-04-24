import { configureStore } from "@reduxjs/toolkit";
import { SideBarSlice } from "./reducers/SidebarSlice";
import { YoutubeSlice } from "./reducers/YoutubeSlice";
import { WatchSlice } from "./reducers/WatchSlice";
import { ChannelSlice } from "./reducers/ChannelSlice";
import { PlayListSlice } from "./reducers/PlayListSlice";
import { WatchQueueSlice } from "./reducers/WatchQueueSlice";
import { WatchLaterSlice } from "./reducers/WatchLaterSlice";

export const store = configureStore({
    reducer: {
        youtube: YoutubeSlice.reducer,
        sidebar: SideBarSlice.reducer,
        watch: WatchSlice.reducer,
        channel: ChannelSlice.reducer,
        playlist: PlayListSlice.reducer,
        watchQueue: WatchQueueSlice.reducer,
        watchLater: WatchLaterSlice.reducer,
    }
})
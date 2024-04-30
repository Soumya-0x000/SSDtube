import { configureStore } from "@reduxjs/toolkit";
import { SideBarSlice } from "./reducers/SidebarSlice";
import { HomePageSlice } from "./reducers/HomePageSlice";
import { WatchSlice } from "./reducers/WatchSlice";
import { ChannelSlice } from "./reducers/ChannelSlice";
import { PlayListSlice } from "./reducers/PlayListSlice";
import { WatchQueueSlice } from "./reducers/WatchQueueSlice";
import { WatchLaterSlice } from "./reducers/WatchLaterSlice";
import { SearchSlice } from "./reducers/SearchSlice";
import { CommentSlice } from "./reducers/CommentSlice";

export const store = configureStore({
    reducer: {
        youtube: HomePageSlice.reducer,
        sidebar: SideBarSlice.reducer,
        watch: WatchSlice.reducer,
        channel: ChannelSlice.reducer,
        playlist: PlayListSlice.reducer,
        watchQueue: WatchQueueSlice.reducer,
        watchLater: WatchLaterSlice.reducer,
        search: SearchSlice.reducer,
        comments: CommentSlice.reducer,
    }
})
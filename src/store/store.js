import { configureStore } from "@reduxjs/toolkit";
import { SideBarSlice } from "./SidebarSlice";
import { YoutubeSlice } from "./YoutubeSlice";
import { ThemeSlice } from "./ThemeSlice";

export const store = configureStore({
    reducer: {
        youtube: YoutubeSlice.reducer,
        sidebar: SideBarSlice.reducer,
        theme: ThemeSlice.reducer,
    }
})
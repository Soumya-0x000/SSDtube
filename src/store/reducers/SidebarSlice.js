import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSidebarOpen: true,
    isFullSidebarWindowSupport: true,
    isFloatSidebar: false,
}

export const SideBarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        sideBarOpen: function(state, action) {
            state.isSidebarOpen = action.payload
        },
        fullSidebarWindowSupport: function(state, action) {
            state.isFullSidebarWindowSupport = action.payload
        },
        sideBarFloat: function(state, action) {
            state.isFloatSidebar = action.payload
        }
    }
})

export const {
    sideBarOpen,
    fullSidebarWindowSupport,
    sideBarFloat,
} = SideBarSlice.actions

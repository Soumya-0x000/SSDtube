import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentThemeMode: 'dark'
};

export const ThemeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: function (state, action) {
            state.currentThemeMode = action.payload
        }
    }
})

export const {
    setTheme
} = ThemeSlice.actions;

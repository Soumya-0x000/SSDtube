import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
    totalCommentCount: 0,
};

export const CommentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setComments(state, action) {
            state.comments = action.payload;
        },
        setTotalCommentCount(state, action) {
            state.totalCommentCount = action.payload;
        },
    },
});

export const {
    setComments, setTotalCommentCount
} = CommentSlice.actions;

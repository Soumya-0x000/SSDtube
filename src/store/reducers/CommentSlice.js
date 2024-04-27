import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
    totalCommentCount: 0,
    nxtPageToken: '',
    newCommentToAdd: ''
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
        setNxtPgToken(state, action) {
            state.nxtPageToken = action.payload;
        },
        setNewCommentToAdd(state, action) {
            state.comments.unshift(action.payload);
        },
    },
});

export const {
    setComments, 
    setTotalCommentCount,
    setNxtPgToken,
    setNewCommentToAdd,
} = CommentSlice.actions;

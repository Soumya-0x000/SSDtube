import { createSlice } from "@reduxjs/toolkit";
import { setNextPgToken } from "./PlayListSlice";

const initialState = {
    comments: [],
    totalCommentCount: 0,
    nxtPageToken: '',
};

export const CommentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setComments(state, action) {
            state.comments = action.payload;
            console.log(action.payload)
        },
        setTotalCommentCount(state, action) {
            state.totalCommentCount = action.payload;
        },
        setNxtPgToken(state, action) {
            state.nxtPageToken = action.payload;
        },
    },
});

export const {
    setComments, 
    setTotalCommentCount,
    setNxtPgToken,
} = CommentSlice.actions;

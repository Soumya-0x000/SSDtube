import { createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = process.env.VITE_YOUTUBE_API_KEY;

export const getHomePageVideos = createAsyncThunk("")
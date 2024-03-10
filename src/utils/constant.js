export const BASE_URL = "https://www.googleapis.com/youtube/v3";
export const YOUTUBE_API_KEY = import.meta.env.VITE_APP_YOUTUBE_API_KEY;
export const YOUTUBE_VIDEO_API = `${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=40&regionCode=US&key=${YOUTUBE_API_KEY}`;
export const MY_LIKED_VIDEOS = `${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=60&myRating=like&key=${YOUTUBE_API_KEY}`;

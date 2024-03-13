import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const BASE_URL = "https://www.googleapis.com/youtube/v3";
export const YOUTUBE_API_KEY = import.meta.env.VITE_APP_YOUTUBE_API_KEY;
export const YOUTUBE_VIDEO_API = `${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=60&regionCode=US&key=${YOUTUBE_API_KEY}`;
export const MY_LIKED_VIDEOS = `${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=60&myRating=like&key=${YOUTUBE_API_KEY}`;

export const convertViews = (views) => {
    if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'k';
    } else {
        return views;
    }
};

export const handleDayCount = (dayCount) => {
    try {
        const date = dayjs(dayCount);
        const relativeTime = date.fromNow();
        return relativeTime
    } catch (error) {
        console.error(error);
    }
};

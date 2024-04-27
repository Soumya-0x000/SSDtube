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

export const generateRandomID = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomID = '';

    for (let i = 0; i < 16; i++) { 
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomID += characters.charAt(randomIndex);
    }

    return randomID;
};

export function extractLinks(text) {
    if (!text) return null;

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(urlRegex);

    if (!matches) return text;
    
    return (
        <>
            {text.split(urlRegex).map((part, index) => {
                if (matches.includes(part)) {
                    return (
                        <a className=' text-blue-400 underline' key={index} href={part} target="_blank" rel="noopener noreferrer">
                            {part}
                        </a>
                    );
                } else {
                    return <span key={index}>{part}</span>;
                }
            })}
        </>
    );
};

export const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    const hours = match[1] ? parseInt(match[1]) : '';
    const minutes = match[2] ? parseInt(match[2]) : '';
    const seconds = match[3] ? parseInt(match[3]) : '';

    const parts = [];
    if (hours) parts.push(`${hours}`);
    if (minutes) parts.push(`${minutes}`);
    if (seconds) parts.push(`${seconds}`);

    return parts.join(':');
};

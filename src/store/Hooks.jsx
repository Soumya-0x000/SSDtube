import axios from "axios";
import { YOUTUBE_VIDEO_API, BASE_URL, YOUTUBE_API_KEY } from "../utils/constant";

export const getYoutubeData = async () => {
    try {
        const videos = await axios.get(YOUTUBE_VIDEO_API);
        return videos;
    } catch (error) {
        console.error(error);
    }
};

export const getVideoInfo = async (id) => {
    const GET_VIDEO_INFO = `${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${YOUTUBE_API_KEY}`; 
    try {
        const data = await axios.get(GET_VIDEO_INFO);
        return data;
    } catch (error) {
        console.error();
    }
};
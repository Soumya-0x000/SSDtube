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

export const getChannelInfo = async (id) => {
    const GET_CHANNEL_INFO = `${BASE_URL}/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${YOUTUBE_API_KEY}`;
    try {
        const channelData = await axios.get(GET_CHANNEL_INFO);
        return channelData;
    } catch (error) {
        console.error(error);
    }
};

// export const getNextPageVideo = async (nxtPgToken) => {
//     const NEXT_PAGE_DATA = `${BASE_URL}/search?pageToken=${nxtPgToken}&key=${YOUTUBE_API_KEY}`
//     try {
//         const nxtPgData = await  axios.get(NEXT_PAGE_DATA);
//         console.log(nxtPgData)
//         // return nxtPgData.data;
//     } catch (error) {
//         console.error(error);
//     }
// };

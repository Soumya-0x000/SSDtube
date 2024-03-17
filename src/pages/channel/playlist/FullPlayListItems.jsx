import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL, YOUTUBE_API_KEY } from '../../../utils/constant';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FullPlayListItems = () => {
    const {id} = useParams();
    const channelName = useSelector(state => state.playlist.channelName)
    console.log(channelName)

    const fetchFullPlayList = async(playListId) => {
        const PLAY_LIST_DATA_URL = `${BASE_URL}/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${playListId}&key=${YOUTUBE_API_KEY}`;

        try {
            const getFullPlayList = await axios.get(PLAY_LIST_DATA_URL);
            console.log(getFullPlayList)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFullPlayList(id);
    }, [])

    return (
        <div>{channelName}</div>
    )
}

export default FullPlayListItems;

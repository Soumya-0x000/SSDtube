import React, { useEffect, useState } from 'react'
import { getYoutubeData } from '../../store/Hooks';
import Spinner from '../loading/Spinner'
import { useDispatch, useSelector } from "react-redux";
import { setHomePageVideo } from "../../store/YoutubeSlice";
import Skeleton from '../../Skeleton';

const VideoContainer = () => {
    const [videoData, setVideoData] = useState('');
    const receivedVideo = useSelector((state) => state.youtube.videos);
    const loading = useSelector((state) => state.youtube.isLoading);
    const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
    const dispatch = useDispatch();
    const skeletonNumbers = 15;

    const renderSkeleton = new Array(skeletonNumbers).fill().map((_, indx) => (
        <Skeleton key={indx}/>
    ));

    useEffect(() => {
        const fetchYoutubeVideos = async () => {
            try {
                const videos = await getYoutubeData();
                const videoData = videos?.data.items
                dispatch(setHomePageVideo(videoData))
            } catch (error) {
                console.error("Error getting Youtube video data", error);
            }
        };
        fetchYoutubeVideos();
    }, []);

    return (
        <div className='h-full w-full pt-[3.7rem] overflow-y-auto px-12 sm:px-3'>
            {loading ? (
                <div 
                className={`
                    grid grid-cols-1 gap-5 
                    sm:grid-cols-2 
                    md:grid-cols-2 
                    clg:grid-cols-3 
                    2xl:grid-cols-4 
                    ${!isSidebarOpen && ' 3xl:grid-cols-5 3xl:gap-x-3'} 
                    w-full h-full overflow-hidden`}>
                    {renderSkeleton}
                </div>
            ) : (
                <>
                    <div>Data has been fetched....</div>
                    <Spinner/> 
                </>
            )}
        </div>
    )
}

export default VideoContainer
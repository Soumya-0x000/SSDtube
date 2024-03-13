import React, { useEffect } from 'react'
import { getChannelInfo, getYoutubeData } from '../../../store/Hooks';
import { useDispatch, useSelector } from "react-redux";
import { countTotalResults, setHomePageVideo, setNxtPageToken } from "../../../store/YoutubeSlice";
import Skeleton from './Skeleton';
import VideoCard from './VideoCard';
import Spinner from '../../loading/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component';
import './videoContainer.css'

const VideoContainer = () => {
    const receivedVideo = useSelector((state) => state.youtube.videos);
    const totalResultCount = useSelector((state) => state.youtube.totalResults);
    const loading = useSelector((state) => state.youtube.isLoading);
    const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
    const nxtPgToken = useSelector((state) => state.youtube.nextPageToken);
    const dispatch = useDispatch();
    const skeletonNumbers = 16;

    const renderSkeleton = new Array(skeletonNumbers).fill().map((_, indx) => (
        <Skeleton key={indx}/>
    ));

    const fetchYoutubeVideos = async () => {
        const videoData = await getYoutubeData();
        const videos = videoData?.data.items;
        dispatch(countTotalResults(videoData?.data?.pageInfo?.totalResults))
        dispatch(setHomePageVideo(videos));
        dispatch(setNxtPageToken(videoData?.data.nextPageToken));
    };

    useEffect(() => {
        // fetchYoutubeVideos();
        // getNextPageVideo(nxtPgToken)
    }, []);

    return (
        <div className='h-full w-full pt-[3.7rem] overflow-y-auto px-2 sm:px-3 videoContainer'>
            {loading ? (
                <div 
                className={`
                    grid grid-cols-1 gap-5 
                    sm:grid-cols-2 
                    md:grid-cols-2 
                    clg:grid-cols-3 
                    2xl:grid-cols-4 
                    ${!isSidebarOpen && ' 3xl:grid-cols-5 3xl:gap-x-3'} 
                    w-full h-full overflow-hidden`
                }>
                    {renderSkeleton}
                </div>
            ) : (
                <InfiniteScroll 
                // next={() => }
                className={`
                    grid grid-cols-1 gap-5 
                    sm:grid-cols-2 
                    md:grid-cols-2 
                    clg:grid-cols-3 
                    2xl:grid-cols-4 
                    ${!isSidebarOpen && ' 3xl:grid-cols-5 3xl:gap-x-3'} 
                    w-full h-full overflow-hidden`
                }
                dataLength={receivedVideo.length}
                loader={<Spinner/>}
                hasMore={receivedVideo?.length <= totalResultCount}>
                    {receivedVideo.map((item, indx) => (
                        <VideoCard
                            item={item}
                            key={indx}
                            indx={indx}
                        />
                    ))}
                </InfiniteScroll>
            )}
        </div>
    )
}

export default VideoContainer;

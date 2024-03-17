import React, { useEffect, useRef, useState } from 'react'
import { getYoutubeData } from '../../../utils/Hooks';
import { BASE_URL, YOUTUBE_API_KEY } from '../../../utils/constant.js'
import { useDispatch, useSelector } from "react-redux";
import { setHomePageVideo, setNxtPageToken } from "../../../store/YoutubeSlice";
import Skeleton from './Skeleton';
import VideoCard from './VideoCard';
import Spinner from '../../loading/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component';
import './videoContainer.css'
import axios from 'axios';

const VideoContainer = () => {
    const currentVideos = useSelector((state) => state.youtube.videos);
    const loading = useSelector((state) => state.youtube.isLoading);
    const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
    const nxtPgToken = useSelector((state) => state.youtube.nextPageToken);
    const dispatch = useDispatch();
    const skeletonNumbers = 20;
    const [homePgVids, setHomePgVids] = useState([]);
    const [resultCount, setResultCount] = useState({
        total: 0,
        current: 0,
    });
    const scrollRef = useRef(null);
    const [currentHeight, setCurrentHeight] = useState(650);

    const renderSkeleton = new Array(skeletonNumbers).fill().map((_, indx) => (
        <Skeleton key={indx}/>
    ));

    const fetchYoutubeVideos = async () => {
        const videoData = await getYoutubeData();
        const videos = videoData?.data.items;
        setResultCount({
            total: videoData?.data?.pageInfo?.totalResults,
            current: videoData?.data?.pageInfo?.resultsPerPage,
        })
        dispatch(setHomePageVideo(videos));
        setHomePgVids(videos);
        dispatch(setNxtPageToken(videoData?.data?.nextPageToken));
    };

    const getNextPageVideo = async () => {
        const NEXT_PAGE_DATA = `${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&pageToken=${nxtPgToken}&regionCode=US&key=${YOUTUBE_API_KEY}`;
        try {
            const nxtPgData = await axios.get(NEXT_PAGE_DATA);
            const nxtPgVideos = nxtPgData?.data.items;
            setResultCount(prevResultCount => ({
                total: nxtPgData?.data?.pageInfo?.totalResults, 
                current: prevResultCount.current + nxtPgData?.data?.pageInfo?.resultsPerPage
            }));
            const updatedVideos = [...homePgVids, ...nxtPgVideos];
            dispatch(setHomePageVideo(updatedVideos));
            setHomePgVids(updatedVideos)
            dispatch(setNxtPageToken(nxtPgData?.data?.nextPageToken));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchYoutubeVideos();
    }, []);

    useEffect(() => {
        scrollRef.current && setCurrentHeight(scrollRef.current.clientHeight)
    }, [homePgVids]);

    return (
        <div 
        className=' h-full pt-[3.7rem] overflow-y-auto px-2 sm:pl-2 videoContainer'
        ref={scrollRef} >
            {loading ? (
                <div 
                className={`w-full
                    grid grid-cols-1 gap-x-3 gap-y-5 
                    sm:grid-cols-2 
                    cmd:grid-cols-3 
                    clg:grid-cols-4 
                    c2xl:grid-cols-4 c2xl:gap-x-5
                    ${!isSidebarOpen && ' 3xl:grid-cols-5 3xl:gap-x-3'}`
                }>
                    {renderSkeleton}
                </div>
            ) : (
                <InfiniteScroll
                dataLength={currentVideos.length} 
                className={` w-full
                    grid grid-cols-1 gap-x-3 gap-y-5 
                    sm:grid-cols-2 
                    cmd:grid-cols-3 
                    clg:grid-cols-4 
                    c2xl:grid-cols-4 c2xl:gap-x-5
                    ${!isSidebarOpen && ' 3xl:grid-cols-5 3xl:gap-x-3'}
                `}
                hasMore={resultCount.current !== resultCount.total ? true : false }
                loader={<Spinner/>}
                height={currentHeight}
                next={getNextPageVideo}>
                    {currentVideos.map((item, indx) => (
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

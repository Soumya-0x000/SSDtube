import React, { useEffect, useRef, useState } from 'react'
import { getSearchResults, getYoutubeData } from '../../../utils/Hooks';
import { BASE_URL, YOUTUBE_API_KEY } from '../../../utils/Constant'
import { useDispatch, useSelector } from "react-redux";
import Skeleton from './Skeleton';
import VideoCard from './VideoCard';
import Spinner from '../../loading/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component';
import './videoContainer.css'
import axios from 'axios';
import { setHomePageVideo, setNxtPageToken } from "../../../store/reducers/HomePageSlice.js";
import { setVidIdArr } from '../../../store/reducers/WatchSlice.js';
import { setPlayListOn } from '../../../store/reducers/PlayListSlice.js';
import { setIsWatchQueueOn } from '../../../store/reducers/WatchQueueSlice.js';

const VideoContainer = () => {
    const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
    const { 
        videos: currentVideos, 
        isLoading: loading, 
        nextPageToken: nxtPgToken, 
        categoryName 
    } = useSelector((state) => state.youtube);
    const dispatch = useDispatch();
    const skeletonNumbers = 20;
    const [homePgVids, setHomePgVids] = useState([]);
    const [resultCount, setResultCount] = useState({
        total: 0,
        current: 0,
    });
    const scrollRef = useRef(null);
    const [currentHeight, setCurrentHeight] = useState(650);
    const [videoIDs, setVideoIDs] = useState([]);

    const renderSkeleton = new Array(skeletonNumbers).fill().map((_, indx) => (
        <Skeleton key={indx}/>
    ));

    const fetchYoutubeVideos = async () => {
        try {
            const videoData = await getYoutubeData();
            const videos = videoData?.data.items;
            
            const ids = videos.map(vdo => vdo.id);
            setVideoIDs(ids);
            dispatch(setVidIdArr(ids)); 
            
            setResultCount({
                total: videoData?.data?.pageInfo?.totalResults,
                current: videoData?.data?.pageInfo?.resultsPerPage,
            });

            dispatch(setHomePageVideo(videos));
            setHomePgVids(videos);
            dispatch(setNxtPageToken(videoData?.data?.nextPageToken));
        } catch (error) {
            console.error(error);
        }
    };

    const getNextPageVideo = async () => {
        const NEXT_PAGE_DATA = `${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&pageToken=${nxtPgToken}&regionCode=US&key=${YOUTUBE_API_KEY}`;
        
        try {
            const nxtPgData = await axios.get(NEXT_PAGE_DATA);
            const nxtPgVideos = nxtPgData?.data.items;

            const nxtPGids = nxtPgVideos.map(vdo => vdo.id);
            setVideoIDs(prevIDs => [...prevIDs, ...nxtPGids]);
            dispatch(setVidIdArr(videoIDs));
            
            setResultCount(prevResultCount => ({
                total: nxtPgData?.data?.pageInfo?.totalResults, 
                current: prevResultCount.current + nxtPgData?.data?.pageInfo?.resultsPerPage
            }));
            
            const updatedVideos = [...homePgVids, ...nxtPgVideos];
            dispatch(setHomePageVideo(updatedVideos));
            setHomePgVids(updatedVideos);
            dispatch(setNxtPageToken(nxtPgData?.data?.nextPageToken));
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCategorySpecificVideos = async (category) => {
        const SEARCH_URL = `${BASE_URL}/search?part=snippet&maxResults=20&q=${category}&type=video&key=${YOUTUBE_API_KEY}`;
        
        try {
            const videoData = await axios.get(SEARCH_URL);
            const videos = videoData?.data.items;
            
            const ids = videos.map(vdo => vdo?.id?.videoId);
            setVideoIDs(ids);
            dispatch(setVidIdArr(ids)); 
            
            setResultCount({
                total: videoData?.data?.pageInfo?.totalResults,
                current: videoData?.data?.pageInfo?.resultsPerPage,
            });

            dispatch(setHomePageVideo(videos));
            setHomePgVids(videos);
            dispatch(setNxtPageToken(videoData?.data?.nextPageToken));
        } catch (error) {
            console.error(error);
        }
    };
    
    const getNextPageCategoryWiseVideo = async (category) => {
        const SEARCH_URL = `${BASE_URL}/search?part=snippet&maxResults=20&pageToken=${nxtPgToken}&q=${category}&type=video&key=${YOUTUBE_API_KEY}`;

        try {
            const nxtPgData = await axios.get(SEARCH_URL);
            const nxtPgVideos = nxtPgData?.data.items;
            
            const nxtPGids = nxtPgVideos.map(vdo => vdo?.id?.videoId);
            setVideoIDs(prevIDs => [...prevIDs, ...nxtPGids]);
            dispatch(setVidIdArr(videoIDs)); 
            
            setResultCount(prevResultCount => ({
                total: nxtPgData?.data?.pageInfo?.totalResults, 
                current: prevResultCount.current + nxtPgData?.data?.pageInfo?.resultsPerPage
            }));
            
            const updatedVideos = [...homePgVids, ...nxtPgVideos];
            console.log(updatedVideos)
            dispatch(setHomePageVideo(updatedVideos));
            setHomePgVids(updatedVideos);
            dispatch(setNxtPageToken(nxtPgData?.data?.nextPageToken));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        dispatch(setPlayListOn(false));
        dispatch(setIsWatchQueueOn(false));
    }, []);

    // useEffect(() => {
    //     if (categoryName === 'All') {
    //         fetchYoutubeVideos();
    //     } else {
    //         fetchCategorySpecificVideos(categoryName.trim())
    //     }
    // }, [categoryName]);

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
                next={categoryName === 'All' ? getNextPageVideo : getNextPageCategoryWiseVideo}
                height={currentHeight}>
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

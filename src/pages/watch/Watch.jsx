import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/lazy';
import { useParams } from 'react-router-dom'
import { getChannelInfo, getRecommendedVideos, getVideoInfo } from '../../utils/Hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setNxtPgToken, setRecommendedVdo, setVidIdArr, setWatchData } from '../../store/WatchSlice';
import axios from 'axios';
import { BASE_URL, YOUTUBE_API_KEY, convertViews } from '../../utils/constant';
import InfiniteScroll from 'react-infinite-scroll-component';
import RecommendedCard from './RecommendedCard';
import Loading from '../../components/loading/Loading';
import Img from '../../components/lazyLoadImage/Img';
import { LuThumbsUp, LuThumbsDown  } from "react-icons/lu";
import { iconTray } from '../channel/playlist/DedicatedPlaylist';

const watchPgIconTray = iconTray.map((item, indx) => ({
    ...item,
    text: ['Share', 'Download', 'Save', ''][indx]
}));

const Watch = () => {
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const {vdoData, vdoIDarr, channelID, recommendedVdoData, nxtPgToken} = useSelector(state => state.watch);
    const [recommendedItems, setRecommendedItems] = useState([]);
    const [resultCount, setResultCount] = useState({
        total: 0,
        current: 0,
    });
    const [essentialVdoItems, setEssentialVdoItems] = useState({
        like: 0,
        comment: 0,
        channelTitle: '',
        subscribers: 0
    });
    const [logoURL, setLogoURL] = useState('');
    
    const getVdoInfo = async (vdoID) => {
        const vdoInfo = await getVideoInfo(vdoID);
        const vdoContent = vdoInfo.data.items[0];
        const { likeCount, commentCount } = vdoContent?.statistics;
        dispatch(setWatchData(vdoContent))

        const channelData = await getChannelInfo(channelID);
        const channelContent = channelData?.data?.items[0]
        console.log(vdoContent)
        const channelLogoUrl = channelContent?.snippet?.thumbnails?.medium?.url
                            || channelContent?.snippet?.thumbnails?.high?.url
                            || channelContent?.snippet?.thumbnails?.default?.url
        const title = channelContent?.snippet?.title;
        const subscriberCount = channelContent?.statistics?.subscriberCount;
        
        setLogoURL(channelLogoUrl);
        setEssentialVdoItems({
            like: likeCount, 
            comment: commentCount, 
            channelTitle: title, 
            subscribers: subscriberCount
        })
    }
    
    const fetchRecommendedVideos = async (channelId) => {
        const recommendedVideos = await getRecommendedVideos(channelId);
        const recommendedVdoItems = recommendedVideos?.data?.items;
       
        const updatedRecommendedVdoItems = await Promise.all(recommendedVdoItems.map(async(item) => {
            try {
                // if (item?.snippet?.type === 'upload') {
                    const vdoData = await axios.get(`${BASE_URL}/videos?part=statistics&id=${item?.contentDetails?.upload?.videoId}&key=${YOUTUBE_API_KEY}`);
                    const viewCount = vdoData?.data?.items[0]?.statistics?.viewCount;
                    // console.log(item)
                    return {...item, viewCount}
                // } else if (item?.snippet?.type === 'playlistItem') {
                //     return
                // }
            } catch (error) {
                console.error(error);
                return item;
            }}
        ));

        setRecommendedItems(updatedRecommendedVdoItems);
        dispatch(setRecommendedVdo(updatedRecommendedVdoItems));

        setResultCount({
            total: recommendedVideos?.data?.pageInfo?.totalResults,
            current: recommendedVdoItems?.length
        });

        if (recommendedVideos?.data?.nextPageToken) {
            dispatch(setNxtPgToken(recommendedVideos?.data?.nextPageToken))
        }
    };

    const fetchNextPageRecommendedVdo = async () => {
        const NEXT_RECOMMENDED_VIDEOS = `${BASE_URL}/activities?part=snippet%2CcontentDetails&channelId=${channelID}&maxResults=50&pageToken=${nxtPgToken}&key=${YOUTUBE_API_KEY}`;

        try {
            const nextData = await axios.get(NEXT_RECOMMENDED_VIDEOS);
            const nextRecommendedVdoItems = nextData?.data?.items;
       
            const updatedRecommendedVdoItems = await Promise.all(nextRecommendedVdoItems.map(async(item) => {
                try {
                    const vdoData = await axios.get(`${BASE_URL}/videos?part=statistics&id=${item?.contentDetails?.upload?.videoId}&key=${YOUTUBE_API_KEY}`);
                    const viewCount = vdoData?.data?.items[0]?.statistics?.viewCount;
                    return {...item, viewCount}
                } catch (error) {
                    console.error(error);
                    return item;
                }}
            ));

            setRecommendedItems(prevItems => [...prevItems, ...updatedRecommendedVdoItems]);
            // dispatch(setRecommendedVdo(recommendedItems));

            setResultCount(prevResultCount => ({
                ...prevResultCount,
                current: prevResultCount.current + nextRecommendedVdoItems.length
            }));

            if (nextData?.data?.nextPageToken) {
                dispatch(setNxtPgToken(nextData?.data?.nextPageToken))
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getVdoInfo(id)
        fetchRecommendedVideos(channelID);
    }, []);

    return (
        <div className=' mx-3 2xl:mx-12 3xl:mx-16 mt -2 flex flex-col lg:flex-row  lg:gap-x-4 xl:gap-x-6 3xl:gap-x-8'>
            <div className=' w-full h-full lg:w-[68%] rounded-lg xl:rounded-xl overflow-hidden flex flex-col items-start'>
                {/* player */}
                <div className=' w-full aspect-video rounded-lg xl:rounded-xl overflow-hidden'>
                    <div className=' w-full h-full'>
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${id}`}
                            controls
                            width='100%'
                            height='100%'
                            playing
                            pip = {true}
                            stopOnUnmount={false}
                            loop={false}  
                            light={true}
                            config={{
                                youtube: {
                                    playerVars: {
                                        autoplay: 1, 
                                        controls: 1, 
                                        modestbranding: 1, 
                                        fs: 1, 
                                        rel: 1, 
                                        loop: 0 
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* details */}
                <div className=' mt-3 w-full'>
                    <p className='text-[1.4rem] xl:text-2xl font-bold'>{vdoData?.snippet?.title}</p>

                    <div className='flex flex-col sm:flex-row items-center w-full justify-between'>
                        <div className=' flex items-center gap-x-3 mt-2 w-fit '>
                            <div className=' w-10 h-10 rounded-full overflow-hidden'>
                                <Img
                                    className={` w-full h-full`}
                                    src={logoURL}
                                />
                            </div>

                            <div>
                                <div className='text-[.94rem] font-bold flex items-center gap-x-1'>
                                    {essentialVdoItems.channelTitle}
                                    {essentialVdoItems.subscribers > 100000 && (
                                        <div className=' h-4 w-4'>
                                            <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false" style={{ display: 'block' }}>
                                                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z" fill='gray'></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <p className=' text-gray-400 text-sm'>{convertViews(essentialVdoItems.subscribers)} subscribers</p>
                            </div>

                            <button className='ml-8 bg-white text-black w-[7rem] h-[2.4rem] rounded-full active:scale-110 transition-all'>
                                Subscribe
                            </button>
                        </div>

                        <div className=' flex items-center gap-x-3 '>
                            <div className=' flex items-center justify-center bg-neutral-700 rounded-full h-[2.5rem] px-4'>
                                <span className='hover:bg-gray-70 pr-4 flex items-center gap-x-2 border-r'>
                                    <LuThumbsUp className=' text-lg'/>
                                    <p className=' text-sm'>
                                        {convertViews(essentialVdoItems.like)}
                                    </p>
                                </span>

                                <span className=' flex pl-3 items-center gap-x-2'>
                                    <LuThumbsDown className=' text-lg'/>
                                </span>
                            </div>
                            
                            {watchPgIconTray.map((item, indx, arr) => (
                                <button className={` flex items-center gap-x-1.5 h-[2.5rem] rounded-full px-3 bg-neutral-700 hover:bg-gray-700`}>
                                    <p className={`text-md ${item.fontSize} ${indx === arr.length-1 && 'rotate-90'}`}>
                                        {item.icon}
                                    </p>

                                    {item.text.trim() !== '' && 
                                        <p className='text-md  pr-2'>{item.text}</p>
                                    }
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className=' rounded-lg w-full overflow-y-auto lg:w-[32%] lg:min-w-[25rem]'>
                <InfiniteScroll 
                className=' h-full flex flex-col gap-y-2'
                loader={<>
                    {[...Array(9)].map((_, indx) => (
                        <div key={indx} className=' h-full w-ful lg:min-w-[26rem] lg:max-w-[33rem]'>
                            <div className=' flex gap-x-3'>
                                <div className='w-[11rem] lg:w-[14rem] h-[6rem] rounded-lg overflow-hidden bg-slate-600 animate-pulse'/>

                                <div className=' mt-1 lg:mt-3 w-[27rem] h-full'>
                                    <p className=' bg-slate-600 w-full h-6 rounded-[3px] animate-pulse'/>

                                    <div className=' bg-slate-600 w-[70%] h-4 rounded-sm animate-pulse mt-5'/>

                                    <div className=' flex items-center mt-2 gap-x-4'>
                                        <p className=' bg-slate-600 animate-pulse h-3 w-[30%] rounded-sm '/>
                                        <p className=' bg-slate-600 animate-pulse h-3 w-[30%] rounded-sm '/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>}
                next={fetchNextPageRecommendedVdo}
                hasMore={resultCount.current <= resultCount.total}
                dataLength={recommendedItems.length}>
                    {recommendedItems.map((item, index) => (
                        <RecommendedCard
                            key={item.etag+index}
                            item={item}
                            index={index}
                        />
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default Watch;

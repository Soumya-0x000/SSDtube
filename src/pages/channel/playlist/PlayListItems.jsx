import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BASE_URL, YOUTUBE_API_KEY, generateRandomID } from '../../../utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setBannerUrl, setChannelName, setCounting, setNextPgToken, setPlayListData } from '../../../store/PlayListSlice';
import { RxCross1, RxShuffle } from "react-icons/rx";
import { RxLoop } from "react-icons/rx";
import { MdOutlineErrorOutline } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import Img from '../../../components/lazyLoadImage/Img';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IoIosArrowDown } from "react-icons/io";
import { data } from 'autoprefixer';
import { getPlayLists } from '../../../utils/Hooks';
import { setChannelId, setCurrentlyPlayingVdoId } from '../../../store/WatchSlice';

const PlayListItems = () => {
    const {id} = useParams();
    const {
        playListTitle, 
        playListData, 
        channelName, 
        nxtPgToken,
        playListID
    } = useSelector(state => state.playlist);
    const {totalItemCount, currentItemsCount} = useSelector(state => state.playlist);
    const channelID = useSelector(state => state.channel.channelId);

    const dispatch = useDispatch();
    const [currentVdoCount, setCurrentVdoCount] = useState(1);
    const [resultCount, setResultCount] = useState({
        total: 0,
        current: 0,
    });
    const [dataToRender, setDataToRender] = useState([]);
    const [hideVids, setHideVids] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const getViews = async(videoID) => {
        const VIEWS = `${BASE_URL}/videos?part=statistics&id=${videoID}&key=${YOUTUBE_API_KEY}`;

        try {
            const videoViews = await axios.get(VIEWS);
            return videoViews?.data?.items[0]?.statistics?.viewCount
        } catch (error) {
            console.error('error', error);
            return 0
        }
    };

    const fetchFullPlayList = async(playListId) => {
        const PLAY_LIST_DATA_URL = `${BASE_URL}/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${playListId}&key=${YOUTUBE_API_KEY}`;

        try {
            const getFullPlayList = await axios.get(PLAY_LIST_DATA_URL);
            const vdoItems = getFullPlayList?.data?.items;
            dispatch(setCurrentlyPlayingVdoId(vdoItems[0]?.contentDetails?.videoId))
            dispatch(setChannelId(vdoItems[0]?.snippet?.channelId))
            const channelName = vdoItems[0]?.snippet?.channelTitle
            const totalCount = getFullPlayList?.data?.pageInfo?.totalResults;
            setResultCount({
                total: totalCount,
                current: vdoItems.length,
            })
            const nextPgToken = getFullPlayList?.data?.nextPageToken;
            
            const mainData = await Promise.all(vdoItems.map(async(item, indx) => {
                const videoId = item?.contentDetails?.videoId;
                const views = await getViews(videoId)
                const publishedAt = item?.contentDetails?.videoPublishedAt;
                const description = item?.snippet?.description;
                const title = item?.snippet?.title;
                const thumbnail = item?.snippet?.thumbnails?.maxres?.url
                                || item?.snippet?.thumbnails?.high?.url
                                || item?.snippet?.thumbnails?.medium?.url
                                || item?.snippet?.thumbnails?.standard?.url
                                || item?.snippet?.thumbnails?.default?.url
                return {videoId, publishedAt, description, title, thumbnail, views}                
            }));
            setDataToRender(mainData);
            dispatch(setPlayListData(mainData));
            dispatch(setChannelName(channelName));
            dispatch(setCounting({totalCount, currentCount: currentVdoCount}));
            dispatch(setNextPgToken(nextPgToken));
        } catch (error) {
            console.error(error);
        }
    };

    const fetchNxtPgData = async() => {
        const NXT_PG_URL = `${BASE_URL}/playlistItems?part=snippet%2CcontentDetails&maxResults=50&pageToken=${nxtPgToken}&playlistId=${playListID}&key=${YOUTUBE_API_KEY}`;

        if (resultCount.current <= resultCount.total) {
            try {
                const getNxtPgData = await axios.get(NXT_PG_URL);
                const vdoItems = getNxtPgData?.data?.items;
                const nextPgToken = getNxtPgData?.data?.nextPageToken;
                const moreItems = await Promise.all(vdoItems.map(async (item, indx) => {
                    const videoId = item?.contentDetails?.videoId;
                    const views = await getViews(videoId)
                    const publishedAt = item?.contentDetails?.videoPublishedAt;
                    const description = item?.snippet?.description;
                    const title = item?.snippet?.title;
                    const thumbnail = item?.snippet?.thumbnails?.maxres?.url
                                    || item?.snippet?.thumbnails?.high?.url
                                    || item?.snippet?.thumbnails?.medium?.url
                                    || item?.snippet?.thumbnails?.standard?.url
                                    || item?.snippet?.thumbnails?.default?.url
                    return {videoId, publishedAt, description, title, thumbnail, views};                  
                }));
                setDataToRender(prevData => [...prevData, ...moreItems]);
                dispatch(setNextPgToken(nextPgToken));
            } catch (error) {
                console.error(error);
            }
        };
    };

    const handleVdoPlayingCount = (currentCount) => {
        setCurrentVdoCount(currentCount)
        // dispatch(setCounting({totalCount: resultCount.total, currentCount: currentVdoCount}))
        // console.log(currentCount)
    };
    
    useEffect(() => {
        dispatch(setPlayListData(dataToRender))
    }, [dataToRender])

    useEffect(() => {
        if (dataToRender.length > 0) {
            // console.log(dataToRender)
            return
        };
        fetchFullPlayList(playListID);

        const timer = setTimeout(() => {
            setIsLoading(false);
        },400);

        return () => clearTimeout(timer)
    }, []);

    return (
        <div className=' rounded-xl overflow-hidden border mb-5'>
            {isLoading ? (
                <>
                    {/* nav part */}
                    <div className='space-y-2 bg-neutral-800 px-3 py-3'>
                        {/* Upper part */}
                        <div className='relative flex items-center justify-between'>
                            <div className='text-[.84rem] space-y-2'>
                                <p className='w-[18rem] h-6 rounded-[3px] animate-pulse bg-slate-600'/>
                                <p className='w-[10rem] h-4 rounded-[3px] animate-pulse bg-slate-600'/>
                            </div>

                            <p className='bg-slate-600 animate-pulse rounded-full p-2 w-10 h-10 '/>
                        </div>

                        {/* Lower part */}
                        <div className='flex items-center justify-between'>
                            <div className='flex text-2xl items-center gap-x-5'>
                                <p className='bg-slate-600 animate-pulse rounded-full p-2 w-9 h-9 '/>
                                <p className='bg-slate-600 animate-pulse rounded-full p-2 w-9 h-9 '/>
                            </div>
                            <p className='bg-slate-600 animate-pulse rounded-full p-2 w-5 h-10 '/>
                        </div>
                    </div>

                    {/* data part */}
                    <div
                    className={` ${hideVids ? 'hidden' : 'block'} max-h-[26rem] overflow-y-auto mt-2`}>
                        {[...Array(6)].map((data, index) => (
                            <div className='py-1.5 hover:bg-neutral-700 pl-2 flex gap-x-3'
                            key={generateRandomID()}>
                                <div className=' bg-slate-600 flex items-center'/>

                                <div className='  w-[7rem] h-[4rem] bg-slate-600 animate-pulse rounded-lg overflow-hidden'/>

                                <div className=' space-y-2 '>
                                    <div className=' min-w-[15rem] h-[.8rem] bg-slate-600 animate-pulse rounded-lg overflow-hidden'/>
                                    <div className=' max-w-[7rem] h-[.6rem] bg-slate-600 animate-pulse rounded-lg overflow-hidden'/>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className='space-y-2 bg-neutral-800 px-3 py-3 '>
                        {/* Upper part */}
                        <div className='relative flex items-center justify-between'>
                            <div className='text-[.84rem] space-y-1'>
                                <Link 
                                className='text-[1.3rem] font-bold'
                                to={`/dedicatedPlaylist/${playListID}`}>
                                    {playListTitle}
                                </Link>
                                <p><Link to={`/channel/${channelID}`}>{channelName}</Link> - {currentItemsCount}/{totalItemCount}</p>
                            </div>

                            {hideVids ? (
                                <IoIosArrowDown className=' hover:bg-slate-600 rounded-full cursor-pointer p-2 w-10 h-10 text-2xl' onClick={() => setHideVids(false)} />
                            ) : (
                                <RxCross1 className=' hover:bg-slate-600 rounded-full cursor-pointer p-2 w-10 h-10 text-2xl' onClick={() => setHideVids(true)} />
                            )}
                        </div>

                        {/* Lower part */}
                        <div className='flex items-center justify-between'>
                            <div className='flex text-2xl items-center gap-x-5'>
                                <RxLoop/>
                                <RxShuffle/>
                            </div>
                            <SlOptionsVertical className=' text-xl'/>
                        </div>
                    </div>

                    <InfiniteScroll 
                    next={fetchNxtPgData}
                    dataLength={playListData.length}
                    height={'26rem'}
                    className={` ${hideVids ? 'hidden' : 'block'} max-h-[28rem] overflow-y-auto mt-2`}
                    hasMore={playListData.length <= resultCount.total}>
                        {playListData.map((data, index) => (
                            <Link className='py-1.5 cursor-pointer hover:bg-neutral-700 pl-2 flex gap-x-3'
                            key={generateRandomID()}
                            to={`/watch/${data?.videoId}`}
                            onClick={() => handleVdoPlayingCount(index+1)}>
                                {/* index */}
                                <div className=' text-[.8rem] text-gray-400 flex items-center'>
                                    {index+1}
                                </div>

                                {/* image */}
                                <div className='min-w-[9rem] max-w-[9rem] lg:min-w-[10rem] lg:max-w-[10rem] 2xl:min-w-[11rem] 2xl:max-w-[11rem] h-[5rem] lg:min-h-[6rem] lg:max-h-[6rem] rounded-lg overflow-hidden'>
                                    {data?.title === 'Private video' ? (
                                        <div className=' h-full w-full bg-slate-600 animate-pulse flex items-center justify-center'>
                                            <MdOutlineErrorOutline
                                                className=' text-5xl'
                                            />
                                        </div>
                                    ) : (
                                        <Img
                                            src={data?.thumbnail}
                                            className={` w-full h-full`}
                                        />
                                    )}
                                </div>

                                {/* content */}
                                <div className=' space-y-2 '>
                                    <div className='line-clamp-1 w-full'>{data?.title}</div>
                                    <p className='text-gray-400 text-[.8rem]'>{channelName}</p>
                                </div>
                            </Link>
                        ))}
                    </InfiniteScroll>
                </>
            )}
        </div>
    )
}

export default PlayListItems;

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSearchResults, getViews } from '../../utils/Hooks';
import { setNextPageToken, setSearchResult } from '../../store/reducers/SearchSlice';
import { BASE_URL, YOUTUBE_API_KEY, convertViews, handleDayCount } from '../../utils/Constant';
import InfiniteScroll from 'react-infinite-scroll-component';
import Img from '../../components/lazyLoadImage/Img';
import { BsDot } from 'react-icons/bs';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setChannelId, setCurrentlyPlayingVdoId } from '../../store/reducers/WatchSlice';
import ThreeDotOptions_2 from '../../common/ThreeDotOptions_2';

const Search = () => {
    const {
        searchItem,
        searchResult,
        totalSearchResultCount,
        nextPgToken
    } = useSelector(state => state.search)
    const [resultCount, setResultCount] = useState({
        total: 0,
        current: 0,
    });
    const [homePgVids, setHomePgVids] = useState([]);
    const dispatch = useDispatch();
    const [mouseEnter, setMouseEnter] = useState(false);
    const [optionsClicked, setOptionsClicked] = useState(new Array(searchResult.length).fill(false));

    const fetchAllSearchResults = async () => {
        try {
            const videoData = await getSearchResults(searchItem.trim());
            const videos = videoData?.data.items;
            
            const mainData = await Promise.all(videos.map(async(item, indx) => {
                const videoId = item?.id?.videoId;
                const views = await getViews(videoId);
                const channelId = item?.snippet?.channelId;
                const channelInfo = await axios.get(`${BASE_URL}/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&maxResults=1&key=${YOUTUBE_API_KEY}`);

                const channelLogoUrl = channelInfo?.data?.items[0]?.snippet?.thumbnails?.medium?.url
                                    || channelInfo?.data?.items[0]?.snippet?.thumbnails?.high?.url
                                    || channelInfo?.data?.items[0]?.snippet?.thumbnails?.default?.url
                const channelTitle = item?.snippet?.channelTitle;
                const description = item?.snippet?.description;
                const publishedAt = item?.snippet?.publishedAt;
                const title = item?.snippet?.title;
                const thumbnail = item?.snippet?.thumbnails?.high?.url
                                || item?.snippet?.thumbnails?.medium?.url
                                || item?.snippet?.thumbnails?.default?.url
                return {videoId, views, channelId, channelLogoUrl, channelTitle, description, publishedAt, title, thumbnail}                
            }));
            setHomePgVids(mainData)

            setResultCount({
                total: videoData?.data?.pageInfo?.totalResults,
                current: videoData?.data?.pageInfo?.resultsPerPage,
            });

            dispatch(setSearchResult(mainData));
            dispatch(setNextPageToken(videoData?.data?.nextPageToken));
        } catch (error) {
            console.error(error);
        }
    };

    const getNextPageVideo = async () => {
        const NEXT_PAGE_SEARCH_URL = `${BASE_URL}/search?part=snippet&maxResults=20&pageToken=${nextPgToken}&q=${searchItem}&type=video&key=${YOUTUBE_API_KEY}`;
        
        try {
            const nxtPgData = await axios.get(NEXT_PAGE_SEARCH_URL);
            const nxtPgVideos = nxtPgData?.data.items;

            const mainData = await Promise.all(nxtPgVideos.map(async(item, indx) => {
                const videoId = item?.id?.videoId;
                const views = await getViews(videoId);
                const channelId = item?.snippet?.channelId;
                const channelInfo = await axios.get(`${BASE_URL}/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&maxResults=1&key=${YOUTUBE_API_KEY}`)

                const channelLogoUrl = channelInfo?.data?.items[0]?.snippet?.thumbnails?.medium?.url
                                    || channelInfo?.data?.items[0]?.snippet?.thumbnails?.high?.url
                                    || channelInfo?.data?.items[0]?.snippet?.thumbnails?.default?.url
                const channelTitle = item?.snippet?.channelTitle;
                const description = item?.snippet?.description;
                const publishedAt = item?.snippet?.publishedAt;
                const title = item?.snippet?.title;
                const thumbnail = item?.snippet?.thumbnails?.high?.url
                                || item?.snippet?.thumbnails?.medium?.url
                                || item?.snippet?.thumbnails?.default?.url
                return {videoId, views, channelId, channelLogoUrl, channelTitle, description, publishedAt, title, thumbnail}                
            }));
            
            setResultCount(prevResultCount => ({
                total: nxtPgData?.data?.pageInfo?.totalResults, 
                current: prevResultCount.current + nxtPgData?.data?.pageInfo?.resultsPerPage
            }));
            
            const updatedVideos = [...homePgVids, ...mainData];
            dispatch(setSearchResult(updatedVideos));
            setHomePgVids(updatedVideos);
            dispatch(setNextPageToken(nxtPgData?.data?.nextPageToken));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllSearchResults();
    }, []);

    const handleVdoClick = (vdoId, chnlID) => {
        dispatch(setCurrentlyPlayingVdoId(vdoId))
        dispatch(setChannelId(chnlID))
    };
    
    const handleChannelClick = (e) => {
        e.stopPropagation();
    };

    const handleMouseLeave = (indx) => {
        setOptionsClicked(new Array(searchResult.length).fill(false))
        setMouseEnter(false);
    };
    
    const handleMouseEnter = () => {
        setMouseEnter(true)
    };

    return (
        <div className=' w-full h-full flex justify-center'>
            <div className=' '>
                <InfiniteScroll
                dataLength={searchResult.length}
                next={getNextPageVideo}
                className={` overflow-y-auto w-full`}
                loader={<>
                    {[...new Array(3)].map((_, indx) => (
                        <div className='py-1.5 cursor-pointer hover:bg-neutral-800 hover:rounded-lg px-2 flex gap-x-3'
                        key={indx}>
                            <div className='min-w-[25rem] max-w-[25rem] min-h-[14rem] max-h-[14rem] rounded-lg overflow-hidden bg-slate-600 animate-pulse'>
                            </div>

                            <div className=' space-y-3 lg:space-y-5 mt-2 w-full'>
                                <div>
                                    <div className='min-w-full min-h-[1.5rem] bg-slate-600 rounded-full animate-pulse'/>

                                    <div className=' flex items-center mt-2'>
                                        <p className='min-w-12 max-w-24 min-h-[10px] bg-slate-600 rounded-full animate-pulse'/>

                                        <BsDot className=' animate-pulse text-lg text-slate-600'/>

                                        <p className='min-w-[5rem] max-w-[5rem] h-[10px] bg-slate-600 rounded-full animate-pulse'/>
                                    </div>
                                </div>

                                <div className='flex gap-x-3 items-center'>
                                    <div className=' min-w-10 max-w-10 min-h-10 max-h-10 rounded-full overflow-hidden bg-slate-700 animate-pulse'/>
                                    <div className=' w-32 h-3 rounded-full bg-slate-700 animate-pulse'/>
                                </div>

                                <div className=' min-w-full min-h-3 rounded-full bg-slate-700 animate-pulse'/>
                            </div>
                        </div>
                    ))}
                </>}
                hasMore={true}>
                    <div className=' flex flex-col gap-y-3 w-full max-w-[75rem]'>
                        {searchResult.map((item, indx) => (
                            <div 
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={() => handleMouseLeave(indx)}
                            className='flex gap-x-5 relative group'
                            key={indx + item.videoId}>
                                {/* image */}
                                <Link 
                                onClick={() => handleVdoClick(item?.videoId, item?.channelId)}
                                className=' min-w-[25rem] max-w-[25rem] min-h-[15rem] max-h-[15rem]'
                                to={`/watch/${item.videoId}`}>
                                    <Img
                                        className={` h-full w-full rounded-lg `}
                                        src={item?.thumbnail}
                                    />
                                </Link>

                                {/* details */}
                                <Link className='w-full flex flex-col gap-y-5'
                                to={`/watch/${item?.videoId}`}
                                onClick={() => handleVdoClick(item?.videoId, item?.channelId)}>
                                    {/* title and views */}
                                    <div className=' space-y-1 mt-2'>
                                        {/* title */}
                                        <div className=' line-clamp-1 text-lg max-w-[13rem'>
                                            <p>{item?.title}</p>
                                        </div>

                                        {/* views & publishedAt */}
                                        <div className=' flex gap-x-1 text-gray-400 text-[.84rem] items-center'>
                                            <div className=''>
                                                {convertViews(item.views)} views
                                            </div>
                                            
                                            <BsDot/>

                                            <div className=''>
                                                {handleDayCount(item?.publishedAt)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* channel logo and channel name */}
                                    <Link className=' flex gap-x-4 items-center'
                                    to={`/channel/${item.channelId}`}
                                    onClick={(e) => handleChannelClick(e)}>
                                        <div className=' w-8 h-8 rounded-full overflow-hidden'>
                                            <img 
                                                src={item?.channelLogoUrl} 
                                                className=' w-full h-full'
                                                alt="channel logo" 
                                            />
                                        </div>

                                        <div className='text-gray-400 text-[.84rem]'>
                                            {item?.channelTitle}
                                        </div>
                                    </Link>

                                    {/* description */}
                                    <div className='text-gray-400 text-[.84rem]'>
                                        {item?.description}
                                    </div>
                                </Link>

                                <ThreeDotOptions_2
                                    optionsClicked={optionsClicked}
                                    setOptionsClicked={setOptionsClicked}
                                    videoCode={item?.videoId}
                                    index={indx}
                                    mode={`searchResult`}
                                    mouseEnter={mouseEnter}
                                    data={item}
                                />
                            </div>    
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Search;

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img';
import { MdOutlineErrorOutline } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RxTriangleRight } from "react-icons/rx";
import { TfiControlShuffle } from "react-icons/tfi";
import { MdPlaylistAdd } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import { LiaDownloadSolid } from "react-icons/lia";
import { BsDot, BsThreeDotsVertical } from "react-icons/bs";
import { convertViews, handleDayCount } from '../../../utils/constant';
import axios from 'axios';
import { setNextPgToken, setPlayListData } from '../../../store/PlayListSlice';
import { BASE_URL, YOUTUBE_API_KEY } from '../../../utils/constant';
import InfiniteScroll from 'react-infinite-scroll-component';

const iconTray = [
    {icon: <MdPlaylistAdd/>, fontSize: 'text-[26px]'},
    {icon: <RiShareForwardLine/>, fontSize: 'text-[24px]'},
    {icon: <LiaDownloadSolid/>, fontSize: 'text-[26px]'},
    {icon: <BsThreeDotsVertical/>, fontSize: 'text-[20px]'},
];

const DedicatedPlaylist = () => {
    const {id} = useParams();
    const {
        playListId,
        playListTitle, 
        playListData, 
        channelName, 
        playListBannerUrl,
        totalItemCount,
        nxtPgToken
    } = useSelector(state => state.playlist);
    const [showPlayAll, setShowPlayAll] = useState(false);
    const channelID = useSelector(state => state.channel.channelId);
    const comparableHeight = 585;
    const [showBanner, setShowBanner] = useState(window.innerHeight >= comparableHeight);
    const dispatch = useDispatch();
    const [dataToRender, setDataToRender] = useState(playListData);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useLayoutEffect(() => {
        const handleResize = () => {
            window.innerHeight >= comparableHeight ? setShowBanner(true) : setShowBanner(false);
        }
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const PlayListAreaSideBar = () => {
        return(
            <div className='lg:min-w-[23rem] lg:max-w-[23rem] lg:fixed lg:h-full flex flex-col px-[2rem] md:px-[4rem] lg:px-5 py-6 relative lg:rounded-xl overflow-hidden space-y-6 '>
                <div className=' h-[22rem] md:h-[16rem] '>
                    <>
                        <div 
                            className=' absolute top-0 left-0 h-full w-full'
                            style={{ 
                                backgroundImage: `url(${playListBannerUrl})`,
                                backgroundSize: 'cover',                    
                                filter:'blur(80px)',
                                backdropFilter: blur,
                            }}
                        />
                        <div 
                            className=' absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent via-transparent to-[#0f0f0f]'
                        />
                    </>
                    
                    {/* content */}
                    <>
                        {isLoading ? (
                            <>
                                <div className=' flex flex-col md:flex-row lg:flex-col gap-x-10 gap-y-3 md:gap-y-7'>
                                    {/* Image  */}
                                    {showBanner && (
                                        <div className=' w-[20rem] md:min-w-[24rem] lg:min-w-fit h-[13rem] lg:h-[11rem] rounded-xl overflow-hidden relative left-1/2 md:left-auto -translate-x-1/2 md:-translate-x-0 bg-slate-600 animate-pulse '
                                        style={{
                                            boxShadow: '0px 0px 37px -3px rgba(0,0,0,0.67)',
                                            WebkitBoxShadow: '0px 0px 37px -3px rgba(0,0,0,0.67)',
                                            MozBoxShadow: '0px 0px 37px -3px rgba(0,0,0,0.67)'
                                        }}/>  
                                    )}
                                    
                                    {/* data */}
                                    <div className='font-bold lg:mt-2 text-white md:max-w-[27rem] relative tracking-wide'>
                                        <p className=' w-full h-7 bg-slate-600 rounded-md animate-pulse'/>
                                        
                                        <div className=' flex flex-row md:flex-col justify-between'>
                                            <div className=''>
                                                <p className=' w-[40%] h-4 bg-slate-600 animate-pulse rounded-[3px] mt-6'/>

                                                <p className=' w-[30%] h-4 bg-slate-600 animate-pulse rounded-[3px] mt-1'/>
                                            </div>

                                            {/* icons */}
                                            <div className='flex items-center justify-between w-[11rem] lg:w-[13rem] mt-4'>
                                                {iconTray.map((icon, index) => (
                                                    <div className={` bg-slate-600 animate-pulse w-10 h-10 rounded-full`}
                                                    key={index + icon.fontSize}/>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=' w-full relative flex items-center justify-between gap-x-3 mt-4 lg:mt-8'>
                                    <div 
                                    className='h-[2.6rem] rounded-full w-1/2 bg-slate-600 animate-pulse'/>
                                    <div 
                                    className='h-[2.6rem] rounded-full w-1/2 bg-slate-600 animate-pulse'/>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className=' flex flex-col md:flex-row lg:flex-col gap-x-10 gap-y-3 md:gap-y-7'>
                                    {/* Image  */}
                                    {showBanner && (
                                        <Link className='cursor-pointer w-[20rem] md:min-w-[24rem] lg:min-w-fit rounded-xl overflow-hidden relative left-1/2 md:left-auto -translate-x-1/2 md:-translate-x-0 '
                                        style={{
                                            boxShadow: '0px 0px 37px -3px rgba(0,0,0,0.67)',
                                            WebkitBoxShadow: '0px 0px 37px -3px rgba(0,0,0,0.67)',
                                            MozBoxShadow: '0px 0px 37px -3px rgba(0,0,0,0.67)'
                                        }}
                                        // onMouseEnter={() => setShowPlayAll(true)}
                                        // onMouseLeave={() => setShowPlayAll(false)}
                                        to={`/playlist/${id}`}>
                                            <Img
                                                className={` h-full w-full rounded-lg `}
                                                src={playListBannerUrl}
                                            />

                                            {showPlayAll && (
                                                <div className=' '>
                                                    <div className=' absolute flex items-center justify-center gap-x-3 '>
                                                        {/* <FaPlay/> */}
                                                        <p>Play All</p>
                                                    </div>
                                                </div>
                                            )}
                                        </Link>    
                                    )}
                                    
                                    {/* data */}
                                    <div className='font-bold lg:mt-2 text-white md:max-w-[27rem] relative tracking-wide'>
                                        <p className='text-2xl lg:text-3xl line-clamp-1 lg:line-clamp-none '>
                                            {playListTitle}
                                        </p>
                                        
                                        <div className=' flex flex-row md:flex-col justify-between'>
                                            <div className=''>
                                                <p className=' font-bold text-[1.05rem] mt-6 line-clamp-1'>
                                                    <Link to={`/channel/${channelID}`}>
                                                        {channelName}
                                                    </Link>
                                                </p>

                                                <div className='flex items-center gap-x-2 mt-1'>
                                                    <p className='text-[.9rem] font-normal'>
                                                        {totalItemCount} videos
                                                    </p>
                                                </div>
                                            </div>

                                            {/* icons */}
                                            <div className='flex items-center justify-between w-[11rem] lg:w-[13rem] mt-4'>
                                                {iconTray.map((icon, index) => (
                                                    <div className={` bg-[#ffffff23] w-10 h-10 rounded-full flex items-center justify-center ${icon.fontSize} hover:bg-[#ffffff3f] cursor-pointer`}
                                                    key={index + icon.fontSize}>
                                                        {icon.icon}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=' w-full relative flex items-center justify-between gap-x-3 mt-4 lg:mt-8'>
                                    <Link 
                                    className='flex items-center justify-center h-[2.6rem] rounded-full w-1/2 bg-white text-black'
                                    to={`/playlist/${playListId}`}>
                                        <RxTriangleRight className='text-[2.4rem]'/> Play all
                                    </Link>
                                    <Link 
                                    className='flex items-center justify-center gap-x-3 h-[2.7rem] bg-[#ffffff1f] rounded-full w-1/2 '
                                    to={`/playlist/${playListId}`}>
                                        <TfiControlShuffle className='text-[1.3rem]'/> Shuffle
                                    </Link>
                                </div>
                            </>
                        )}
                    </>
                </div>
            </div>
        )
    };

    const getViews = async(videoID) => {
        const VIEWS = `${BASE_URL}/videos?part=statistics&id=${videoID}&key=${YOUTUBE_API_KEY}`;

        try {
            const videoViews = await axios.get(VIEWS);
            return videoViews?.data?.items[0]?.statistics?.viewCount || 0;
        } catch (error) {
            console.error('error', error);
            return 0
        }
    };

    const fetchNxtPgData = async() => {
        const NXT_PG_URL = `${BASE_URL}/playlistItems?part=snippet%2CcontentDetails&maxResults=50&pageToken=${nxtPgToken}&playlistId=${id}&key=${YOUTUBE_API_KEY}`;

        if (playListData.length <= totalItemCount) {
            try {
                const getNxtPgData = await axios.get(NXT_PG_URL);
                const vdoItems = getNxtPgData?.data?.items;
                const nextPgToken = getNxtPgData?.data?.nextPageToken;

                const moreItems = await Promise.all(vdoItems.map(async(item, indx) => {
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
                setDataToRender(prevData => [...prevData, ...moreItems]);
                dispatch(setNextPgToken(nextPgToken));
            } catch (error) {
                console.error('error', error);
            }
        };
    }

    useEffect(() => {
        dispatch(setPlayListData(dataToRender))
    }, [dataToRender])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);
    
        return () => clearTimeout(timer);
    }, []);

    const handleNavigate = () => {
        navigate(`/channel/${channelID}`)
    }

    return (
        <div 
        className=' h-screen lg:py-2 lg:pl-2 flex flex-col lg:flex-row gap-x-3 w-full'>
            <div className='lg:min-w-[23rem] lg:max-w-[23rem] ' >
                <PlayListAreaSideBar/>
            </div>

            <div className='space-y-1 lg:ml-[2rem w-full '>
                <InfiniteScroll 
                className=''
                next={fetchNxtPgData}
                dataLength={playListData.length}
                hasMore={playListData.length <= totalItemCount}
                loader={<spinner/>}>
                    {playListData.map((data, index) => (
                        <> 
                            {isLoading ? (
                                <div className='py-1.5 cursor-pointer hover:bg-neutral-700 hover:rounded-lg pl-2 flex gap-x-3'
                                key={data?.videoId}>
                                    {/* index */}
                                    <div className=' text-[.8rem] text-gray-400 flex items-center'>
                                        <span className='bg-slate-400 h-3 w-3 flex items-center animate-pulse rounded-full'/>
                                    </div>

                                    {/* image */}
                                    <div className='min-w-[9rem] lg:min-w-[11rem] max-w-[11rem] h-[5rem] lg:min-h-[6rem] lg:max-h-[6rem] rounded-lg overflow-hidden bg-slate-600 animate-pulse'>
                                    </div>

                                    {/* content */}
                                    <div className=' space-y-3 lg:space-y-5 mt-2'>
                                        <div className='min- w-[20rem] h-[1rem] bg-slate-600 rounded-full animate-pulse'/>

                                        <div className=' flex items-center gap-x-1'>
                                            <p className='min-w-10 max-w-24 h-[10px] bg-slate-600 rounded-full animate-pulse'/>

                                            <BsDot className=' animate-pulse text-lg text-slate-600'/>

                                            <p className='min-w-16 max-w-28 h-[10px] bg-slate-600 rounded-full animate-pulse'/>

                                            <BsDot className=' animate-pulse text-lg text-slate-600'/>

                                            <p className='min-w-14 max-w-24 h-[10px] bg-slate-600 rounded-full animate-pulse'/>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link className='py-1.5 cursor-pointer hover:bg-neutral-700 hover:rounded-lg pl-2 flex gap-x-3'
                                key={data?.videoId}
                                to={`/watch/${data?.videoId}`}>
                                    {/* index */}
                                    <div className=' text-[.8rem] text-gray-400 flex items-center'>
                                        {index+1}
                                    </div>

                                    {/* image */}
                                    <div className='min-w-[9rem] lg:min-w-[11rem] max-w-[11rem] h-[5rem] lg:min-h-[6rem] lg:max-h-[6rem] rounded-lg overflow-hidden'>
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
                                    <div className=' space-y-3 lg:space-y-5 mt-2'>
                                        <div className='line-clamp-1 w-full lg:text-md'>{data?.title}</div>

                                        <div className=' flex items-center gap-x-1'>
                                            <div className='text-gray-400 z-10 text-[.8rem] line-clamp-1'
                                            onClick={handleNavigate}>
                                                {channelName}
                                            </div>

                                            <BsDot/>

                                            <p className='text-gray-400 text-[.8rem] line-clamp-1'>
                                                {convertViews(data?.views)} views
                                            </p>

                                            <BsDot/>

                                            <p className='text-gray-400 text-[.8rem] line-clamp-1'>
                                                {handleDayCount(data?.publishedAt)}
                                            </p>
                                        </div>
                                    </div>
                                </Link> 
                            )}
                        </>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default DedicatedPlaylist;

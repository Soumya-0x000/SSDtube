import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getChannelInfo, getRecommendedVideos, getVideoInfo, useWindowDimensions } from '../../utils/Hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setEssentialVdoItems, setIsPlaylistRendered, setNxtPgToken, setRecommendedVdo, setVidIdArr, setWatchData } from '../../store/WatchSlice';
import axios from 'axios';
import { BASE_URL, YOUTUBE_API_KEY, convertViews, handleDayCount } from '../../utils/constant';
import InfiniteScroll from 'react-infinite-scroll-component';
import RecommendedCard from './RecommendedCard';
import Loading from '../../components/loading/Loading';
import Img from '../../components/lazyLoadImage/Img';
import { LuThumbsUp, LuThumbsDown  } from "react-icons/lu";
import { MdPlaylistAdd } from 'react-icons/md';
import { RiShareForwardLine } from 'react-icons/ri';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RiScissorsFill } from "react-icons/ri";
import { LiaDownloadSolid } from "react-icons/lia";
import { RiFlagLine } from "react-icons/ri";
import Player from './Player';
import PlayListItems from '../channel/playlist/PlayListItems';

const orgIconTray = [
    { icon: <RiShareForwardLine />, fontSize: 'text-[21px]', text: 'Share' },
    { icon: <LiaDownloadSolid />, fontSize: 'text-[22px]', text: 'Download' },
    { icon: <RiScissorsFill />, fontSize: 'text-[20px]', text: 'Clip' },
    { icon: <MdPlaylistAdd />, fontSize: 'text-[23px]', text: 'Save' },
];

const itemType = ['upload', 'playlistItem'];

const Watch = () => {
    const { id } = useParams();
    const {width} = useWindowDimensions();
    const {
        currentlyPlayingVdoId,
        vdoData, 
        channelID, 
        nxtPgToken,
        isPlaylistRendered,
        essentialVdoItems
    } = useSelector(state => state.watch);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [recommendedItems, setRecommendedItems] = useState([]);
    const [isRecommendedVdoFetched, setIsRecommendedVdoFetched] = useState(false);
    const [resultCount, setResultCount] = useState({
        total: 0,
        current: 0,
    });
    const [iconTrayLgScreen, setIconTrayLgScreen] = useState([...orgIconTray]);
    // const [iconTrayLessLgScreen, setIconTrayLessLgScreen] = useState([...orgIconTray]);
    const [optionsLgScrn, setOptionsLgScrn] = useState([
        { icon: <RiFlagLine />, fontSize: 'text-[23px]', text: 'Report' },
    ]);

    const [isOptionsLgScrnOpen, setIsOptionsLgScrnOpen] = useState(false);
    const [isOptionsLessLgScrnOpen, setIsOptionsLessLgScrnOpen] = useState(false);
    const [logoURL, setLogoURL] = useState('');

    const [truncateText, setTruncateText] = useState(true);
    const [snippetType, setSnippetType] = useState(itemType[0]);
    // const [showMore , setShowMore] = useState({
    //     btnVisibility: false,
    //     fetchMoreData: window.innerWidth <= 1024 ? false : true,
    // });
    // const [btnClicked, setBtnClicked] = useState(false);
    
    // const handleResize = () => {
    //     if (window.innerWidth <= 1024) {
    //         setShowMore({
    //             btnVisibility: true,
    //             fetchMoreData: false,
    //         });
    //     } else {
    //         setShowMore({
    //             btnVisibility: false,
    //             fetchMoreData: true,
    //         })
    //     }
    // };

    // useLayoutEffect(() => {
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

    // const handleBtnVisibility = () => {
    //     setShowMore(prevState => ({
    //         ...prevState,
    //         btnVisibility: true,
    //         fetchMoreData: true,
    //     }));
    //     console.log(showMore.btnVisibility, showMore.fetchMoreData);
    //     fetchNextPageRecommendedVdo();
    // };

    const fetchVdoInfo = async (vdoID) => {
        const vdoInfo = await getVideoInfo(vdoID);
        const likeCount = vdoInfo?.data.items[0]?.statistics?.likeCount;
        const commentCount = vdoInfo?.data.items[0]?.statistics?.commentCount;
        dispatch(setWatchData(vdoInfo?.data.items[0]));
        
        const { channelData }= await getChannelInfo(channelID);
        const channelContent = channelData?.data?.items[0]
        const channelLogoUrl = channelContent?.snippet?.thumbnails?.medium?.url
                            || channelContent?.snippet?.thumbnails?.high?.url
                            || channelContent?.snippet?.thumbnails?.default?.url
        const title = channelContent?.snippet?.title;
        const subscriberCount = channelContent?.statistics?.subscriberCount;
        
        setLogoURL(channelLogoUrl);
        dispatch(setEssentialVdoItems({
            like: likeCount, 
            comment: commentCount, 
            channelTitle: title, 
            subscribers: subscriberCount
        }))
    }
    
    const fetchRecommendedVideos = async (channelId) => {
        const recommendedVideos = await getRecommendedVideos(channelId);
        const recommendedVdoItems = recommendedVideos?.data?.items;
        
        const updatedRecommendedVdoItems = await Promise.all(recommendedVdoItems.map(async(item) => {
            try {
                const vdoData = await axios.get(`${BASE_URL}/videos?part=statistics&id=${item?.contentDetails?.upload?.videoId}&key=${YOUTUBE_API_KEY}`);
                const viewCount = vdoData?.data?.items[0]?.statistics?.viewCount;
                // console.log(item)
                return {...item, viewCount}
            } catch (error) {
                console.error(error);
                return item;
            }
        }));

        setRecommendedItems(updatedRecommendedVdoItems);
        dispatch(setRecommendedVdo(updatedRecommendedVdoItems));
        setIsRecommendedVdoFetched(true);

        setResultCount({
            total: recommendedVideos?.data?.pageInfo?.totalResults,
            current: recommendedVdoItems?.length
        });

        if (recommendedVideos?.data?.nextPageToken) {
            dispatch(setNxtPgToken(recommendedVideos?.data?.nextPageToken))
        }
    };

    const fetchNextPageRecommendedVdo = async () => {
        const NEXT_RECOMMENDED_VIDEOS = `${BASE_URL}/activities?part=snippet%2CcontentDetails&channelId=${channelID}&maxResults=20&pageToken=${nxtPgToken}&key=${YOUTUBE_API_KEY}`;
        
        // console.log('fetched', showMore.fetchMoreData);
        // if (showMore.fetchMoreData) {
            if (isRecommendedVdoFetched) {
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

        //     if (showMore.btnVisibility) {
        //         setShowMore({
        //             btnVisibility: true,
        //             fetchMoreData: false,
        //         });
        //     }
        // }
    };

    useEffect(() => {
        fetchVdoInfo(id);
        fetchRecommendedVideos(channelID);
    }, []);

    useEffect(() => {
        fetchVdoInfo(currentlyPlayingVdoId);
    }, [currentlyPlayingVdoId]);

    useEffect(() => {
        if (width < 1150) {
            const downloadIndex = iconTrayLgScreen.findIndex(item => item.text === 'Share');
            if (downloadIndex !== -1) {
                const removedItem = iconTrayLgScreen.splice(downloadIndex, 1);
                setOptionsLgScrn(prevOptionsLgScrn => [...prevOptionsLgScrn, removedItem[0]]);
            }
        } else {
            const downloadIndex = optionsLgScrn.findIndex(item => item.text === 'Share');
            if (downloadIndex !== -1) {
                const removedItem = optionsLgScrn.splice(downloadIndex, 1);
                (prevIconTray => [...prevIconTray, removedItem[0]]);
            }
        }

        if (width < 1275) {
            const downloadIndex = iconTrayLgScreen.findIndex(item => item.text === 'Download');
            if (downloadIndex !== -1) {
                const removedItem = iconTrayLgScreen.splice(downloadIndex, 1);
                setOptionsLgScrn(prevOptionsLgScrn => [...prevOptionsLgScrn, removedItem[0]]);
            }
        } else {
            const downloadIndex = optionsLgScrn.findIndex(item => item.text === 'Download');
            if (downloadIndex !== -1) {
                const removedItem = optionsLgScrn.splice(downloadIndex, 1);
                (prevIconTray => [...prevIconTray, removedItem[0]]);
            }
        }
    
        if (width < 1450) {
            const clipIndex = iconTrayLgScreen.findIndex(item => item.text === 'Clip');
            if (clipIndex !== -1) {
                const removedItem = iconTrayLgScreen.splice(clipIndex, 1);
                setOptionsLgScrn(prevOptionsLgScrn => [...prevOptionsLgScrn, removedItem[0]]);
            }
        } else {
            const clipIndex = optionsLgScrn.findIndex(item => item.text === 'Clip');
            if (clipIndex !== -1) {
                const removedItem = optionsLgScrn.splice(clipIndex, 1);
                (prevIconTray => [...prevIconTray, removedItem[0]]);
            }
        }
    
        if (width < 1600) {
            const saveIndex = iconTrayLgScreen.findIndex(item => item.text === 'Save');
            if (saveIndex !== -1) {
                const removedItem = iconTrayLgScreen.splice(saveIndex, 1);
                setOptionsLgScrn(prevOptionsLgScrn => [...prevOptionsLgScrn, removedItem[0]]);
            }
        } else {
            const saveIndex = optionsLgScrn.findIndex(item => item.text === 'Save');
            if (saveIndex !== -1) {
                const removedItem = optionsLgScrn.splice(saveIndex, 1);
                (prevIconTray => [...prevIconTray, removedItem[0]]);
            }
        }
    
        const reportIndex = optionsLgScrn.findIndex(item => item.text === 'Report');
        if (reportIndex === -1) {
            setOptionsLgScrn(prevOptionsLgScrn => [...prevOptionsLgScrn, { icon: <RiFlagLine />, fontSize: 'text-[23px]', text: 'Report' }]);
        }
    }, [width, iconTrayLgScreen, optionsLgScrn]);
    
    // useEffect(() => {
    //     if (width < 1275) {
    //         const downloadIndex = iconTrayLgScreen.findIndex(item => item.text === 'Download');
    //         if (downloadIndex !== -1) {
    //             const removedItem = iconTrayLgScreen.splice(downloadIndex, 1);
    //             setOptionsLgScrn(prevOptionsLgScrn => [...prevOptionsLgScrn, removedItem[0]]);
    //         }
    //     } else {
    //         const downloadIndex = optionsLgScrn.findIndex(item => item.text === 'Download');
    //         if (downloadIndex !== -1) {
    //             const removedItem = optionsLgScrn.splice(downloadIndex, 1);
    //             (prevIconTray => [...prevIconTray, removedItem[0]]);
    //         }
    //     }
    
    //     if (width < 1450) {
    //         const clipIndex = iconTrayLgScreen.findIndex(item => item.text === 'Clip');
    //         if (clipIndex !== -1) {
    //             const removedItem = iconTrayLgScreen.splice(clipIndex, 1);
    //             setOptionsLgScrn(prevOptionsLgScrn => [...prevOptionsLgScrn, removedItem[0]]);
    //         }
    //     } else {
    //         const clipIndex = optionsLgScrn.findIndex(item => item.text === 'Clip');
    //         if (clipIndex !== -1) {
    //             const removedItem = optionsLgScrn.splice(clipIndex, 1);
    //             (prevIconTray => [...prevIconTray, removedItem[0]]);
    //         }
    //     }
    
    //     if (width < 1600) {
    //         const saveIndex = iconTrayLgScreen.findIndex(item => item.text === 'Save');
    //         if (saveIndex !== -1) {
    //             const removedItem = iconTrayLgScreen.splice(saveIndex, 1);
    //             setOptionsLgScrn(prevOptionsLgScrn => [...prevOptionsLgScrn, removedItem[0]]);
    //         }
    //     } else {
    //         const saveIndex = optionsLgScrn.findIndex(item => item.text === 'Save');
    //         if (saveIndex !== -1) {
    //             const removedItem = optionsLgScrn.splice(saveIndex, 1);
    //             (prevIconTray => [...prevIconTray, removedItem[0]]);
    //         }
    //     }
    
    //     const reportIndex = optionsLgScrn.findIndex(item => item.text === 'Report');
    //     if (reportIndex === -1) {
    //         setOptionsLgScrn(prevOptionsLgScrn => [...prevOptionsLgScrn, { icon: <RiFlagLine />, fontSize: 'text-[23px]', text: 'Report' }]);
    //     }
    // }, [width, iconTrayLgScreen, optionsLgScrn]);

    const handleOptionClick = () => {
        setIsOptionsLgScrnOpen(!isOptionsLgScrnOpen);
    };

    function extractLinks(text) {
        if (!text) return null;
    
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const matches = text.match(urlRegex);
    
        if (!matches) return text;
        
        return (
            <>
                {text.split(urlRegex).map((part, index) => {
                    if (matches.includes(part)) {
                        return (
                            <a className=' text-blue-400 underline' key={index} href={part} target="_blank" rel="noopener noreferrer">
                                {part}
                            </a>
                        );
                    } else {
                        return <span key={index}>{part}</span>;
                    }
                })}
            </>
        );
    }
    
    const handleTextTruncate = () => {
        setTruncateText(prevVal => !prevVal)
    };

    const handleRedirect = () => {
        navigate(`/channel/${channelID}`)
    };

    return (
        <div className=' mx-3 2xl:mx-12 3xl:mx-16 mt-2 flex flex-col gap-y-4 lg:flex-row  lg:gap-x-4 xl:gap-x-6 3xl:gap-x-8'>
            {/* video part */}
            <div className=' w-full h-full lg:w-[68%] rounded-lg xl:rounded-xl flex flex-col items-start'>
                {/* player */}
                <div className=' w-full aspect-video rounded-lg xl:rounded-xl overflow-hidden'>
                    <div className=' w-full h-full'>
                        <Player id={currentlyPlayingVdoId} />
                    </div>
                </div>

                {/* details */}
                <div className=' mt-3 w-full space-y-3 '>
                    {/* title */}
                    <p className='text-[1.4rem] xl:text-2xl font-bold line-clamp-1'>
                        {vdoData?.snippet?.title}
                    </p>

                    {/* functionalities (yet to be done) */} 
                    <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-y-3 watchController:gap-y-0 w-full'>
                        {/* title & author */}
                        <div className=' flex items-center gap-x-3 w-[18rem '>
                            <div className=' w-10 h-10 rounded-full overflow-hidden cursor-pointer'
                            onClick={handleRedirect}>
                                <Img
                                    className={` w-full h-full`}
                                    src={logoURL}
                                />
                            </div>

                            <div className=''>
                                <div className='text-[.94rem] font-bold flex items-center gap-x-1 cursor-pointer'>
                                    <p className=' line-clamp-1 max-w-[13rem] text-sm'
                                    onClick={handleRedirect}>
                                        {essentialVdoItems.channelTitle}
                                    </p>

                                    {essentialVdoItems.subscribers > 100000 && (
                                        <div className=' min-h-4 min-w-4 max-h-4 max-w-4'>
                                            <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false" style={{ display: 'block' }}>
                                                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z" fill='gray'></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <p className=' text-gray-400 text-sm line-clamp-1'>
                                    {convertViews(essentialVdoItems.subscribers)} subscribers
                                </p>
                            </div>

                            <button className='2xl:ml-1 bg-white text-black w-[7rem] h-[2.4rem] rounded-full active:scale-110 transition-all'>
                                Subscribe
                            </button>
                        </div>

                        {/* operating buttons */}
                        <div className=' flex items-center gap-x-[.5rem]'>
                            {/* left side */}
                            <div className=' flex items-center justify-center bg-neutral-700 rounded-full h-[2.5rem] px-4'>
                                <span className='hover:bg-gray-70 pr-4 flex items-center gap-x-2 border-r cursor-pointer'>
                                    <LuThumbsUp className=' text-lg'/>
                                    <p className=' text-sm'>
                                        {convertViews(essentialVdoItems.like)}
                                    </p>
                                </span>

                                <span className=' flex pl-3 items-center gap-x-2 cursor-pointer'>
                                    <LuThumbsDown className=' text-lg'/>
                                </span>
                            </div>
                            
                            {/* buttons */}
                            {iconTrayLgScreen.map((item, indx) => (
                                <button 
                                className={` flex items-center gap-x-1 h-[2.4rem] rounded-full px-3 bg-neutral-700 hover:bg-gray-700`}
                                key={item.text+indx}>
                                    <p className={` ${item.fontSize}`}>
                                        {item.icon}
                                    </p>
                                    <p className='text-[14px] pr-2'>
                                        {item.text}
                                    </p>
                                </button>
                            ))}
                            
                            {/* three dot option menu */}
                            <div 
                            className=' relative flex items-center justify-center w-[2.4rem] h-[2.4rem] rounded-full  bg-neutral-700 hover:bg-gray-700 cursor-pointer '
                            onClick={handleOptionClick}>
                                <BsThreeDotsVertical className=' text-[22px] rotate-90' />

                                {isOptionsLgScrnOpen && (
                                    <div className='bg-neutral-800 absolute top-12 right-0 w-[10rem] rounded-lg overflow-hidden py-2 z-10'>
                                        {optionsLgScrn.map((item, indx) => (
                                            <button 
                                            className={`w-full flex items-center gap-x-3 h-[2.4rem] bg-neutral-700 hover:bg-neutral-600`}
                                            key={item.text+indx}>
                                                <p className={`text-md ${item.fontSize} pl-3`}>
                                                    {item.icon}
                                                </p>
                                                <p className='text-[15px]  pr-2'>
                                                    {item.text}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* video description */}
                    <div className='relative bg-neutral-800 rounded-md p-3 space-y-2'>
                        <div className='flex items-center gap-x-4'>
                            <div>
                                {vdoData?.statistics?.viewCount} views
                            </div>

                            <div>
                                {handleDayCount(vdoData?.snippet?.publishedAt)}
                            </div>
                        </div>

                        <div className={` whitespace-pre-line text-[14px]`}>
                            <div className={`${truncateText ? 'line-clamp-3' : ''} `}>
                                {extractLinks(vdoData?.snippet?.description)}
                            </div>

                            <div className=' absolute text-[13px] right-1 bottom-[13px] text-white cursor-pointer w-12 flex items-center justify-end bg-neutral-800'
                            onClick={handleTextTruncate}>
                                {truncateText ? '...more' : 'less'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* recommended video part */}
            <div className=' rounded-lg w-full overflow-y-auto lg:w-[32%] lg:min-w-[25rem]'>
                {isPlaylistRendered && (
                    <PlayListItems/>
                )}

                <InfiniteScroll 
                className=' h-full flex flex-col gap-y-2 pt-3 border-t-2 border-t-slate-600'
                loader={<>
                    {[...Array(9)].map((_, indx) => (
                        <div key={indx} className='hidde n lg: block h-full w-ful lg:min-w-[25rem] lg:max-w-[33rem]'>
                            <div className=' flex gap-x-3'>
                                <div className='min-w-[11rem] max-w-[11rem] lg:min-w-[10rem] lg:max-w-[10rem] h-[6rem] rounded-lg overflow-hidden bg-slate-600 animate-pulse'/>

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
                            snippetType={snippetType}
                        />
                    ))}
                </InfiniteScroll>

                {/* {resultCount.current <= resultCount.total && (   
                    <button className=' my-4 w-full py-2 bg-slate-700 hover:bg-slate-600  rounded-full overflow-hidden active:bg-neutral-700 transition-all block lg:hidden'
                    onClick={handleBtnVisibility}>
                        Show more
                    </button>
                )} */}
            </div>
        </div>
    );
}

export default Watch;

import { useDispatch, useSelector } from 'react-redux';
import Img from '../../components/lazyLoadImage/Img'
import { convertViews, handleDayCount } from '../../utils/Constant'
import { BsDot } from "react-icons/bs";
import { setCurrentlyPlayingVdoId } from '../../store/reducers/WatchSlice';
import { CiClock2 } from "react-icons/ci";
import { PiQueueFill } from "react-icons/pi";
import { setCounting, setPlayListData } from '../../store/reducers/PlayListSlice';
import { useEffect, useState } from 'react';
import { CgPlayListCheck } from "react-icons/cg";
import { IoMdCheckmark } from "react-icons/io";
import ThreeDotOptions from '../../common/ThreeDotOptions';
import { setIsWatchQueueOn, setWatchQueue } from '../../store/reducers/WatchQueueSlice';
import { setWatchLaterData } from '../../store/reducers/WatchLaterSlice';
import { getViews } from '../../utils/Hooks';

const RecommendedCard = ({ item, snippetType, index }) => {
    const dispatch = useDispatch();
    const { 
        playListData, 
        playListOn, 
        currentItemsCount 
    } = useSelector(state=> state.playlist);
    const { 
        isWatchQueueOn, 
        watchQueue, 
    } = useSelector(state=> state.watchQueue);
    const { watchLaterData, totalVids } = useSelector(state=> state.watchLater)
    const [optionsClicked, setOptionsClicked] = useState(new Array(playListData.length).fill(false));
    const [mouseEnter, setMouseEnter] = useState(false);
    const [clicked, setClicked] = useState({
        watchLater: false,
        watchQ: false,
    });

    const handleClick = async () => {
        // if (snippetType === 'upload') {
            const videoID = item?.contentDetails?.upload?.videoId;
            dispatch(setCurrentlyPlayingVdoId(videoID));
        // }
    };

    const handleWatchLaterVdo = (e, item) => {
        e.stopPropagation();
        const id = item?.contentDetails?.upload?.videoId;
        const isDuplicate = watchLaterData.some((entry) => entry.videoId === id);

        if (!isDuplicate) {
            (async () => {
                const videoId = item?.contentDetails?.upload?.videoId;
                const views = item?.viewCount;
                const publishedAt = item?.snippet?.publishedAt;
                const title = item?.snippet?.title;
                const thumbnail = item?.snippet?.thumbnails?.maxres?.url
                                || item?.snippet?.thumbnails?.high?.url
                                || item?.snippet?.thumbnails?.medium?.url
                                || item?.snippet?.thumbnails?.standard?.url
                                || item?.snippet?.thumbnails?.default?.url
                const channelName = item?.snippet?.channelTitle;
                const channelID = item?.snippet?.channelId;
                dispatch(setWatchLaterData([
                    ...watchLaterData, 
                    {videoId, views, publishedAt, title, thumbnail, channelName, channelID}
                ]));
                console.log({videoId, views, publishedAt, title, thumbnail, channelName, channelID})
            })();
        }
    };

    const handleAddVdo = async (e, item) => {
        e.stopPropagation();
        setClicked({
            ...clicked,
            watchQ: true
        });
        !playListOn && dispatch(setIsWatchQueueOn(true));

        const id = item?.contentDetails?.upload?.videoId;
        if (playListOn) {
            const isDuplicate = playListData.some((entry) => entry.videoId === id);

            if (!isDuplicate) {
                dispatch(setIsWatchQueueOn(false));
                (async () => {
                    const videoId = item?.contentDetails?.upload?.videoId;
                    const views = item?.viewCount;
                    const publishedAt = item?.snippet?.publishedAt;
                    const description = item?.snippet?.description;
                    const title = item?.snippet?.title;
                    const thumbnail = item?.snippet?.thumbnails?.maxres?.url
                                    || item?.snippet?.thumbnails?.high?.url
                                    || item?.snippet?.thumbnails?.medium?.url
                                    || item?.snippet?.thumbnails?.standard?.url
                                    || item?.snippet?.thumbnails?.default?.url
                    
                    dispatch(setPlayListData([
                        ...playListData, 
                        {videoId, views, publishedAt, description: description ? description : "", title, thumbnail}
                    ]));
                })();
            }
        }
    };

    useEffect(() => {
        if (clicked.watchQ) {
            const id = item?.contentDetails?.upload?.videoId;
            if (isWatchQueueOn) {
                const isDuplicate = watchQueue.some((entry) => entry.videoId === id);
    
                if (!isDuplicate) {
                    (async () => {    
                        const videoId = item?.contentDetails?.upload?.videoId;
                        const publishedAt = item?.snippet?.publishedAt;
                        const title = item?.snippet?.title;
                        const thumbnail = item?.snippet?.thumbnails?.maxres?.url
                                        || item?.snippet?.thumbnails?.high?.url
                                        || item?.snippet?.thumbnails?.medium?.url
                                        || item?.snippet?.thumbnails?.standard?.url
                                        || item?.snippet?.thumbnails?.default?.url
                        const channelName = item?.snippet?.channelTitle;
                        const channelID = item?.snippet?.channelId;
                        
                        dispatch(setWatchQueue([
                            ...watchQueue,
                            {videoId, title, thumbnail, publishedAt, channelName, channelID}
                        ]));
                    })();
                }
            }

            setClicked(prevState => ({
                ...prevState,
                watchQ: false
            }));
        }
    }, [clicked.watchQ]);

    useEffect(() => {
        dispatch(setCounting({
            totalCount: playListData.length,
            currentCount: currentItemsCount
        }))
    }, [playListData]);

    const handleMouseLeave = () => {
        setOptionsClicked(new Array(playListData.length).fill(false))
        setMouseEnter(false);
    };
    
    const handleMouseEnter = () => {
        setMouseEnter(true)
    };

    return (
        <>
            {item?.snippet?.type === 'upload' && (
                <div className='hover:bg-neutral-700 cursor-pointer rounded-lg flex items-center justify-start group relative'
                onClick={handleClick} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                    <div className=' flex items-center gap-x-3'>
                        <div className='relative min-w-[11rem] max-w-[11rem] lg:min-w-[10rem] lg:max-w-[10rem] h-[6rem] rounded-lg overflow-hidden'>
                            <Img 
                                className={` h-full w-full`}
                                src={
                                    item?.snippet?.thumbnails?.maxres?.url
                                    || item?.snippet?.thumbnails?.high?.url
                                    || item?.snippet?.thumbnails?.standard?.url
                                    || item?.snippet?.thumbnails?.medium?.url
                                    || item?.snippet?.thumbnails?.default?.url
                                }
                            />

                            <div className=' absolute right-1 top-2 hidden group-hover:flex flex-col gap-y-1'>
                                <div className='bg-black backdrop-blur-md text-white text-[21px] rounded-md p-1'
                                onClick={(e) => handleWatchLaterVdo(e, item)}>
                                    {clicked.watchLater ? (
                                        <IoMdCheckmark/>
                                    ) : (
                                        <CiClock2/>
                                    )}
                                </div>
                                
                                <div className='bg-black backdrop-blur-md text-white text-[21px] rounded-md p-1'
                                onClick={(e) => handleAddVdo(e, item)}>
                                    {clicked.watchQ ? (
                                        <CgPlayListCheck/>
                                    ) : (
                                        <PiQueueFill/>
                                    )}
                                </div>
                            </div>              
                        </div>

                        {/* text section */}
                        <div className=' h-[6rem] flex flex-col py-1 gap-y-3'>
                            <p className=' line-clamp-1 lg:line-clamp-2 lg:text-[14px] xl:text-md'>
                                {item?.snippet?.title}
                            </p>

                            <div className='flex flex-col gap-y-.5'>
                                <div className=' line-clamp-1 text-[.75rem] text-gray-400 flex items-center gap-x-2 mt- 2'>
                                    {item?.snippet?.channelTitle} 
                                    <div className=' h-4 w-4'>
                                        <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false" style={{ display: 'block' }}>
                                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z" fill='gray'></path>
                                        </svg>
                                    </div>
                                </div>

                                <div className=' flex items-center line-clamp-1 text-[.75rem] text-gray-400 mt- .5'>
                                    {snippetType === 'upload' && (
                                        <>
                                            <div className=''>
                                                {convertViews(item?.viewCount)} views
                                            </div>                        
                                        

                                            <BsDot/>
                                        </>
                                    )}

                                    <p className=''>
                                        {handleDayCount(item?.snippet?.publishedAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ThreeDotOptions 
                        vdoCode={item?.contentDetails?.upload?.videoId}
                        optionsClicked={optionsClicked}
                        setOptionsClicked={setOptionsClicked}
                        index={index}
                        mode={`recommended`}
                        mouseEnter={mouseEnter}
                        data={item}
                    />
                </div>
            )}
        </>
    )
}

export default RecommendedCard;

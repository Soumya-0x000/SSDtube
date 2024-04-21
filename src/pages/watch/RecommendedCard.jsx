import { useDispatch, useSelector } from 'react-redux';
import Img from '../../components/lazyLoadImage/Img'
import { convertViews, handleDayCount } from '../../utils/constant'
import { BsDot } from "react-icons/bs";
import { setCurrentlyPlayingVdoId, setIsPlaylistRendered } from '../../store/WatchSlice';
import { CiClock2 } from "react-icons/ci";
import { PiQueueFill } from "react-icons/pi";
import { setCounting, setPlayListData } from '../../store/PlayListSlice';
import { useEffect, useState } from 'react';
import { CgPlayListCheck } from "react-icons/cg";

const RecommendedCard = ({ item, snippetType, index }) => {
    const dispatch = useDispatch();
    const { playListData, totalItemCount, currentItemsCount } = useSelector(state=> state.playlist)
    const { isPlaylistRendered } = useSelector(state=> state.watch);
    const [addedPlayList, setAddedPlayList] = useState(new Array(playListData.length).fill(false));

    const handleClick = async () => {
        // if (snippetType === 'upload') {
            const videoID = item?.contentDetails?.upload?.videoId;
            dispatch(setCurrentlyPlayingVdoId(videoID));
        // }
    };

    const addToWatchLater = (e, item) => {
        e.stopPropagation();
        console.log('watch later', item)
    };
    
    const handleAddVdo = async (e, item) => {
        e.stopPropagation();
        // dispatch(setWatchQueueCreated(true));
        if (isPlaylistRendered) {
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
        } else {
            
        }
    };

    useEffect(() => {
        dispatch(setCounting({
            totalCount: playListData.length,
            currentCount: currentItemsCount
        }))
    }, [playListData]);

    return (
        <>
            {item?.snippet?.type === 'upload' && (
                <div className='hover:bg-neutral-700 cursor-pointer rounded-lg flex items-center justify-start group'
                onClick={handleClick}>
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
                                onClick={(e) => addToWatchLater(e, item)}>
                                    <CiClock2/>
                                </div>
                                
                                <div className='bg-black backdrop-blur-md text-white text-[21px] rounded-md p-1'
                                onClick={(e) => handleAddVdo(e, item)}>
                                    <PiQueueFill/>
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
                </div>
            )}
        </>
    )
}

export default RecommendedCard;

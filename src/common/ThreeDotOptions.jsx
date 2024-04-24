import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdOutlineWatchLater } from 'react-icons/md';
import { FaRegTrashCan } from 'react-icons/fa6';
import { PiQueueFill } from "react-icons/pi";
import { setCounting, setPlayListData } from '../store/reducers/PlayListSlice';
import { setCurrentClickIndex, setIsWatchQueueOn, setWatchQueue } from '../store/reducers/WatchQueueSlice';
import { setWatchLaterData } from '../store/reducers/WatchLaterSlice';
import { getViews } from '../utils/Hooks';

const ThreeDotOptions = ({ vdoCode, optionsClicked, setOptionsClicked, index, mode, mouseEnter, data }) => {
    const { 
        playListData, 
        currentItemsCount, 
        playListOn, 
    } = useSelector(state=> state.playlist)
    const { 
        watchQueue, 
        currentClickIndex, 
        isWatchQueueOn, 
    } = useSelector(state=> state.watchQueue);
    const { watchLaterData, totalVids } = useSelector(state=> state.watchLater)
    const dispatch = useDispatch();
    const [clicked, setClicked] = useState({
        watchLater: false,
        watchQ: false,
    });
    const [watchLaterContent, setWatchLaterContent] = useState([]);
    const [watchLaterMode, setWatchLaterMode] = useState('');
    
    const handleOperations = (parentComp, videoCode, index, mainMode) => {
        switch (parentComp) {
            case 'removePlaylistEntry':
                const tempArr = [...playListData].filter(entry => entry.videoId !== vdoCode);
                dispatch(setPlayListData(tempArr));
                break;
            case 'removeWatchQentry':
                const tempArr1 = [...watchQueue].filter(entry => entry.videoId !== vdoCode);
                dispatch(setWatchQueue(tempArr1));
                break;
            case 'addToWatchQ':
                setClicked({
                    ...clicked,
                    watchQ: true
                });
                !playListOn && dispatch(setIsWatchQueueOn(true));
                
                const watchQvdoId = data?.contentDetails?.upload?.videoId;

                if (playListOn) {
                    const isDuplicate = playListData.some((entry) => entry.videoId === watchQvdoId);
        
                    if (!isDuplicate) {
                        dispatch(setIsWatchQueueOn(false));
                        (async () => {
                            const videoId = data?.contentDetails?.upload?.videoId;
                            const views = data?.viewCount;
                            const publishedAt = data?.snippet?.publishedAt;
                            const description = data?.snippet?.description;
                            const title = data?.snippet?.title;
                            const thumbnail = data?.snippet?.thumbnails?.maxres?.url
                                            || data?.snippet?.thumbnails?.high?.url
                                            || data?.snippet?.thumbnails?.medium?.url
                                            || data?.snippet?.thumbnails?.standard?.url
                                            || data?.snippet?.thumbnails?.default?.url
                            
                            dispatch(setPlayListData([
                                ...playListData, 
                                {videoId, views, publishedAt, description: description ? description : "", title, thumbnail}
                            ]));
                        })();
                    }
                };
                break;
            case 'addToWatchLater':
                setClicked({
                    ...clicked,
                    watchLater: true,
                });
                
                console.log(clicked)
                if(mainMode === 'recommended') {
                    const watchLaterVdoId = data?.contentDetails?.upload?.videoId;
                    const isDuplicate = watchLaterContent.some((entry) => entry.videoId === watchLaterVdoId);
        
                    (async () => {
                        try {
                            const videoId = data?.contentDetails?.upload?.videoId;
                            const views = await getViews(videoId)
                            const publishedAt = data?.snippet?.publishedAt;
                            const title = data?.snippet?.title;
                            const thumbnail = data?.snippet?.thumbnails?.maxres?.url
                                            || data?.snippet?.thumbnails?.high?.url
                                            || data?.snippet?.thumbnails?.medium?.url
                                            || data?.snippet?.thumbnails?.standard?.url
                                            || data?.snippet?.thumbnails?.default?.url
                            const channelName = data?.snippet?.channelTitle;
                            const channelID = data?.snippet?.channelId;
                            
                            const allVal = {videoId, views, title, thumbnail, publishedAt, channelName, channelID}
                            
                            setWatchLaterContent(prevVal => [ ...prevVal, allVal ]);
                            console.log(allVal);
                        } catch (error) {
                            console.error(error);
                        }
                    })();
                } else if (mainMode === 'playList' || mainMode === 'watchQueue') {
                    const watchLaterVdoId = data?.videoId;                    
                    const isDuplicate = watchLaterContent.some((entry) => entry.videoId === watchLaterVdoId);
                    
                    (async() => {
                        try {
                            const views = await getViews(watchLaterVdoId)
                            const updatedData = ({ ...data, views });

                            setWatchLaterContent(prevVal => [ ...prevVal, updatedData ]);
                            dispatch(setWatchLaterData(updatedData));
                            console.log(updatedData);
                        } catch (error) {
                            console.error(error);
                        }
                    })(); 
                }
                
                console.log(watchLaterData)
                break;
            default:
                break
        }
    };

    // const handleWatchLater = (parentComp, videoCode, index, mainMode) => {
    //     setClicked(prevVal => ({
    //         ...prevVal,
    //         watchLater: true
    //     }))
    //     setWatchLaterMode(mainMode);
        
    //     // if(mainMode === 'recommended') {
    //     //     const watchLaterVdoId = data?.contentDetails?.upload?.videoId;
    //     //     console.log(watchLaterVdoId)

    //     //     // if (clicked.watchLater) {
    //     //         const isDuplicate = watchLaterContent.some((entry) => entry.videoId === watchLaterVdoId);
    
    //     //         // if (!isDuplicate) {
    //     //             (async () => {
    //     //                 try {
    //     //                     const videoId = data?.contentDetails?.upload?.videoId;
    //     //                     const views = await getViews(videoId)
    //     //                     const publishedAt = data?.snippet?.publishedAt;
    //     //                     const title = data?.snippet?.title;
    //     //                     const thumbnail = data?.snippet?.thumbnails?.maxres?.url
    //     //                                     || data?.snippet?.thumbnails?.high?.url
    //     //                                     || data?.snippet?.thumbnails?.medium?.url
    //     //                                     || data?.snippet?.thumbnails?.standard?.url
    //     //                                     || data?.snippet?.thumbnails?.default?.url
    //     //                     const channelName = data?.snippet?.channelTitle;
    //     //                     const channelID = data?.snippet?.channelId;
                            
    //     //                     const allVal = {videoId, views, title, thumbnail, publishedAt, channelName, channelID}
                            
    //     //                     setWatchLaterContent(prevVal => [ ...prevVal, allVal ]);
    //     //                     console.log(allVal);
    //     //                 } catch (error) {
    //     //                     console.error(error);
    //     //                 }
    //     //             })();
    //     //         // }
                
    //     //         // setClicked(prevState => ({
    //     //         //     ...prevState,
    //     //         //     watchLater: false
    //     //         // }));
    //     //     // }
    //     // } else if (mainMode === 'playList' || mainMode === 'watchQueue') {
    //     //     const watchLaterVdoId = data?.videoId;
    //     //     console.log(watchLaterVdoId)
            
    //     //     // if (clicked.watchLater) {
    //     //         const isDuplicate = watchLaterContent.some((entry) => entry.videoId === watchLaterVdoId);
                
    //     //         // if (!isDuplicate) {
    //     //             (async() => {
    //     //                 try {
    //     //                     const views = await getViews(watchLaterVdoId)
    //     //                     const updatedData = ({ ...data, views });

    //     //                     setWatchLaterContent(prevVal => [ ...prevVal, updatedData ]);
    //     //                     console.log(updatedData);
    //     //                 } catch (error) {
    //     //                     console.error(error);
    //     //                 }
    //     //             })();
    //     //         // };
    //     //     // }
    //     // }
        
    //     console.log(watchLaterMode)
    // };

    useEffect(() => {
        dispatch(setCurrentClickIndex(
            currentClickIndex > watchQueue.length ? watchQueue.length : currentClickIndex
        ));
    }, [watchQueue]);

    useEffect(() => {
        if (clicked.watchQ) {
            const id = data?.contentDetails?.upload?.videoId;
            if (isWatchQueueOn) {
                const isDuplicate = watchQueue.some((entry) => entry.videoId === id);
    
                if (!isDuplicate) {
                    (async () => {    
                        const videoId = data?.contentDetails?.upload?.videoId;
                        const publishedAt = data?.snippet?.publishedAt;
                        const title = data?.snippet?.title;
                        const thumbnail = data?.snippet?.thumbnails?.maxres?.url
                                        || data?.snippet?.thumbnails?.high?.url
                                        || data?.snippet?.thumbnails?.medium?.url
                                        || data?.snippet?.thumbnails?.standard?.url
                                        || data?.snippet?.thumbnails?.default?.url
                        const channelName = data?.snippet?.channelTitle;
                        const channelID = data?.snippet?.channelId;
                        
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
            currentCount: currentItemsCount > playListData.length ? playListData.length : currentItemsCount,
            totalCount: playListData.length
        }));
    }, [playListData]);
    
    const ThreeDotClickOptions = (videoCode, index) => {
        return (
            <div className=' space-y-5'>
                <div className=' flex flex-wrap gap-x-3'
                onClick={() => handleOperations('addToWatchLater', videoCode, index, mode)}>
                    <MdOutlineWatchLater className=' text-2xl'/>
                    <span>Add to watch later</span>
                </div>
                
                {mode === 'playList' && (
                    <div className=' flex flex-wrap gap-x-3'
                    onClick={() => handleOperations('removePlaylistEntry', videoCode, index, mode)}>
                        <FaRegTrashCan className=' text-xl'/>
                        <span>Remove from playList</span>
                    </div>
                )}
                
                {mode === 'watchQueue' && (
                    <div className=' flex flex-wrap gap-x-3'
                    onClick={() => handleOperations('removeWatchQentry', videoCode, index, mode)}>
                        <FaRegTrashCan className=' text-xl'/>
                        <span>Remove from queue</span>
                    </div>
                )}

                {mode === 'recommended' && (
                    <div className=' flex flex-wrap gap-x-3'
                    onClick={() => handleOperations('addToWatchQ', videoCode, index, mode)}>
                        <PiQueueFill className=' text-xl'/>
                        <span>Add to queue</span>
                    </div>
                )}
            </div>
        )
    };

    const handleThreeDotClick = (e, videoId, index) => {
        e.stopPropagation();
        setOptionsClicked(prevOptionsClicked => {
            const tempArr = [...prevOptionsClicked];
            tempArr[index] = !tempArr[index];
            return tempArr;
        });
    }; 

    return (
        <div className='group absolute right-1 top-1/2 -translate-y-1/2'>
            <div className={` bg-neutral-800 ${mouseEnter ? 'flex' : 'hidden'} items-center justify-center rounded-full w-8 h-8 relative`}
            onClick={(e) => handleThreeDotClick(e, vdoCode, index)}>
                <BsThreeDotsVertical className='text-xl'/>

                {optionsClicked[index] && (
                    <div className=' absolute right-10 w-[14rem] bg-slate-800 z-50 pl-3 py-3 rounded-md'>
                        <ThreeDotClickOptions/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ThreeDotOptions;

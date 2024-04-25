import React, { useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { PiQueueFill } from 'react-icons/pi';
import { VscTrash } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { setWatchLaterBanner, setWatchLaterData } from '../store/reducers/WatchLaterSlice';
import { setWatchQueue } from '../store/reducers/WatchQueueSlice';
import {BASE_URL, YOUTUBE_API_KEY} from '../utils/Constant';
import { getViews } from '../utils/Hooks';

const ThreeDotOptions_2 = ({ optionsClicked, setOptionsClicked, videoCode, index, mode, mouseEnter, data }) => {
    const { watchLaterData } = useSelector(state => state.watchLater);
    const { watchQueue } = useSelector(state => state.watchQueue);
    const dispatch = useDispatch();

    const handleThreeDotClick = (e) => {
        e.stopPropagation();
        setOptionsClicked(prevOptionsClicked => {
            const tempArr = [...prevOptionsClicked];
            tempArr[index] = !tempArr[index];
            return tempArr;
        });
    }; 

    const handleOperations = (mainMode) => {
        switch (mainMode) {
            case "removeFromWatchLater":
                if (!(watchLaterData.some(entry => entry.videoId === videoCode))) return;
                const tempArr = [...watchLaterData].filter(entry => entry.videoId !== videoCode);
                dispatch(setWatchLaterData(tempArr));
                break;
            case "addToWatchLater":
                const id = data?.videoId;
                const isDuplicateWatchLater = watchLaterData.some((entry) => entry.videoId === id);
                
                if (!isDuplicateWatchLater) {
                    (async() => {
                        try {
                            const GET_VIDEO_INFO = `${BASE_URL}/videos?part=snippet&id=${id}&key=${YOUTUBE_API_KEY}`;
                            const views = await getViews(id);
                            const vdoInfo = await axios.get(GET_VIDEO_INFO);
                            const primaryPart = vdoInfo?.data?.items[0]?.snippet;

                            const channelID = primaryPart?.channelId;
                            const channelName = primaryPart?.channelTitle;

                            const newData = { ...data };
                            if (!newData.channelID && !newData.channelName) {
                                newData.channelID = channelID;
                                newData.channelName = channelName;
                            }
                                                    
                            dispatch(setWatchLaterData([
                                ...watchLaterData,
                                { ...newData, views }
                            ]));
                        } catch (error) {
                            console.error(error);
                        }
                    })(); 
                }
                console.log(data);
                break;
            case "addWatchQentry":
                const isDuplicateWatchQ = watchQueue.some(entry => entry.videoId === videoCode)
               
                if (!isDuplicateWatchQ) {
                    const channelID = data.channelID;
                    const channelName = data.channelName;
                    const publishedAt = data.publishedAt;
                    const thumbnail = data.thumbnail;
                    const title = data.title;
                    const videoId = data.videoId;
                    dispatch(setWatchQueue([
                        ...watchQueue,
                        {channelID, channelName, thumbnail, title, publishedAt, videoId}
                    ]))
                }
                break;
            default:
                break;
        };
    };

    useEffect(() => {
        const newBanner = watchLaterData[0].thumbnail
        dispatch(setWatchLaterBanner(newBanner));
    }, [watchLaterData]);

    const ThreeDotClickOptions = () => {
        return (
            <div className=' w-[15rem]'>
                {mode === 'watchLater' && (
                    <div className=' flex flex-wrap gap-x-3 pl-3 py-4 hover:bg-slate-900'
                    onClick={() => handleOperations('removeFromWatchLater')}>
                        <VscTrash className=' text-2xl'/>
                        <span>Remove from watch later</span>
                    </div>
                )}
                
                {mode === 'dedicatedPlayList' && (
                    <div className=' flex flex-wrap gap-x-3 pl-3 py-4 hover:bg-slate-900'
                    onClick={() => handleOperations('addToWatchLater')}>
                        <VscTrash className=' text-2xl'/>
                        <span>Add to watch later</span>
                    </div>
                )}
                
                <div className=' flex flex-wrap gap-x-3 pl-3 py-4 hover:bg-slate-900'
                onClick={() => handleOperations('addWatchQentry')}>
                    <PiQueueFill className=' text-xl'/>
                    <span>Add to watch queue</span>
                </div>
            </div>
        )
    };

    return (
        <div className='absolute right-1 top-1/2 -translate-y-1/2 flex items-center group/dot  z-30'>
            <div className={` bg-neutral-800 items-center justify-center rounded-full w-8 h-8 relative hidden group-hover:flex group-hover/dot:bg-slate-800`}
            onClick={(e) => handleThreeDotClick(e)}>
                <BsThreeDotsVertical className='text-xl'/>

                {optionsClicked[index] && (
                    <div className=' absolute right-10 bg-slate-800 rounded-md overflow-hidden'>
                        <ThreeDotClickOptions/>
                    </div>
                )}
            </div> 
        </div>
    )
}

export default ThreeDotOptions_2;

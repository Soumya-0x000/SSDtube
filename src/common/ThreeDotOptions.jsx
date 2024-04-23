import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdOutlineWatchLater } from 'react-icons/md';
import { FaRegTrashCan } from 'react-icons/fa6';
import { PiQueueFill } from "react-icons/pi";
import { setCounting, setPlayListData } from '../store/PlayListSlice';
import { setCurrentClickIndex, setWatchQueue } from '../store/WatchQueueSlice';

const ThreeDotOptions = ({ vdoCode, optionsClicked, setOptionsClicked, index, mode, mouseEnter }) => {
    const { 
        playListData, 
        totalItemCount, 
        currentItemsCount 
    } = useSelector(state=> state.playlist)
    const { 
        watchQueue, 
        currentClickIndex, 
        totalVdo 
    } = useSelector(state=> state.watchQueue);
    const dispatch = useDispatch();
    const handleWatchLater = () => {};
    
    const handleOperations = (mode, index) => {
        switch (mode) {
            case 'removePlaylistEntry':
                const tempArr = [...playListData].filter(entry => entry.videoId !== vdoCode);
                dispatch(setPlayListData(tempArr));
                break;
            case 'removeWatchQentry':
                const tempArr1 = [...watchQueue].filter(entry => entry.videoId !== vdoCode);
                dispatch(setWatchQueue(tempArr1));
                break;
            case 'addToWatchQ':
                break;
            default:
                break
        }
    };

    useEffect(() => {
        dispatch(setCurrentClickIndex(
            currentClickIndex > watchQueue.length ? watchQueue.length : currentClickIndex
        ));
    }, [watchQueue]);
    
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
                onClick={() => handleWatchLater()}>
                    <MdOutlineWatchLater className=' text-2xl'/>
                    <span>Add to watch later</span>
                </div>
                
                {mode === 'playList' && (
                    <div className=' flex flex-wrap gap-x-3'
                    onClick={() => handleOperations('removePlaylistEntry', videoCode, index)}>
                        <FaRegTrashCan className=' text-xl'/>
                        <span>Remove from playList</span>
                    </div>
                )}
                
                {mode === 'watchQueue' && (
                    <div className=' flex flex-wrap gap-x-3'
                    onClick={() => handleOperations('removeWatchQentry', videoCode, index)}>
                        <FaRegTrashCan className=' text-xl'/>
                        <span>Remove from queue</span>
                    </div>
                )}

                {mode === 'recommended' && (
                    <div className=' flex flex-wrap gap-x-3'
                    onClick={() => handleOperations('addToWatchQ', videoCode, index)}>
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
            tempArr[index] = true;
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

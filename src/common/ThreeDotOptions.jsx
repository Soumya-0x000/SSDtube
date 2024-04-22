import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdOutlineWatchLater } from 'react-icons/md';
import { FaRegTrashCan } from 'react-icons/fa6';
import { PiQueueFill } from "react-icons/pi";

const ThreeDotOptions = ({ data, index, optionsClicked, setOptionsClicked, mode, mouseEnter }) => {
    const { playListData, playListOn } = useSelector(state=> state.playlist)
    const { isWatchQueueOn, watchQueue, watchLater } = useSelector(state=> state.watch);

    const handleOperations = () => {

    };
    
    const handleWatchLater = () => {

    };
    
    const ThreeDotClickOptions = (data, videoCode, index) => {
        return (
            <div className=' space-y-3'>
                <div className=' flex flex-wrap gap-x-3'
                onClick={() => handleWatchLater()}>
                    <MdOutlineWatchLater className=' text-2xl'/>
                    <span>Add to watch later</span>
                </div>
                
                {mode === 'playList' && (
                    <div className=' flex flex-wrap gap-x-3'
                    onClick={() => handleOperations()}>
                        <FaRegTrashCan className=' text-xl'/>
                        <span>Remove from playList</span>
                    </div>
                )}
                
                {mode === 'watchQueue' && (
                    <div className=' flex flex-wrap gap-x-3'
                    onClick={() => handleOperations()}>
                        <FaRegTrashCan className=' text-xl'/>
                        <span>Remove from queue</span>
                    </div>
                )}

                {mode === 'recommended' && (
                    <div className=' flex flex-wrap gap-x-3'
                    onClick={() => handleOperations()}>
                        <PiQueueFill className=' text-xl'/>
                        <span>Add to queue</span>
                    </div>
                )}
            </div>
        )
    };

    const handleThreeDotClick = (e, index) => {
        e.stopPropagation();
        setOptionsClicked(prevOptionsClicked => {
            const tempArr = [...prevOptionsClicked];
            tempArr[index] = !tempArr[index];
            return tempArr;
        });
    }; 

    return (
        <div className='group absolute right-1 top-1/2 -translate-y-1/2'>
            <div className={` group-hover:bg-neutral-800 ${mouseEnter ? 'flex' : 'hidden'} items-center justify-center rounded-full w-8 h-8 relative`}
            onClick={(e) => handleThreeDotClick(e, data, data?.videoId, index)}>
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

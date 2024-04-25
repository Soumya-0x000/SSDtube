import React, { useEffect, useState } from 'react'
import { MdOutlineErrorOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Img from '../../components/lazyLoadImage/Img';
import { generateRandomID, handleDayCount } from '../../utils/Constant';
import { IoIosArrowDown } from 'react-icons/io';
import { RxCross1 } from 'react-icons/rx';
import { MdPlaylistAdd } from "react-icons/md";
import { setCurrentClickIndex, setIsWatchQueueOn, setWatchQueue } from '../../store/reducers/WatchQueueSlice';
import ThreeDotOptions from '../../common/ThreeDotOptions';
import { setChannelId, setCurrentlyPlayingVdoId } from '../../store/reducers/WatchSlice';

const WatchQueueList = () => {
    const { watchQueue, totalVdo, currentClickIndex } = useSelector(state => state.watchQueue);
    const { channelID } = useSelector(state => state.watch);
    const { playListData } = useSelector(state => state.playlist);
    const [optionsClicked, setOptionsClicked] = useState(new Array(playListData.length).fill(false));
    const [mouseEnter, setMouseEnter] = useState(false);
    const [hideVids, setHideVids] = useState(false);
    const dispatch = useDispatch();

    const handleMouseLeave = () => {
        setOptionsClicked(new Array(playListData.length).fill(false))
        setMouseEnter(false);
    };
    
    const handleMouseEnter = () => {
        setMouseEnter(true)
    };

    const clearQueue = () => {
        dispatch(setWatchQueue([]));
        dispatch(setIsWatchQueueOn(false));
    };

    const handleCurrentVdo = (index, vdoId) => {
        dispatch(setCurrentClickIndex(index+1))
        dispatch(setCurrentlyPlayingVdoId(vdoId));
        channelID !== watchQueue[index].channelID && dispatch(setChannelId(watchQueue[index].channelID));
    };

    return (
        <div className='rounded-xl overflow-hidden border mb-3'>
            <div className='space-y-2 bg-neutral-800 p-3'>
                {/* Upper part */}
                <div className='relative flex items-center justify-between'>
                    <div className='text-[.84rem] space-y-1'>
                        <div 
                        className='text-[1.3rem] font-bold'>
                            Queue
                        </div>

                        <div> {currentClickIndex}/{totalVdo} </div>
                    </div>

                    {hideVids ? (
                        <IoIosArrowDown className=' hover:bg-slate-600 rounded-full cursor-pointer p-2 w-10 h-10 text-2xl' onClick={() => setHideVids(false)} />
                    ) : (
                        <RxCross1 className=' hover:bg-slate-600 rounded-full cursor-pointer p-2 w-10 h-10 text-2xl' onClick={() => setHideVids(true)} />
                    )}
                </div>

                {/* Lower part */}
                <div className='flex items-center justify-between'>
                    <button className='flex items-center gap-x-1'>
                        <MdPlaylistAdd className=' text-2xl'/>
                        <span className=' text-sm '>
                            Save
                        </span>
                    </button>

                    <button className=' text-sm'
                    onClick={clearQueue}>
                        Clear
                    </button>
                </div>
            </div>

            {/* video part */}
            <div className={` ${hideVids ? 'hidden' : 'block'} max-h-[28rem] overflow-y-auto mt-2 `}>
                {watchQueue.map((data, index) => (
                    <div className='py-1.5 cursor-pointer hover:bg-neutral-700 pl-2 flex gap-x-3 relative group/all rounded-md'
                    key={generateRandomID()}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleCurrentVdo(index, data?.videoId)}>
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
                        <div className='mt-1 space-y-3 '>
                            <div className='line-clamp-1 w-full'>{data?.title}</div>
                            
                            <div>
                                <p className='text-gray-400 text-[.8rem]'>{data?.channelName}</p>
                                <p className='text-gray-400 text-[.8rem]'>{handleDayCount(data?.publishedAt)}</p>
                            </div>
                        </div>

                        {/* 3 dot */}
                        <ThreeDotOptions
                            vdoCode={data?.videoId}
                            optionsClicked={optionsClicked}
                            setOptionsClicked={setOptionsClicked}
                            index={index}
                            mode={`watchQueue`}
                            mouseEnter={mouseEnter}
                            data={data}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WatchQueueList
import React, { useEffect, useState } from 'react'
import { MdOutlineErrorOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Img from '../../components/lazyLoadImage/Img';
import { generateRandomID } from '../../utils/constant';
import { IoIosArrowDown } from 'react-icons/io';
import { RxCross1, RxLoop, RxShuffle } from 'react-icons/rx';
import { SlOptionsVertical } from 'react-icons/sl';
import { MdPlaylistAdd } from "react-icons/md";
import { setIsWatchQueueOn, setWatchQueue } from '../../store/WatchQueueSlice';
import ThreeDotOptions from '../../common/ThreeDotOptions';

const WatchQueueList = () => {
    const {watchQueue} = useSelector(state => state.watchQueue);
    const {playListData} = useSelector(state => state.playlist);
    const [optionsClicked, setOptionsClicked] = useState(new Array(playListData.length).fill(false));
    const [mouseEnter, setMouseEnter] = useState(false);
    const [hideVids, setHideVids] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        console.log(watchQueue);
    }, []);

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
        // setCurrentVdoCount(index+1)
        // dispatch(setCurrentlyPlayingVdoId(vdoId));
        // dispatch(setCounting({currentCount: index+1, totalCount: playListData.length }))
    };

    return (
        <div className='bg-neutral-900 rounded-lg overflow-hidden mb-2'>
            <div className='space-y-2 bg-neutral-800 px-3 py-3'>
                {/* Upper part */}
                <div className='relative flex items-center justify-between'>
                    <div className='text-[.84rem] space-y-1'>
                        <div 
                        className='text-[1.3rem] font-bold'>
                            Queue
                        </div>

                        {/* <p><Link to={`/channel/${channelID}`}>{channelName}</Link> - {currentItemsCount}/{totalItemCount}</p> */}
                    </div>

                    {hideVids ? (
                        <IoIosArrowDown className=' hover:bg-slate-600 rounded-full cursor-pointer p-2 w-10 h-10 text-2xl' onClick={() => setHideVids(false)} />
                    ) : (
                        <RxCross1 className=' hover:bg-slate-600 rounded-full cursor-pointer p-2 w-10 h-10 text-2xl' onClick={() => setHideVids(true)} />
                    )}
                </div>

                {/* Lower part */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-x-1'>
                        <MdPlaylistAdd className=' text-2xl'/>
                        <p className=' text-sm'>
                            Save
                        </p>
                    </div>
                    <button className=' text-sm'
                    onClick={clearQueue}>
                        Clear
                    </button>
                </div>
            </div>

            <div className={` ${hideVids ? 'hidden' : 'block'} max-h-[28rem] overflow-y-auto mt-2 `}>
                {watchQueue.map((data, index) => (
                    <div className='py-1.5 cursor-pointer hover:bg-neutral-700 pl-2 flex gap-x-3 relative group/all'
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
                            <div className='line-clamp-2 w-full'>{data?.title}</div>
                            <p className='text-gray-400 text-[.8rem]'>{data?.channelName}</p>
                        </div>

                        {/* 3 dot */}
                        <ThreeDotOptions
                            data={data}
                            index={index}
                            optionsClicked={optionsClicked}
                            setOptionsClicked={setOptionsClicked}
                            mode={`watchQueue`}
                            mouseEnter={mouseEnter}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WatchQueueList
import React, { useState } from 'react'
import { MdOutlineErrorOutline } from 'react-icons/md';
import { useSelector } from 'react-redux';
import Img from '../../components/lazyLoadImage/Img';
import { generateRandomID } from '../../utils/constant';
import { IoIosArrowDown } from 'react-icons/io';
import { RxCross1, RxLoop, RxShuffle } from 'react-icons/rx';
import { SlOptionsVertical } from 'react-icons/sl';

const WatchQueueList = () => {
    const {watchQueue} = useSelector(state => state.watchQueue);
    const {playListData} = useSelector(state => state.playlist);
    const [optionsClicked, setOptionsClicked] = useState(new Array(playListData.length).fill(false));
    const [mouseEnter, setMouseEnter] = useState(false);
    const [hideVids, setHideVids] = useState(false);

    const handleMouseLeave = () => {
        setOptionsClicked(new Array(playListData.length).fill(false))
        setMouseEnter(false);
    };
    
    const handleMouseEnter = () => {
        setMouseEnter(true)
    };

    return (
        <>
            <div className='space-y-2 bg-neutral-800 px-3 py-3'>
                {/* Upper part */}
                <div className='relative flex items-center justify-between'>
                    <div className='text-[.84rem] space-y-1'>
                        <div 
                        className='text-[1.3rem] font-bold'>
                            Queue
                        </div>
                        <p><Link to={`/channel/${channelID}`}>{channelName}</Link> - {currentItemsCount}/{totalItemCount}</p>
                    </div>

                    {hideVids ? (
                        <IoIosArrowDown className=' hover:bg-slate-600 rounded-full cursor-pointer p-2 w-10 h-10 text-2xl' onClick={() => setHideVids(false)} />
                    ) : (
                        <RxCross1 className=' hover:bg-slate-600 rounded-full cursor-pointer p-2 w-10 h-10 text-2xl' onClick={() => setHideVids(true)} />
                    )}
                </div>

                {/* Lower part */}
                <div className='flex items-center justify-between'>
                    <div className='flex text-2xl items-center gap-x-5'>
                        <RxLoop/>
                        <RxShuffle/>
                    </div>
                    <SlOptionsVertical className=' text-xl'/>
                </div>
            </div>

            <div className={` ${hideVids ? 'hidden' : 'block'} max-h-[28rem] overflow-y-auto mt-2`}>
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
                        <div className=' space-y-2 '>
                            <div className='line-clamp-1 w-full'>{data?.title}</div>
                            <p className='text-gray-400 text-[.8rem]'>{channelName}</p>
                        </div>

                        {/* 3 dot */}
                        {/* <div className='group absolute right-1 top-1/2 -translate-y-1/2'>
                            <div className=' group-hover:bg-neutral-800 hidden group-hover/all:flex items-center justify-center rounded-full w-8 h-8 relative'
                            onClick={(e) => handleThreeDotClick(e, data, data?.videoId, index)}>
                                <BsThreeDotsVertical className='text-xl'/>

                                {optionsClicked[index] && (
                                    <div className=' absolute right-10 w-[14rem] bg-slate-800 z-50 pl-3 py-3 rounded-md'>
                                        <ThreeDotClickOptions/>
                                    </div>
                                )}
                            </div>
                        </div> */}
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
        </>
    )
}

export default WatchQueueList
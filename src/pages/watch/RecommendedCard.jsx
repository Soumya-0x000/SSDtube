import React, { useEffect, useState } from 'react'
import Img from '../../components/lazyLoadImage/Img'
import { BASE_URL, YOUTUBE_API_KEY, convertViews, handleDayCount } from '../../utils/constant'
import axios from 'axios';
import { BsDot } from "react-icons/bs";

const RecommendedCard = ({item, index}) => {
    // console.log(item?.snippet?.type)
    return (
        <div className='hover:bg-neutral-700 cursor-pointer rounded-lg '>
            <div className=' flex gap-x-3'>
                <div className='min-w-[11rem] max-w-[11rem] lg:min-w-[10rem] lg:max-w-[10rem] h-[6rem] rounded-lg overflow-hidden '>
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
                </div>

                <div className=' mt-1 lg:mt-3'>
                    <p className=' line-clamp-1 lg:line-clamp-2 lg:text-[14px] xl:text-md'>
                        {item?.snippet?.title}
                    </p>

                    <div className=' line-clamp-1 text-[.75rem] text-gray-400 flex items-center gap-x-2 mt-2'>
                        {item?.snippet?.channelTitle} 
                        <div className=' h-4 w-4'>
                            <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false" style={{ display: 'block' }}>
                                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z" fill='gray'></path>
                            </svg>
                        </div>
                    </div>

                    <div className=' flex items-center line-clamp-1 text-[.75rem] text-gray-400 mt-1'>
                        <div className=''>
                            {convertViews(item?.viewCount)} views
                        </div>                        

                        <BsDot/>

                        <p className=''>
                            {handleDayCount(item?.snippet?.publishedAt)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecommendedCard;

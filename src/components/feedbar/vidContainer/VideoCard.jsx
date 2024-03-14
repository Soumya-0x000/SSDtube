import React, { useEffect, useState } from 'react'
import Img from '../../lazyLoadImage/Img';
import { Link } from 'react-router-dom';
import { GoDotFill } from "react-icons/go";
import { getChannelInfo } from '../../../utils/Hooks';
import { convertViews, handleDayCount } from '../../../utils/constant';

const VideoCard = ({item, indx}) => {
    const [logoURL, setLogoURL] = useState('');

    const handleLogoURL = async (id) => {
        const channelData = await getChannelInfo(id);
        const channelLogoUrl = channelData?.data?.items[0]?.snippet?.thumbnails?.medium?.url
        setLogoURL(channelLogoUrl)
    };

    useEffect(() => {
        handleLogoURL(item?.snippet?.channelId)
    }, [])

    return (
        <div className=' flex flex-col gap-y-2 ml-1 mb-1 '
        key={indx}>
            <Link to={`/watch/${item?.id}`}>
                <div className=' max-h-[15rem] overflow-hidden rounded-md'>
                    <Img
                        className={` h-full w-full`}
                        src={item?.snippet?.thumbnails?.maxres?.url || item?.snippet?.thumbnails?.medium?.url}
                    />
                </div>
            </Link>

            {/* details */}
            <div className='flex gap-x-2'>
                <Link to={`/channel/${item?.snippet?.channelId}`}>
                    <div 
                    className=' w-9 h-9 rounded-full overflow-hidden bg-cover bg-center z-20 shadow-2xl shadow-red-200'>
                        <Img
                            className="object-contain bg-cover bg-center"
                            src={logoURL}
                        />
                    </div>
                </Link>
                
                <Link to={`/watch/${item?.id}`} className='w-full'>
                    <div className='flex flex-col w-full pt-[.2rem]'>
                        <div className='w-[88%] font-bold text-[.9rem] line-clamp-2'>
                            {item?.snippet?.title}
                        </div>

                        <div className='flex items-center gap-x-2 w-[70%] pt-[.3rem] text-sm text-gray-400 '>
                            {item?.snippet?.channelTitle}
                            <div className=' h-4 w-4'>
                                <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false" style={{ display: 'block' }}>
                                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z" fill='gray'></path>
                                </svg>
                            </div>
                        </div>

                        <div className=' flex items-center gap-x-1 text-[14px] text-gray-400'>
                            <div className=' text-[14px] text-gray-400'>
                                {convertViews(item?.statistics?.viewCount)} Views
                            </div>

                            <GoDotFill className='text-[10px]'/>

                            {handleDayCount(item?.snippet?.publishedAt)}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default VideoCard;

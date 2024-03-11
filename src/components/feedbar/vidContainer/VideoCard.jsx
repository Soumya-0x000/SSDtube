import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Img from '../../lazyLoadImage/Img';
import { Link } from 'react-router-dom';
import { GoDotFill } from "react-icons/go";
import { getChannelInfo } from '../../../store/Hooks';
import { setChannelData } from '../../../store/ChannelSlice';
import { convertViews, handleDayCount } from '../../../utils/constant';

const VideoCard = ({item, indx}) => {
    const receivedVideo = useSelector((state) => state.youtube.videos);
    const dispatch = useDispatch();
    const [logoURL, setLogoURL] = useState('')

    const handleWatchVideo = (id) => {
        console.log(receivedVideo.snippet.channelId)
    };

    const handleLogoURL = async (id) => {
        const channelData = await getChannelInfo(id);
        const url = channelData?.data?.items[0]?.snippet?.thumbnails?.default?.url;
        setLogoURL(url)
        dispatch(setChannelData(url))
        return url;
    };

    useEffect(() => {
        handleLogoURL(item?.snippet?.channelId)
    }, [])

    return (
        <div className=' flex flex-col gap-y-2 min-w-[7rem] ml-1 mb-1 '
        key={indx}
        onClick={() => handleWatchVideo(item?.id)}>
            {/* <Link to={`/watch/${item?.id}`}> */}
                <div className=' overflow-hidden rounded-md'>
                    <Img
                        className={``}
                        src={item?.snippet?.thumbnails?.maxres?.url}
                    />
                </div>
            {/* </Link> */}

            {/* details */}
            <div className='flex gap-x-2'>
                <Link>
                    <div className=' w-9 h-9 rounded-full overflow-hidden bg-cover bg-center'>
                        <Img
                            className="object-contain bg-cover, bg-center"
                            src={logoURL}
                        />
                    </div>
                </Link>
                
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
            </div>
        </div>
    )
}

export default VideoCard;

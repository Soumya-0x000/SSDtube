import React from 'react'
import { useSelector } from 'react-redux';
import Img from '../../lazyLoadImage/Img';
import { Link } from 'react-router-dom';

const VideoCard = () => {
    const receivedVideo = useSelector((state) => state.youtube.videos);

    const handleWatchVideo = (id) => {
        console.log(receivedVideo.snippet.channelId)
    };

    return (
        <>
            {receivedVideo.map((item, indx) => (
                <div className=' cursor-pointer flex flex-col gap-y-2 min-w-[7rem] ml-1 mb-1'
                key={indx}
                onClick={() => handleWatchVideo(item?.id)}>
                    {/* img */}
                    {/* <Link to={`/watch/${item?.id}`}> */}
                        <div className=' rounded-md overflow-hidden'>
                            <Img
                                className={` w-full h-full object-cover object-center bg-center`}
                                src={item?.snippet?.thumbnails?.maxres?.url}
                            />
                        </div>
                    {/* </Link> */}

                    {/* details */}
                    <div className='flex gap-x-2'>
                        {/* logo */}
                        <div className=' min-w-9 h-9 bg-slate-600 rounded-full'>
                            <Img
                                className="object-contain"
                            />
                        </div>
                        
                        {/* description */}
                        <div className='flex flex-col w-full pt-[.2rem]'>
                            <div className='w-[88%] font-bold text-[.9rem] truncate '>
                                {item?.snippet?.title}
                            </div>
                            <div className=' w-[70%] pt-[.3rem] text-sm text-gray-400'>
                                {item?.snippet?.channelTitle}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default VideoCard;

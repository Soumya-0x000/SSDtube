import React from 'react'
import Img from '../../components/lazyLoadImage/Img';
import { CgPlayList } from "react-icons/cg";
import { handleDayCount } from '../../utils/constant';

const PlayLists = ({itemData, index}) => {
    // console.log(itemData)
    return (
        <div className=' '>
            <div className='w-[11.5rem] lg:w-[12rem] h-[7rem] lg:h-[8rem] rounded-lg overflow-hidden relative'>
                <Img
                    className={` h-full w-full`}
                    src={
                        itemData?.snippet?.thumbnails?.maxres?.url
                        || itemData?.snippet?.thumbnails?.high?.url
                        || itemData?.snippet?.thumbnails?.medium?.url
                        || itemData?.snippet?.thumbnails?.default?.url
                        || itemData?.snippet?.thumbnails?.standard?.url
                    }
                />

                <div className=' absolute right-1 bottom-1 flex items-center bg-gray-800 text-gray-300 rounded-md p-1'>
                    <CgPlayList className=' text-xl'/>
                    <p className=' text-[.8rem]'>{itemData?.contentDetails?.itemCount} videos</p>
                </div>
            </div>

            <div className=' space-y-2 mt-2'>
                <div className=' line-clamp-1 font-bold text-sm max-w-[90%]'>
                    <p>{itemData?.snippet?.title}</p>
                </div>
                <div className=' text-gray-400 text-[.9rem]'>
                    {handleDayCount(itemData?.snippet?.publishedAt)}
                    <p className=' text-[.8rem]'>View full playlist</p>
                </div>
            </div>
        </div>
    )
}

export default PlayLists;

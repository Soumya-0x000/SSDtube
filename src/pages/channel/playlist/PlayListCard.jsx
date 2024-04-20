import React, { useEffect, useState } from 'react'
import Img from '../../../components/lazyLoadImage/Img';
import { CgPlayList } from "react-icons/cg";
import { handleDayCount } from '../../../utils/constant';
import { Link } from 'react-router-dom';
import { FaPlay } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setBannerUrl, setPlaylistID, setPlaylistName } from '../../../store/PlayListSlice';
import { setChannelId } from '../../../store/ChannelSlice';
import { setChannelId as setChannelID } from '../../../store/WatchSlice';
import { setIsPlaylistRendered } from '../../../store/WatchSlice';

const PlayListCard = ({channelID, itemData, indx, orgArr}) => {
    const [showPlayAll, setShowPlayAll] = useState(new Array(orgArr.length).fill(false));
    const dispatch = useDispatch();

    const handleMouseEntry = () => {
        const updatedArr = [...showPlayAll];
        updatedArr[indx] = true;
        setShowPlayAll(updatedArr);
    };

    const handleMouseLeave = () => {
        const updatedArr = [...showPlayAll];
        updatedArr[indx] = false;
        setShowPlayAll(updatedArr);
    }; 

    useEffect(() => {
        dispatch(setChannelId(channelID))
        dispatch(setChannelID(channelID))
    }, [])

    const handleCLick = () => {
        dispatch(setPlaylistName(itemData.snippet.title))
        dispatch(setBannerUrl(itemData?.snippet?.thumbnails?.maxres?.url
            || itemData?.snippet?.thumbnails?.high?.url
            || itemData?.snippet?.thumbnails?.medium?.url
            || itemData?.snippet?.thumbnails?.default?.url
            || itemData?.snippet?.thumbnails?.standard?.url
        ));
        dispatch(setPlaylistID(itemData?.id))
        dispatch(setIsPlaylistRendered(true));
        // console.log(itemData)
    };
    return (
        <Link to={`/watch/${itemData?.id}`}
        onMouseEnter={handleMouseEntry}
        onMouseLeave={handleMouseLeave}
        onClick={handleCLick}> 
            <div className='max- w-[20rem] sm:max-w-[17rem] md:max-w-[15rem] h-[11rem] sm:h-[9rem] rounded-lg relative '>
                <Img
                    className={` h-full w-full rounded-lg `}
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

                <div 
                    className='absolute left-1/2 -translate-x-1/2 -top-[.5rem] w-[94%] h-[4%] rounded-t-xl bg-center '
                    style={{
                        backgroundImage: `url(${
                            itemData?.snippet?.thumbnails?.maxres?.url
                            || itemData?.snippet?.thumbnails?.high?.url
                            || itemData?.snippet?.thumbnails?.medium?.url
                            || itemData?.snippet?.thumbnails?.default?.url
                            || itemData?.snippet?.thumbnails?.standard?.url
                        })`,
                        filter:'blur(80px)',
                        backdropFilter: blur,
                    }}
                />

                {showPlayAll[indx] && (
                    <div className=' absolute top-0 left-0 rounded-md bg-black w-full h-full bg-opacity-75 flex items-center justify-center text-xl'>
                        <div className=' absolute flex items-center justify-center gap-x-3 '>
                            <FaPlay/>
                            <p>Play All</p>
                        </div>
                    </div>
                )}
            </div>

            <div className=' space-y-2 mt-2'>
                <div className=' line-clamp-1 font-bold text-sm max-w-[13rem] '>
                    <p>{itemData?.snippet?.title}</p>
                </div>
                <div className=' text-gray-400 text-[.9rem]'>
                    {handleDayCount(itemData?.snippet?.publishedAt)}
                    <p className=' text-[.8rem]'>View full playlist</p>
                </div>
            </div>
        </Link>
    )
}

export default PlayListCard;

import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img';
import { FaPlay } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RxTriangleRight } from "react-icons/rx";
import { TfiControlShuffle, TfiShare } from "react-icons/tfi";
import { MdPlaylistAdd } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import { LiaDownloadSolid } from "react-icons/lia";
import { BsThreeDotsVertical } from "react-icons/bs";
import { handleDayCount } from '../../../utils/constant';

const iconTray = [
    {icon: <MdPlaylistAdd/>, fontSize: 'text-[26px]'},
    {icon: <RiShareForwardLine/>, fontSize: 'text-[24px]'},
    {icon: <LiaDownloadSolid/>, fontSize: 'text-[26px]'},
    {icon: <BsThreeDotsVertical/>, fontSize: 'text-[20px]'},
];

const DedicatedPlaylist = () => {
    const {id} = useParams();
    const {
        playListId,
        playListTitle, 
        playListData, 
        channelName, 
        playListBannerUrl,
        totalItemCount,
    } = useSelector(state => state.playlist);
    console.log(playListData)
    const [showPlayAll, setShowPlayAll] = useState(false);
    const navigate = useNavigate();
    const channelID = useSelector(state => state.channel.channelId);
    const comparableHeight = 585;
    const [showBanner, setShowBanner] = useState(window.innerHeight >= comparableHeight);

    useLayoutEffect(() => {
        const handleResize = () => {
            window.innerHeight >= comparableHeight ? setShowBanner(true) : setShowBanner(false);
        }
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const PlayListAreaSideBar = () => {
        return(
            <div className=' lg:h-full flex flex-col px-[2rem] md:px-[4rem] lg:px-5 py-6 relative lg:rounded-xl overflow-hidden space-y-6 '>
                <div className=' h-[22rem] md:h-[16rem] '>
                    <>
                        <div 
                            className=' absolute top-0 left-0 h-full w-full'
                            style={{ 
                                backgroundImage: `url(${playListBannerUrl})`,
                                backgroundSize: 'cover',                    
                                filter:'blur(80px)',
                                backdropFilter: blur,
                            }}
                        />
                        <div 
                            className=' absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent via-transparent to-[#0f0f0f]'
                        />
                    </>

                    {/* content */}
                    <div className=' flex flex-col md:flex-row lg:flex-col gap-x-10 gap-y-3 md:gap-y-7'>
                        {/* Image  */}
                        {showBanner && (
                            <Link className='cursor-pointer w-[20rem] md:min-w-[24rem] lg:min-w-fit md:h-[13rem] rounded-xl overflow-hidden relative left-1/2 md:left-auto -translate-x-1/2 md:-translate-x-0 '
                            style={{
                                boxShadow: '0px 0px 37px -3px rgba(0,0,0,0.67)',
                                WebkitBoxShadow: '0px 0px 37px -3px rgba(0,0,0,0.67)',
                                MozBoxShadow: '0px 0px 37px -3px rgba(0,0,0,0.67)'
                            }}
                            // onMouseEnter={() => setShowPlayAll(true)}
                            // onMouseLeave={() => setShowPlayAll(false)}
                            to={`/playlist/${id}`}>
                                <Img
                                    className={` h-full w-full rounded-lg `}
                                    src={playListBannerUrl}
                                />

                                {showPlayAll && (
                                    <div className=' '>
                                        <div className=' absolute flex items-center justify-center gap-x-3 '>
                                            {/* <FaPlay/> */}
                                            <p>Play All</p>
                                        </div>
                                    </div>
                                )}
                            </Link>
                        )}
                        
                        {/* data */}
                        <div className='font-bold lg:mt-2 text-gray-300 md:max-w-[27rem] relative tracking-wide'>
                            <p className='text-2xl lg:text-3xl line-clamp-1 lg:line-clamp-none '>
                                {playListTitle}
                            </p>
                            
                            <div className=' flex flex-row md:flex-col justify-between'>
                                <div className=''>
                                    <p className=' font-bold text-[1.05rem] mt-6 line-clamp-1'>
                                        <Link to={`/channel/${channelID}`}>
                                            {channelName}
                                        </Link>
                                    </p>

                                    <div className='flex items-center gap-x-2 mt-1'>
                                        <p className='text-[.9rem] font-normal'>
                                            {totalItemCount} videos
                                        </p>
                                    </div>
                                </div>

                                {/* icons */}
                                <div className='flex items-center justify-between w-[11rem] lg:w-[13rem] mt-4'>
                                    {iconTray.map(icon => (
                                        <div className={` bg-[#ffffff23] w-10 h-10 rounded-full flex items-center justify-center ${icon.fontSize} hover:bg-[#ffffff3f] cursor-pointer`}>
                                            {icon.icon}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=' w-full relative flex items-center justify-between gap-x-3 mt-4 lg:mt-8'>
                        <Link 
                        className='flex items-center justify-center h-[2.6rem] rounded-full w-1/2 bg-white text-black'
                        to={`/playlist/${playListId}`}>
                            <RxTriangleRight className='text-[2.4rem]'/> Play all
                        </Link>
                        <Link 
                        className='flex items-center justify-center gap-x-3 h-[2.7rem] bg-[#ffffff1f] rounded-full w-1/2 '
                        to={`/playlist/${playListId}`}>
                            <TfiControlShuffle className='text-[1.3rem]'/> Shuffle
                        </Link>
                    </div>
                </div>
            </div>
        )
    };

    const PlayListItems = () => {
        return (
            <div className=' w-[]'>
                {playListData.map((data, index) => (
                    <div className='py-1.5 cursor-pointer hover:bg-neutral-700 hover:rounded-lg pl-2 flex gap-x-3'
                    key={data?.videoId+index}>
                        <div className=' text-[.8rem] text-gray-400 flex items-center'>
                            {index+1}
                        </div>

                        <div className='min-w-[9rem] lg:min-w-[12rem] h-[5rem] lg:h-[7rem] rounded-lg overflow-hidden'>
                            <Img
                                src={data?.thumbnail}
                                className={` w-full h-full`}
                            />
                        </div>

                        <div className=' space-y-5'>
                            <div className='line-clamp-1 w-full'>{data?.title}</div>
                            <div className=' flex gap-x-5'>
                                <p className='text-gray-400 text-[.8rem]'>{channelName}</p>
                                <p className='text-gray-400 text-[.8rem]'>{handleDayCount(data?.publishedAt)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    };

    return (
        <div className=' h-screen lg:py-2 lg:pl-2 flex flex-col lg:flex-row gap-x-3 overflow-y-auto'>
            <div className=''>
                <PlayListAreaSideBar/>
            </div>
            <div className=' w-full h-full lg:overflow-y-auto '>
                <PlayListItems/>
            </div>
        </div>
    );
}

export default DedicatedPlaylist;

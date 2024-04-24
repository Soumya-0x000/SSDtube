import React, { useEffect, useLayoutEffect, useState } from 'react'
import { RxTriangleRight } from 'react-icons/rx';
import { TfiControlShuffle } from 'react-icons/tfi';
import { useDispatch, useSelector } from 'react-redux';
import { clearWatchLaterList, setWatchLaterBanner } from '../../store/reducers/WatchLaterSlice';
import { RiShareForwardLine } from 'react-icons/ri';
import { LiaDownloadSolid } from 'react-icons/lia';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Img from '../../components/lazyLoadImage/Img';
import { Link } from 'react-router-dom';
import { FaRegTrashCan } from "react-icons/fa6";

const iconTray = [
    {icon: <RiShareForwardLine/>, fontSize: 'text-[24px]'},
    {icon: <LiaDownloadSolid/>, fontSize: 'text-[26px]'},
    {icon: <BsThreeDotsVertical/>, fontSize: 'text-[20px]'},
];

const WatchLater = () => {
    const { watchLaterData, watchLaterBanner, totalVids } = useSelector(state => state.watchLater);
    // console.log(watchLaterData)
    const dispatch = useDispatch();
    const comparableHeight = 585;
    const [showBanner, setShowBanner] = useState(window.innerHeight >= comparableHeight);
    const [isLoading, setIsLoading] = useState(true);
    const [dataFound, setDataFound] = useState(false);

    useLayoutEffect(() => {
        const handleResize = () => {
            window.innerHeight >= comparableHeight ? setShowBanner(true) : setShowBanner(false);
        }
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleClearAll = () => {
        dispatch(clearWatchLaterList([]))
    };

    const PlayListAreaSideBar = () => {
        return(
            <div className='lg:min-w-[23rem] lg:max-w-[23rem] lg:fixed lg:h-full flex flex-col px-[2rem] md:px-[4rem] lg:px-5 py-6 relative lg:rounded-xl overflow-hidden space-y-6 '>
                <div className=' h-[22rem] md:h-[16rem] '>
                    <>
                        {dataFound ? (
                            <div 
                                className='absolute top-0 left-0 h-full w-full'
                                style={{ 
                                    backgroundImage: `url(${watchLaterBanner})`,
                                    backgroundSize: 'cover',                    
                                    filter: 'blur(80px)',
                                }}
                            />
                        ) : (
                            <div className="absolute top-0 left-0 h-full w-full bg-[#4f1e8c50]" />
                        )}

                        <div 
                            className=' absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent via-transparent to-[#0f0f0f]'
                        />
                    </>
                    
                    {/* content */}
                    <>
                        {isLoading ? (
                            <>
                                <div className=' flex flex-col md:flex-row lg:flex-col gap-x-10 gap-y-3 md:gap-y-7'>
                                    {/* Image  */}
                                    {showBanner && (
                                        <div className=' w-[20rem] md:min-w-[24rem] lg:min-w-fit h-[13rem] lg:h-[11rem] rounded-xl overflow-hidden relative left-1/2 md:left-auto -translate-x-1/2 md:-translate-x-0 bg-slate-600 animate-pulse '
                                        style={{
                                            boxShadow: '0px 0px 37px -3px rgba(0,0,0,0.67)',
                                            WebkitBoxShadow: '0px 0px 37px -3px rgba(0,0,0,0.67)',
                                            MozBoxShadow: '0px 0px 37px -3px rgba(0,0,0,0.67)'
                                        }}/>  
                                    )}
                                    
                                    {/* data */}
                                    <div className='font-bold lg:mt-2 text-white md:max-w-[27rem] relative tracking-wide'>
                                        <p className=' w-full h-7 bg-slate-600 rounded-md animate-pulse'/>
                                        
                                        <div className=' flex flex-row md:flex-col justify-between'>
                                            <div className=''>
                                                <p className=' w-[40%] h-4 bg-slate-600 animate-pulse rounded-[3px] mt-6'/>

                                                <p className=' w-[30%] h-4 bg-slate-600 animate-pulse rounded-[3px] mt-1'/>
                                            </div>

                                            {/* icons */}
                                            <div className='flex items-center gap-x-3 mt-4'>
                                                {iconTray.map((icon, index) => (
                                                    <div className={` bg-slate-600 animate-pulse w-10 h-10 rounded-full`}
                                                    key={index + icon.fontSize}/>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className=' w-full relative flex items-center justify-between gap-x-3 mt-4 lg:mt-8'>
                                    <div 
                                    className='h-[2.6rem] rounded-full w-1/2 bg-slate-600 animate-pulse'/>
                                    <div 
                                    className='h-[2.6rem] rounded-full w-1/2 bg-slate-600 animate-pulse'/>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* upper part */}
                                <div className=' flex flex-col md:flex-row lg:flex-col gap-x-10 gap-y-3 md:gap-y-7'>
                                    {/* Image  */}
                                    {showBanner && (
                                        <div className='cursor-pointer w-[20rem] md:min-w-[24rem] lg:min-w-fit rounded-xl overflow-hidden relative left-1/2 md:left-auto -translate-x-1/2 md:-translate-x-0 '
                                        style={{
                                            boxShadow: '0px 0px 37px -3px rgba(0,0,0,0.67)',
                                            WebkitBoxShadow: '0px 0px 37px -3px rgba(0,0,0,0.67)',
                                            MozBoxShadow: '0px 0px 37px -3px rgba(0,0,0,0.67)'
                                        }}>
                                            {dataFound && (
                                                <Img
                                                    className={` h-full w-full rounded-lg `}
                                                    src={watchLaterBanner}
                                                />
                                            )}
                                        </div>    
                                    )}
                                    
                                    {/* data */}
                                    <div className='font-bold lg:mt-2 text-white md:max-w-[27rem] relative tracking-wide'>
                                        <p className='text-2xl lg:text-3xl line-clamp-1 lg:line-clamp-none '>
                                            Watch Later
                                        </p>
                                        
                                        <div className=' flex flex-row md:flex-col justify-between'>
                                            {/* channel title and video count */}
                                            <div className=''>
                                                <p className=' font-bold text-[1.05rem] mt-6 line-clamp-1'>
                                                    <Link to={`/`}>
                                                        Soumya Sankar Das
                                                    </Link>
                                                </p>

                                                <div className='flex items-center gap-x-2 mt-1'>
                                                    <p className='text-[.9rem] font-normal'>
                                                        {totalVids} videos
                                                    </p>
                                                </div>
                                            </div>

                                            {/* icons */}
                                            <div className='flex items-center gap-x-3 mt-4'>
                                                {iconTray.map((icon, index) => (
                                                    <div className={` bg-[#ffffff23] w-10 h-10 rounded-full flex items-center justify-center ${icon.fontSize} hover:bg-[#ffffff3f] cursor-pointer`}
                                                    key={index + icon.fontSize}>
                                                        {icon.icon}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* play all & shuffle */}
                                <div className=' w-full relative flex items-center justify-between gap-x-3 mt-4 lg:mt-8'>
                                    <div 
                                    className='flex items-center justify-center h-[2.6rem] rounded-full w-1/2 bg-white text-black'>
                                        <RxTriangleRight className='text-[2.4rem]'/> Play all
                                    </div>

                                    <div 
                                    className='flex items-center justify-center gap-x-3 h-[2.7rem] bg-[#ffffff1f] rounded-full w-1/2 '>
                                        <TfiControlShuffle className='text-[1.3rem]'/> Shuffle
                                    </div>
                                </div>
                                
                                {/* clear all */}
                                <Link 
                                to={`/`}
                                className='flex items-center justify-center h-[2.6rem] rounded-full w-1/2 bg-white text-black relative mt-3'
                                onClick={handleClearAll}>
                                    <FaRegTrashCan className='text-lg mr-3'/> Clear all
                                </Link>
                            </>
                        )}
                    </>
                </div>
            </div>
        )
    };
    
    useEffect(() => {
        if (watchLaterData.length > 0) {
            setDataFound(true);
            dispatch(setWatchLaterBanner(watchLaterData[0].thumbnail))
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);
    
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <div>
            <PlayListAreaSideBar/>
        </div>
    )
}

export default WatchLater;

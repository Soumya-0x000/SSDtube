import React, { useEffect, useLayoutEffect, useState } from 'react'
import { RxTriangleRight } from 'react-icons/rx';
import { TfiControlShuffle } from 'react-icons/tfi';
import { useDispatch, useSelector } from 'react-redux';
import { clearWatchLaterList, setWatchLaterBanner, setWatchLaterData } from '../../store/reducers/WatchLaterSlice';
import { RiShareForwardLine } from 'react-icons/ri';
import { LiaDownloadSolid } from 'react-icons/lia';
import { BsDot, BsThreeDotsVertical } from 'react-icons/bs';
import Img from '../../components/lazyLoadImage/Img';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegTrashCan } from "react-icons/fa6";
import { setCurrentlyPlayingVdoId } from '../../store/reducers/WatchSlice';
import { MdOutlineErrorOutline, MdOutlineSort } from 'react-icons/md';
import { convertViews, handleDayCount } from '../../utils/Constant';

const iconTray = [
    {icon: <RiShareForwardLine/>, fontSize: 'text-[24px]'},
    {icon: <LiaDownloadSolid/>, fontSize: 'text-[26px]'},
    {icon: <BsThreeDotsVertical/>, fontSize: 'text-[20px]'},
];

const sortOptions = [
    {key: 'newestFirst', text: 'Date added (newest)'},
    {key: 'oldestFirst', text: 'Last video added'},
    {key: 'most', text: 'Most popular Video'},
    {key: 'least', text: 'Least popular Video'},
]

const WatchLater = () => {
    const { 
        watchLaterData, 
        watchLaterBanner, 
        totalVids 
    } = useSelector(state => state.watchLater);

    const dispatch = useDispatch();
    const comparableHeight = 585;
    const [showBanner, setShowBanner] = useState(window.innerHeight >= comparableHeight);
    const [isLoading, setIsLoading] = useState(true);
    const [dataFound, setDataFound] = useState(false);
    const [showSortOption, setShowSortOption] = useState(false);
    const [activeSortOption, setActiveSortOption] = useState({
        newestFirst: false,
        oldestFirst: false,
        most: false,
        least: false,
    });
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
                                <div 
                                className='lg:hidden block h-[2.6rem] rounded-full w-1/2 bg-slate-600 animate-pulse lg:mt-3'/>
                            </div>

                            <div 
                            className='hidden lg:block h-[2.6rem] rounded-full w-1/2 bg-slate-600 animate-pulse lg:mt-3'/>
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

                                            <div className='flex items-center gap-x-5 mt-1'>
                                                <p className='text-[.9rem] font-normal'>
                                                    {totalVids} videos
                                                </p>

                                                <p className=' font-light text-[.9rem]'>No views</p>
                                            </div>
                                        </div>

                                        {/* icons */}
                                        <div className='flex items-center gap-x-3 mt-4'>
                                            {iconTray.map((icon, index) => (
                                                <div className={` bg-[#ffffff23] w-10 h-10 rounded-full flex items-center justify-center ${icon.fontSize} hover:bg-[#ffffff3f] cursor-pointer shadow-md shadow-[#07070756]`}
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
                                <div className='flex items-center justify-center h-[2.6rem] rounded-full w-1/2 bg-white text-black shadow-md shadow-[#07070756]'>
                                    <RxTriangleRight className='text-[2.4rem]'/> Play all
                                </div>

                                <div className='flex items-center justify-center gap-x-3 h-[2.7rem] bg-[#ffffff1f] shadow-md shadow-[#07070756] rounded-full w-1/2 '>
                                    <TfiControlShuffle className='text-[1.3rem]'/> Shuffle
                                </div>

                                <Link 
                                to={`/`}
                                className='lg:hidden flex items-center justify-center h-[2.6rem] rounded-full w-1/2 bg-white text-black shadow-md shadow-[#07070756] relative lg:mt-3'
                                onClick={handleClearAll}>
                                    <FaRegTrashCan className='text-lg mr-3'/> Clear all
                                </Link>
                            </div>
                            
                            {/* clear all */}
                            <Link 
                            to={`/`}
                            className='hidden lg:flex items-center justify-center h-[2.6rem] rounded-full w-1/2 bg-white text-black shadow-md shadow-[#07070756] relative mt-3'
                            onClick={handleClearAll}>
                                <FaRegTrashCan className='text-lg mr-3'/> Clear all
                            </Link>
                        </>
                    )}
                </div>
            </div>
        )
    };
    
    useEffect(() => {
        if (watchLaterData.length > 0) {
            setDataFound(true);
            dispatch(setWatchLaterBanner(watchLaterData[0].thumbnail))
        }

        const updatedWatchLaterData = watchLaterData.map(item => {
            if (item.hasOwnProperty('description')) {
                const { description, ...updatedItem } = item;
                return updatedItem;
            }
            return item;
        });
        dispatch(setWatchLaterData(updatedWatchLaterData));

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);
    
        return () => clearTimeout(timer);
    }, []);
    
    const handleCurrentVdo = (index, vdoId) => {
        dispatch(setCurrentlyPlayingVdoId(vdoId));
    };

    const sortContents = (sortType) => {
        let sortedContents = [...watchLaterData];
    
        switch (sortType) {
            case 'newestFirst':
                sortedContents.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
                break;
            case 'oldestFirst':
                sortedContents.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
                break;
            case 'most':
                sortedContents.sort((a, b) => b.views - a.views);
                break;
            case 'least':
                sortedContents.sort((a, b) => a.views - b.views);
                break;
            default:
                break;
        }
    
        dispatch(setWatchLaterData(sortedContents));
        setActiveSortOption(sortType)
    };
    
    return (
        <div 
        className=' h-screen lg:py-2 lg:pl-2 flex flex-col lg:flex-row gap-x-3 w-full'>
            <div className='lg:min-w-[23rem] lg:max-w-[23rem] ' >
                <PlayListAreaSideBar/>
            </div>
                
            {isLoading ? ( 
                <div className=' w-full h-full'>
                    {[...Array(8)].map((val, indx) => (
                        <div className='py-1.5 cursor-pointer hover:bg-neutral-700 hover:rounded-lg pl-2 flex gap-x-3'
                        key={indx}>
                            <div className=' text-[.8rem] text-gray-400 flex items-center'>
                                <span className='bg-slate-400 h-3 w-3 flex items-center animate-pulse rounded-full'/>
                            </div>

                            <div className='min-w-[9rem] lg:min-w-[11rem] max-w-[11rem] h-[5rem] lg:min-h-[6rem] lg:max-h-[6rem] rounded-lg overflow-hidden bg-slate-600 animate-pulse'>
                            </div>

                            <div className=' space-y-3 lg:space-y-5 mt-2'>
                                <div className='min- w-[20rem] h-[1rem] bg-slate-600 rounded-full animate-pulse'/>

                                <div className=' flex items-center gap-x-1'>
                                    <p className='min-w-10 max-w-24 h-[10px] bg-slate-600 rounded-full animate-pulse'/>

                                    <BsDot className=' animate-pulse text-lg text-slate-600'/>

                                    <p className='min-w-16 max-w-28 h-[10px] bg-slate-600 rounded-full animate-pulse'/>

                                    <BsDot className=' animate-pulse text-lg text-slate-600'/>

                                    <p className='min-w-14 max-w-24 h-[10px] bg-slate-600 rounded-full animate-pulse'/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className=' w-full'>
                    <div className={`flex items-center gap-x-2 cursor-pointer hover:bg-slate-800 ${showSortOption && 'bg-slate-800'} rounded-lg  px-3 py-1 relative w-fit`}
                    onClick={() => setShowSortOption(!showSortOption)}>
                        <MdOutlineSort className=' text-2xl' />
                        <p>Sort By</p>

                        {showSortOption && (
                            <div className={`z-20 absolute top-9 left-0 bg-neutral-800 rounded-lg overflow-hidden flex flex-col items-center justify-between w-[12rem] text-[1rem]`}>
                                {sortOptions.map((data, i) => (
                                    <button className={`w-full ${activeSortOption[data.key] && ' bg-slate-600'} hover:bg-gray-700 active:scale-105 transition-all py-3`}
                                    key={i + data.key}
                                    onClick={() => sortContents(data.key)} >
                                        {data.text}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {watchLaterData.map((data, index) => ( 
                        <Link className='py-1.5 cursor-pointer hover:bg-neutral-700 hover:rounded-lg px-2 flex gap-x-3'
                        key={data?.videoId+index}
                        to={`/watch/${data?.videoId}`}
                        onClick={() => handleCurrentVdo(index, data?.videoId)}>
                            <div className=' text-[.8rem] text-gray-400 flex items-center'>
                                {index+1}
                            </div>

                            <div className='min-w-[9rem] lg:min-w-[11rem] max-w-[11rem] h-[5rem] lg:min-h-[6rem] lg:max-h-[6rem] rounded-lg overflow-hidden'>
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
                            
                            <div className=' space-y-3 lg:space-y-5 mt-2'>
                                <div className='line-clamp-1 w-full lg:text-md'>{data?.title}</div>

                                <div className=' flex items-center gap-x-1'>
                                    <Link className='text-gray-400 z-10 text-[.8rem] line-clamp-1'
                                    to={`/channel/${data?.channelID}`}>
                                        {data?.channelName}
                                    </Link>

                                    <BsDot/>

                                    <p className='text-gray-400 text-[.8rem] line-clamp-1'>
                                        {convertViews(data?.views)} views
                                    </p>

                                    <BsDot/>

                                    <p className='text-gray-400 text-[.8rem] line-clamp-1'>
                                        {handleDayCount(data?.publishedAt)}
                                    </p>
                                </div>
                            </div>
                        </Link> 
                    ))}
                </div>
            )}
        </div>
    )
}

export default WatchLater;

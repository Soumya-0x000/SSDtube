import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getChannelInfo } from '../../utils/Hooks';
import { setChannelData } from '../../store/ChannelSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL, YOUTUBE_API_KEY, convertViews, handleDayCount } from '../../utils/constant';
import { LuDot } from "react-icons/lu";
import { FaChevronRight } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import axios from 'axios';
import ChannelTopBarSkeleton from './ChannelTopbarSkeleton';
import PlayListSection from './playlist/PlayListSection';

const channelNavBar = [
    {text: 'Home',},
    {text: 'Videos',},
    {text: 'Shorts',},
    {text: 'Live',},
    {text: 'Podcasts',},
    {text: 'Playlists',},
    {text: 'Community',},
]

const Channel = () => {
    const {id} = useParams();
    const channelContent = useSelector((state) => state.channel)
    const dispatch = useDispatch();

    const comparableWidth = [702, 480]
    const [showDescription, setShowDescription] = useState(false);
    const [showLogo, setShowLogo] = useState(window.innerWidth > comparableWidth[0]);
    const [statisticsAlignment, setStatisticsAlignment] = useState(window.innerWidth > comparableWidth[1]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [navOption, setNavOption] = useState(new Array(channelNavBar.length).fill(false));
    const [selectedNavOption, setSelectedNavOption] = useState('');
    const bannerImg = "https://th.bing.com/th/id/R.0baf5d926ccc430f3f5b6d2784f66719?rik=0n2Q89M1ZGp06g&riu=http%3a%2f%2fwallpaperswide.com%2fdownload%2frazer_gaming_background-wallpaper-3840x1200.jpg&ehk=FZeOVqMwjUIfg3Ft8RjvdfEtXJE5MDRw1HCb%2fvNV3YM%3d&risl=&pid=ImgRaw&r=0";
    const defaultNavOption = 'Playlists';

    useLayoutEffect(() => {
        const handleResize = () => {
            setShowLogo(window.innerWidth > comparableWidth[0] ? true : false);
            setStatisticsAlignment(window.innerWidth > comparableWidth[1] ? true : false);
        };
        handleResize();

        window.addEventListener('resize', handleResize);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handleChannelData = async (channelId) => {
        const channelData = await getChannelInfo(channelId);
        setIsLoaded(channelData?.status === 200)

        const title = channelData?.data?.items[0]?.snippet?.localized?.title;
        const description = channelData?.data?.items[0]?.snippet?.localized?.description;
        const subscribers = channelData?.data?.items[0]?.statistics?.subscriberCount;
        const videoCount = channelData?.data?.items[0]?.statistics?.videoCount;
        const viewCount = channelData?.data?.items[0]?.statistics?.viewCount;
        const url = channelData?.data?.items[0]?.snippet?.thumbnails?.high?.url 
                    || channelData?.data?.items[0]?.snippet?.thumbnails?.medium?.url 
                    || channelData?.data?.items[0]?.snippet?.thumbnails?.default?.url;
        const customUrl = channelData?.data?.items[0]?.snippet?.customUrl;
        const creationTime = channelData?.data?.items[0]?.snippet?.publishedAt;
        dispatch(setChannelData({
            title, description,  subscribers, videoCount, viewCount, url, customUrl, creationTime
        }));
    };

    const handleChannelSection = async() => {
        const CHANNEL_SECTION = `${BASE_URL}/channelSections?part=snippet%2CcontentDetails&channelId=${id}&key=${YOUTUBE_API_KEY}`;

        try {
            const channelSection = await axios.get(CHANNEL_SECTION);
            console.log(channelSection?.data?.items)
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectedNavOption = (index) => {
        const updatedNavOption = new Array(channelNavBar.length).fill(false);
        updatedNavOption[index] = true;
        setNavOption(updatedNavOption);
        setSelectedNavOption(channelNavBar[index].text)
    }

    useEffect(() => {
        const selectDefaultNavOption = channelNavBar.findIndex((item) => item.text === defaultNavOption);
        handleSelectedNavOption(selectDefaultNavOption);
        handleChannelData(id);
        // handleChannelSection()
    }, []);

    return (
        <div className='flex flex-col items-center px-7'>
            <div className='max-w-[1500px] space-y-4 '>
                {/* title description */}
                <div className=' space-y-4'>
                    {/* cover img */}
                    <div className=' max-w-[1500px] max-h-[14rem] rounded-lg overflow-hidden '>
                        <img src={bannerImg} className=' w-full h-auto ' />
                    </div>
                    
                    {/* content */}
                    {isLoaded ? (
                        <div className=' flex items-center gap-x-8 relative '>
                            {/* logo */}
                            {showLogo && (
                                <div className=' h-[11rem] min-w-[11rem] bg-cover bg-center rounded-full overflow-hidden '>
                                    <img src={channelContent.url} className=' h-full w-full'/>
                                </div>
                            )}
                            
                            {/* info */}
                            <div className=' flex flex-col gap-y-2  '>
                                {/* title */}
                                <div className='flex items-center gap-x-2 text-2xl xl:text-5xl font-bold'>
                                    {channelContent.title}
                                    <div className=' h-4 w-4'>
                                        <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false" style={{ display: 'block' }}>
                                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z" fill='gray'></path>
                                        </svg>
                                    </div>
                                </div>

                                {/* statistics */}
                                <div className=' text-gray-400 space-y-3 '>
                                    <div className={` flex  ${statisticsAlignment ? 'items-center flex-row' : 'flex-col gap-y-1'} gap-x-1 `}>
                                        <p>{channelContent.customUrl}</p>
                                        {statisticsAlignment && (
                                            <LuDot/>
                                        )}
                                        <p>{convertViews(channelContent.subscribers)} subscribers</p> 
                                        {statisticsAlignment && (
                                            <LuDot/>
                                        )}
                                        <p>{channelContent.videoCount} videos</p>
                                    </div>

                                    <div className=' flex items-center '>
                                        <div className='line-clamp-1 max-w-[40rem]'>
                                            {channelContent.description}
                                        </div>

                                        <button onClick={() => setShowDescription(!showDescription)}>
                                            <FaChevronRight/>
                                        </button>

                                        {showDescription && (
                                            <div className=' absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-slate-800 text-slate-200 text-justify rounded-lg flex flex-col'>
                                                <div className='p-10 relative'>
                                                    
                                                    <button className=' absolute right-0 top-0 p-2 text-xl'
                                                    onClick={()=>setShowDescription(false)} >
                                                        <RxCross1/>
                                                    </button>
                                                    {channelContent.description}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className='flex gap-x-7'>
                                        <p>Created {handleDayCount(channelContent?.creationTime)}</p>
                                        <p>{convertViews(channelContent.viewCount)} Total views</p>
                                    </div>

                                    <button className=' bg-white text-black px-5 py-2 rounded-full active:scale-95 transition-all'>
                                        Subscribe
                                    </button>
                                </div>
                                
                                {!statisticsAlignment && (
                                    <div className=' absolute right-6 top-5 -z-10 '>
                                        <div className=' h-[6rem] min-w-[6rem] bg-cover bg-center rounded-full overflow-hidden'>
                                            <img src={channelContent.url} className=' h-full w-full'/>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <ChannelTopBarSkeleton
                            statisticsAlignment={statisticsAlignment}
                        />
                    )}
                </div>
                
                {/* channel navbar */}
                <div className='sticky top-0 z-10 bg-[#0f0f0f] w-full border-b-2 border-b-gray-600 pt-3 pb-1'>
                    <div className='flex items-center justify-between max-w-[50rem]'>
                        {channelNavBar.map((item, indx) => (
                            <div 
                            onClick={() => handleSelectedNavOption(indx)}
                            className={`${navOption[indx] && 'border-b-2'} cursor-pointer h-full flex items-start justify-center`}
                            key={item.text+indx}>
                                {item.text}
                            </div>
                        ))}
                    </div>
                </div>

                {selectedNavOption === 'Playlists' && (
                    <PlayListSection isChannelContentLoaded={channelContent.isLoaded} />
                )}
            </div>
        </div>
    );
}

export default Channel;

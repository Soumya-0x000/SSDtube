import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    MdHomeFilled,
    MdSubscriptions,
    MdHistory,
    MdOutlineSmartDisplay,
    MdOutlineWatchLater,
    MdThumbUpOffAlt,
    MdSettings,
    MdOutlinedFlag,
    MdOutlineHelpOutline,
    MdOutlineFeedback,
} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { TbMusic, TbDeviceGamepad2 } from "react-icons/tb";
import { GiFilmStrip } from "react-icons/gi";
import { MdOutlineAccountBox } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaFireAlt } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { IoIosRadio } from "react-icons/io";
import { SiYoutubegaming } from "react-icons/si";
import { FaRegNewspaper } from "react-icons/fa";
import { GoTrophy } from "react-icons/go";
import { AiOutlineBulb } from "react-icons/ai";
import { GiClothes } from "react-icons/gi";
import { MdOutlinePodcasts } from "react-icons/md";

const mainLinks = [
    {
        icon: <MdHomeFilled className="text-[1.3rem]" />,
        name: "Home",
    },
    {
        icon: <SiYoutubeshorts className="text-[1.3rem]" />,
        name: "Shorts",
    },
    {
        icon: <MdSubscriptions className="text-[1.3rem]" />,
        name: "Subscriptions",
    },
];

const secondaryLinks = [
    {
        icon: <MdOutlineAccountBox className="text-[1.3rem]" />,
        name: "Your Channel",
    },
    {
        icon: <MdHistory className="text-[1.3rem]" />,
        name: "History",
    },
    {
        icon: <MdOutlineSmartDisplay className="text-[1.3rem]" />,
        name: "Your Videos",
    },
    {
        icon: <MdOutlineWatchLater className="text-[1.3rem]" />,
        name: "Watch Later",
    },
    {
        icon: <MdThumbUpOffAlt className="text-[1.3rem]" />,
        name: "Liked Videos",
    },
];

const exploreLinks = [
    {
        icon: <FaFireAlt className="text-[1.3rem]" />,
        name: "Trending",
    },
    {
        icon: <FiShoppingBag className="text-[1.3rem]" />,
        name: "Shopping",
    },
    {
        icon: <TbMusic className="text-[1.3rem]" />,
        name: "Music",
    },
    {
        icon: <GiFilmStrip className="text-[1.3rem]" />,
        name: "Films",
    },
    {
        icon: <IoIosRadio className="text-[1.3rem]" />,
        name: "Live",
    },
    {
        icon: <SiYoutubegaming className="text-[1.3rem]" />,
        name: "Gaming",
    },
    {
        icon: <FaRegNewspaper className="text-[1.3rem]" />,
        name: "News",
    },
    {
        icon: <GoTrophy className="text-[1.3rem]" />,
        name: "Sports",
    },
    {
        icon: <AiOutlineBulb className="text-[1.3rem]" />,
        name: "Learning",
    },
    {
        icon: <GiClothes className="text-[1.3rem]" />,
        name: "Fashion & Beauty",
    },
    {
        icon: <MdOutlinePodcasts className="text-[1.3rem]" />,
        name: "Podcasts",
    },
];

const moreLinks = [
    {
        icon: 
        <div className='w-7'> 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false" >
                <g fill="none" fill-rule="evenodd">
                    <g fill-rule="nonzero">
                    <path fill="#F00" d="M22.54 7.6s-.2-1.5-.86-2.17c-.83-.87-1.75-.88-2.18-.93-3.04-.22-7.6-.2-7.6-.2s-4.56-.02-7.6.2c-.43.05-1.35.06-2.18.93-.65.67-.86 2.18-.86 2.18S1.04 9.4 1 11.18v1.66c.04 1.78.26 3.55.26 3.55s.2 1.5.86 2.18c.83.87 1.9.84 2.4.94 1.7.15 7.2.2 7.38.2 0 0 4.57 0 7.6-.22.43-.05 1.35-.06 2.18-.93.65-.67.86-2.18.86-2.18s.22-1.77.24-3.55v-1.66c-.02-1.78-.24-3.55-.24-3.55z"/>
                    <path fill="#FAFAFA" d="M9.68 8.9v6.18l5.84-3.1"/>
                    </g>
                </g>
            </svg>
        </div>,
        name: "Youtube Premium",
    },
    {
        icon: 
        <div className='w-7'> 
            <svg viewBox="0 0 24 24" focusable="false">
                <path fill="red" d="M11.13 1.21c.48-.28 1.26-.28 1.74 0l8.01 4.64c.48.28.87.97.87 1.53v9.24c0 .56-.39 1.25-.87 1.53l-8.01 4.64c-.48.28-1.26.28-1.74 0l-8.01-4.64c-.48-.28-.87-.97-.87-1.53V7.38c0-.56.39-1.25.87-1.53l8.01-4.64z"/>
                <path fill="#fff" d="m12.71 18.98 4.9-2.83c.41-.24.64-.77.64-1.24V9.24c0-.47-.23-1-.64-1.24l-4.9-2.82c-.41-.23-1.02-.23-1.42 0L6.39 8c-.4.23-.64.77-.64 1.24v5.67c0 .47.24 1 .64 1.24l4.9 2.83c.2.12.46.18.71.18.26-.01.51-.07.71-.18z"/>
                <path fill="red" d="m12.32 5.73 4.89 2.83c.16.09.41.31.41.67v5.67c0 .37-.25.54-.41.64l-4.89 2.83c-.16.09-.48.09-.64 0l-4.89-2.83c-.16-.09-.41-.34-.41-.64V9.24c.02-.37.25-.58.41-.68l4.89-2.83c.08-.05.2-.07.32-.07s.24.02.32.07z"/>
                <path fill="#fff" d="M9.88 15.25 15.5 12 9.88 8.75z"/>
            </svg>
        </div>,
        name: "Youtube Studio",
    },
    {
        icon: 
        <div className='w-7'> 
            <svg viewBox="0 0 24 24" focusable="false">
                <circle fill="#FF0000" cx="12" cy="12" r="10"></circle>
                <polygon fill="#FFFFFF" points="10,14.65 10,9.35 15,12 "></polygon>
                <path fill="#FFFFFF" d="M12,7c2.76,0,5,2.24,5,5s-2.24,5-5,5s-5-2.24-5-5S9.24,7,12,7 M12,6c-3.31,0-6,2.69-6,6s2.69,6,6,6s6-2.69,6-6 S15.31,6,12,6L12,6z"></path>
            </svg>
        </div>,
        name: "Youtube Music",
    },
    {
        icon:
        <div className='w-7'> 
            <svg viewBox="0 0 24 24" focusable="false">
                <path fill="#FF0000" d="M21.39,13.19c0-0.08,0-0.15,0-0.22c-0.01-0.86-0.5-5-0.78-5.74c-0.32-0.85-0.76-1.5-1.31-1.91 c-0.9-0.67-1.66-0.82-2.6-0.84l-0.02,0c-0.4,0-3.01,0.32-5.2,0.62C9.28,5.4,6.53,5.8,5.88,6.04c-0.9,0.33-1.62,0.77-2.19,1.33 c-1.05,1.04-1.18,2.11-1.04,3.51c0.1,1.09,0.69,5.37,1.02,6.35c0.45,1.32,1.33,2.12,2.47,2.24c0.28,0.03,0.55,0.05,0.82,0.05 c1,0,1.8-0.21,2.72-0.46c1.45-0.39,3.25-0.87,6.97-0.87l0.09,0h0.02c0.91,0,3.14-0.2,4.16-2.07C21.44,15.12,21.41,13.91,21.39,13.19 z"></path>
                <path fill="#000" d="M21.99,13.26c0-0.08,0-0.16-0.01-0.24c-0.01-0.92-0.54-5.32-0.83-6.11c-0.34-0.91-0.81-1.59-1.4-2.03 C18.81,4.17,17.99,4.02,17,4l-0.02,0c-0.43,0-3.21,0.34-5.54,0.66c-2.33,0.32-5.25,0.75-5.95,1C4.53,6.01,3.76,6.48,3.16,7.08 c-1.12,1.1-1.25,2.25-1.11,3.74c0.11,1.16,0.73,5.71,1.08,6.75c0.48,1.41,1.41,2.25,2.63,2.38C6.06,19.98,6.34,20,6.63,20 c1.07,0,1.91-0.23,2.89-0.49c1.54-0.41,3.46-0.93,7.41-0.93l0.1,0h0.02c0.97,0,3.34-0.21,4.42-2.2 C22.04,15.32,22.01,14.03,21.99,13.26z M20.59,15.91c-0.82,1.51-2.75,1.68-3.56,1.68l-0.1,0c-4.09,0-6.07,0.53-7.67,0.96 C8.31,18.8,7.56,19,6.63,19c-0.25,0-0.5-0.01-0.76-0.04c-1.04-0.11-1.54-0.99-1.79-1.71c-0.3-0.88-0.91-5.21-1.04-6.53 C2.9,9.25,3.1,8.54,3.86,7.79c0.5-0.5,1.15-0.89,1.97-1.19c0.17-0.06,1.1-0.32,5.74-0.95C14.2,5.29,16.64,5.01,16.99,5 c0.83,0.02,1.43,0.13,2.17,0.69c0.43,0.32,0.79,0.86,1.06,1.58c0.22,0.58,0.76,4.78,0.77,5.77l0.01,0.25 C21.01,13.96,21.04,15.08,20.59,15.91z"></path>
                <path fill="#000" d="M11.59,14.76c-0.48,0.36-0.8,0.45-1.01,0.45c-0.16,0-0.25-0.05-0.3-0.08c-0.34-0.18-0.42-0.61-0.5-1.2l-0.01-0.1 c-0.04-0.31-0.26-2.1-0.38-3.16L9.3,9.94C9.26,9.66,9.2,9.19,9.54,8.94c0.32-0.23,0.75-0.09,0.96-0.03c0.53,0.17,3.6,1.23,4.59,1.73 c0.21,0.09,0.67,0.28,0.68,0.83c0.01,0.5-0.38,0.74-0.53,0.82L11.59,14.76z"></path>
                <path fill="#FFF" d="M10.3,9.89c0,0,0.5,4.08,0.51,4.19c0.06-0.04,3.79-2.58,3.79-2.58C13.71,11.07,11.07,10.14,10.3,9.89z"></path>
            </svg>
        </div>,
        name: "Youtube Kids",
    },
]

const helpLinks = [
    {
        icon: <MdSettings className="text-[1.3rem]" />,
        name: "Settings",
    },
    {
        icon: <MdOutlinedFlag className="text-[1.3rem]" />,
        name: "Report history",
    },
    {
        icon: <MdOutlineHelpOutline className="text-[1.3rem]" />,
        name: "Help",
    },
    {
        icon: <MdOutlineFeedback className="text-[1.3rem]" />,
        name: "Send feedback",
    },
];

const textLinks = [
    [
        "About",
        "Press",
        "Copyright",
        "Contact us",
        "Creator",
        "Advertise",
        "Developers",
    ],
    [
        "Terms",
        "Privacy",
        "Policy & Safety",
        "How YouTube works",
        "Test new features",
    ],
];

const Sidebar = () => {
    const [mainLinkBgColor, setMainLinkBgColor] = useState(Array(mainLinks.length).fill(false));
    const comparableWidth = 1312;
    const [showSideBar, setShowSideBar] = useState(window.innerWidth > comparableWidth);
    const [showPlaylist, setShowPlaylist] = useState(false)
    const [showSubscriptions, setShowSubscriptions] = useState(false)
    
    const handleMainLinkBgColor = (arr, indx) => {
        const updated = Array(arr.length).fill(false);
        updated[indx] = true;
        setMainLinkBgColor(updated);
    }
    useEffect(() => {
        mainLinkBgColor.shift()
        const updatedArr = [true, ...mainLinkBgColor]
        setMainLinkBgColor(updatedArr);
    }, [])

    useLayoutEffect(() => {
        const handleSidebarVisibility = () => {
            setShowSideBar(window.innerWidth > comparableWidth ? true : false);
        }
        handleSidebarVisibility()

        window.addEventListener('resize', handleSidebarVisibility)
        return () => window.removeEventListener('resize', handleSidebarVisibility)
    }, [])

    return (
        <div className={` ${showSideBar ? 'w-[15rem]' : 'w-[5.5rem]'} mr-2 overflow-y-auto`}>
        {/* topmost part, home shorts subscriptions */}
            <ul className={`flex flex-col ${showSideBar ? 'border-b-2 border-gray-700' : ''} pb-3`}>
                {mainLinks.map((link, index) => (
                    <a 
                    href="#" 
                    className={`hover:bg-zinc-800 rounded-lg mx-3 ${showSideBar && 'pl-3'} py-3 ${mainLinkBgColor[index] || link.name === 'Home' ? 'bg-zinc-800' : ''}`}
                    key={link.name+index}
                    // onClick={() => handleMainLinkBgColor(mainLinks, index)}
                    >
                        <li 
                        className={` ${!showSideBar && 'flex-col'} flex items-center gap-x-5`}>
                            {link.icon}
                            {!showSideBar && <span className='text-[10px] mt-1.5'>{link.name}</span>}
                            {showSideBar && (
                                <span className='text-sm tracking-wider'>
                                    {link.name}
                                </span>
                            )}
                        </li>
                    </a>
                ))}
            </ul>
            
            {showSideBar && (
                <>
                    {/* you part */}
                    <ul className='flex flex-col border-b-2 border-gray-700 py-3'>
                        <a 
                        href='#'
                        className={`hover:bg-zinc-800 rounded-lg mx-3 pl-3 py-3 text-lg flex items-center gap-x-3`}>
                            You
                            <FaChevronRight className='text-sm'/>
                        </a>

                        {secondaryLinks.map((link, index) => (
                            <a 
                            href="#" 
                            className={`hover:bg-zinc-800 rounded-lg mx-3 pl-3 py-3 `}
                            // onClick={() => handleMainLinkBgColor(mainLinks, index)}
                            key={link.name+index}>
                                <li 
                                className='flex items-center gap-x-5'>
                                    {link.icon}
                                    {showSideBar && (
                                        <span className='text-sm tracking-wider'>
                                            {link.name}
                                        </span>
                                    )}
                                </li>
                            </a>
                        ))}

                        {showPlaylist && (
                            <ul className='flex flex-col py-3'>
                                {exploreLinks.map((link, index) => (
                                    <a 
                                    href="#" 
                                    className={`hover:bg-zinc-800 rounded-lg mx-3 pl-3 py-3 `}
                                    // onClick={() => handleMainLinkBgColor(mainLinks, index)}
                                    key={link.name+index}>
                                        <li 
                                        className='flex items-center gap-x-5'>
                                            {link.icon}
                                            {showSideBar && (
                                                <span className='text-sm tracking-wider'>
                                                    {link.name}
                                                </span>
                                            )}
                                        </li>
                                    </a>
                                ))}
                            </ul>
                        )}

                        <span 
                        className={`hover:bg-zinc-800 rounded-lg mx-3 pl-3 py-3 text- flex items-center gap-x-3 cursor-pointer`}
                        onClick={() => setShowPlaylist(!showPlaylist)}>
                            {!showPlaylist ? (
                                <FaChevronDown 
                                    className='text-sm'
                                />
                            ) : (
                                <FaChevronUp 
                                    className='text-sm'
                                />
                            )}
                            {showPlaylist ? 'Hide' : 'Show'} playlists
                        </span>
                    </ul>
                    
                    {/* subscriptions part */}
                    <ul className='flex flex-col border-b-2 border-gray-700 py-3'>
                        <p 
                        className={` mx-3 pl-3 flex items-center`}>
                            Subscriptions
                        </p>

                        <span 
                        className={`hover:bg-zinc-800 rounded-lg mx-3 pl-3 py-3 text- flex items-center gap-x-3 cursor-pointer`}
                        onClick={() => setShowSubscriptions(!showSubscriptions)}>
                            {!showSubscriptions ? (
                                <FaChevronDown 
                                    className='text-sm'
                                />
                            ) : (
                                <FaChevronUp 
                                    className='text-sm'
                                />
                            )}
                            {showPlaylist ? 'Hide' : 'Show'} 100 more
                        </span>
                    </ul>

                    {/* explore part */}
                    <ul className='flex flex-col border-b-2 border-gray-700 py-3'>
                        <span className={`mx-3 pl-3 pt-3 `}>Explore</span>
                        {exploreLinks.map((link, index) => (
                            <a 
                            href="#" 
                            className={`hover:bg-zinc-800 rounded-lg mx-3 pl-3 py-3 `}
                            // onClick={() => handleMainLinkBgColor(mainLinks, index)}
                            key={link.name+index}>
                                <li 
                                className='flex items-center gap-x-5'>
                                    {link.icon}
                                    {showSideBar && (
                                        <span className='text-sm tracking-wider'>
                                            {link.name}
                                        </span>
                                    )}
                                </li>
                            </a>
                        ))}
                    </ul>

                    {/* more from youtube */}
                    <ul className={`flex flex-col ${showSideBar ? 'border-b-2 border-gray-700' : ''} pb-3`}>
                        <span className={`mx-3 pl-3 pt-3 `}>More from YouTube</span>
                        {moreLinks.map((link, index) => (
                            <a 
                            href="#" 
                            className={`hover:bg-zinc-800 rounded-lg mx-3 pl-3 py-3 `}
                            // onClick={() => handleMainLinkBgColor(mainLinks, index)}
                            key={link.name+index}>
                                <li 
                                className='flex items-center gap-x-5'>
                                    {link.icon}
                                    {showSideBar && (
                                        <span className='text-sm tracking-wider'>
                                            {link.name}
                                        </span>
                                    )}
                                </li>
                            </a>
                        ))}
                    </ul>

                    {/* settings report help feedback */}
                    <ul className='flex flex-col border-b-2 border-gray-700 py-3'>
                        {helpLinks.map((link, index) => (
                            <a 
                            href="#" 
                            className={`hover:bg-zinc-800 rounded-lg mx-3 pl-3 py-3 `}
                            // onClick={() => handleMainLinkBgColor(mainLinks, index)}
                            key={link.name+index}>
                                <li 
                                className='flex items-center gap-x-5'>
                                    {link.icon}
                                    {showSideBar && (
                                        <span className='text-sm tracking-wider'>
                                            {link.name}
                                        </span>
                                    )}
                                </li>
                            </a>
                        ))}
                    </ul>

                    {/* 1st text links */}
                    <ul className='flex flex-wrap text-[13px] px-3 pt-6 gap-x-2 gap-y-2 '>
                        {textLinks[0].map((name, index) => (
                            <li key={name+index}>
                                {showSideBar && (
                                    <span className=' tracking-wider'>
                                        {name}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                    
                    {/* 2nd text links */}
                    <ul className='flex flex-wrap text-[13px] px-3 pt-9 pb-6 gap-x-2 gap-y-2 '>
                        {textLinks[1].map((name, index) => (
                            <li key={name+index}>
                                {showSideBar && (
                                    <span className=' tracking-wider'>
                                        {name}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>

                    <span className="px-4 pb-6 text-sm text-zinc-400">Made by Soumya with 💝</span>
                </>
            )}
        </div>
    );
}

export default Sidebar

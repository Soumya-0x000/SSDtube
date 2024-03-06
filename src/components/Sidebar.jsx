import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    MdHomeFilled,
    MdSubscriptions,
    MdOutlineVideoLibrary,
    MdHistory,
    MdOutlineSmartDisplay,
    MdOutlineWatchLater,
    MdThumbUpOffAlt,
    MdSettings,
    MdOutlinedFlag,
    MdOutlineHelpOutline,
    MdOutlineFeedback,
    MdOutlineSportsVolleyball,
} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { TbMusic, TbDeviceGamepad2 } from "react-icons/tb";
import { FaRegCompass } from "react-icons/fa";
import { GiFilmStrip } from "react-icons/gi";

const mainLinks = [
    {
        icon: <MdHomeFilled className="text-xl" />,
        name: "Home",
    },
    {
        icon: <FaRegCompass className="text-xl" />,
        name: "Explore",
    },
    {
        icon: <SiYoutubeshorts className="text-xl" />,
        name: "Shorts",
    },
    {
        icon: <MdSubscriptions className="text-xl" />,
        name: "Subscriptions",
    },
];

const secondaryLinks = [
    {
        icon: <MdOutlineVideoLibrary className="text-xl" />,
        name: "Library",
    },
    {
        icon: <MdHistory className="text-xl" />,
        name: "History",
    },
    {
        icon: <MdOutlineSmartDisplay className="text-xl" />,
        name: "Your Videos",
    },
    {
        icon: <MdOutlineWatchLater className="text-xl" />,
        name: "Watch Later",
    },
    {
        icon: <MdThumbUpOffAlt className="text-xl" />,
        name: "Liked Videos",
    },
];

const subscriptionLinks = [
    {
        icon: <TbMusic className="text-xl" />,
        name: "Music",
    },
    {
        icon: <MdOutlineSportsVolleyball className="text-xl" />,
        name: "Sport",
    },
    {
        icon: <TbDeviceGamepad2 className="text-xl" />,
        name: "Gaming",
    },
    {
        icon: <GiFilmStrip className="text-xl" />,
        name: "Films",
    },
];

const helpLinks = [
    {
        icon: <MdSettings className="text-xl" />,
        name: "Settings",
    },
    {
        icon: <MdOutlinedFlag className="text-xl" />,
        name: "Report history",
    },
    {
        icon: <MdOutlineHelpOutline className="text-xl" />,
        name: "Help",
    },
    {
        icon: <MdOutlineFeedback className="text-xl" />,
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
        <div className={`${showSideBar ? 'w-[15rem]' : 'w-[4.5rem]'} mr-2 overflow-y-auto`}>
            <ul className={`flex flex-col ${showSideBar ? 'border-b-2 border-gray-700' : ''} pb-3`}>
                {mainLinks.map((link, index) => (
                    <a 
                    href="#" 
                    className={`hover:bg-zinc-800 rounded-lg mx-3 pl-3 py-3 ${mainLinkBgColor[index] || link.name === 'Home' ? 'bg-zinc-800' : ''}`}
                    key={link.name+index}
                    // onClick={() => handleMainLinkBgColor(mainLinks, index)}
                    >
                        <li 
                        className='flex items-center gap-x-5'>
                            {link.icon}
                            {/* {!showSideBar && <span>{link.name}</span>} */}
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
                    <ul className='flex flex-col border-b-2 border-gray-700 py-3'>
                        {secondaryLinks.map((link, index) => (
                            <a 
                            href="#" 
                            className={`hover:bg-zinc-800 rounded-lg mx-3 pl-3 py-3 `}
                            key={link.name+index}
                            // onClick={() => handleMainLinkBgColor(mainLinks, index)}
                            >
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

                    <ul className='flex flex-col border-b-2 border-gray-700 py-3'>
                        {subscriptionLinks.map((link, index) => (
                            <a 
                            href="#" 
                            className={`hover:bg-zinc-800 rounded-lg mx-3 pl-3 py-3 `}
                            key={link.name+index}
                            // onClick={() => handleMainLinkBgColor(mainLinks, index)}
                            >
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

                    <ul className='flex flex-col border-b-2 border-gray-700 py-3'>
                        {helpLinks.map((link, index) => (
                            <a 
                            href="#" 
                            className={`hover:bg-zinc-800 rounded-lg mx-3 pl-3 py-3 `}
                            key={link.name+index}
                            // onClick={() => handleMainLinkBgColor(mainLinks, index)}
                            >
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

                    <span className="px-4 pb-6 text-sm text-zinc-400">&copy; 2024 Google LLC</span>
                    <br />
                </>
            )}
        </div>
    );
}

export default Sidebar

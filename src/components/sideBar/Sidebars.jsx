import React, { useState } from 'react'
import { 
    exploreLinks, 
    helpLinks, 
    mainLinks, 
    moreLinks, 
    secondaryLinks, 
    textLinks 
} from './SideBarContents'
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { useSelector } from 'react-redux';
import LeftSideIconArea from '../navBar/LeftSideIconArea';
import { Link } from 'react-router-dom';

export const DesktopSidebar = ({ sidebarVisible }) => {
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [clickedOption, setClickedOption] = useState('Home');
    const [showSubscriptions, setShowSubscriptions] = useState(false);
    const isSidebarFloating = useSelector((state) => state.sidebar.isFloatSidebar);
    const [hoverBG, setHoverBG] = useState({
        hamBurger: false,
    });
    const isFullSidebarWindow = useSelector((state) => state.sidebar.isFullSidebarWindowSupport);

    const handleOptionClick = (name) => {
        setClickedOption(name);
    };

    return (
        <div className='w-full'>
            {isSidebarFloating && isFullSidebarWindow && (
                <div className={`h-[3.3rem] w-[15rem] pl-7 flex items-center fixed bg-[#0f0f0f]`}>
                    <LeftSideIconArea
                        hoverBG={hoverBG}
                        setHoverBG={setHoverBG}
                    />
                </div>
            )}

            {/* topmost part: home, watch later, shorts, subscriptions */}
            <ul className={`${isSidebarFloating && isFullSidebarWindow && 'pt-[3.3rem]'} flex flex-col gap-y-1 border-b-2 border-gray-700 pb-3`}>
                {mainLinks.map((link, index) => (
                    <Link 
                    to={`${link.route}`} 
                    className={`hover:bg-gray-800 rounded-lg mx-3 pl-3 py-3 ${clickedOption === link.name ? 'bg-zinc-800' : ''}`}
                    key={link.name+index}
                    onClick={() => handleOptionClick(link.name)}>
                        <li 
                        className={` flex items-center gap-x-5`}>
                            {link.icon}
                            <span className='text-sm tracking-wider'>
                                {link.name}
                            </span>
                        </li>
                    </Link>
                ))}
            </ul>

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
                    key={link.name+index}>
                        <li 
                        className='flex items-center gap-x-5'>
                            {link.icon}
                            {link.name}
                        </li>
                    </a>
                ))}

                {showPlaylist && (
                    <ul className='flex flex-col py-3'>
                        {exploreLinks.map((link, index) => (
                            <a 
                            href="#" 
                            className={`hover:bg-zinc-800 rounded-lg mx-3 pl-3 py-3 `}
                            key={link.name+index}>
                                <li 
                                className='flex items-center gap-x-5'>
                                    {link.icon}
                                    {link.name}
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
                    key={link.name+index}>
                        <li 
                        className='flex items-center gap-x-5'>
                            {link.icon}
                            {link.name}
                        </li>
                    </a>
                ))}
            </ul>

            {/* more from youtube */}
            <ul className={`flex flex-col border-b-2 border-gray-700 pb-3`}>
                <span className={`mx-3 pl-3 pt-3 `}>More from YouTube</span>
                {moreLinks.map((link, index) => (
                    <a 
                    href="#" 
                    className={`hover:bg-zinc-800 rounded-lg mx-3 pl-3 py-3 `}
                    key={link.name+index}>
                        <li 
                        className='flex items-center gap-x-5'>
                            {link.icon}
                            {link.name}
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
                    key={link.name+index}>
                        <li 
                        className='flex items-center gap-x-5'>
                            {link.icon}
                            {link.name}
                        </li>
                    </a>
                ))}
            </ul>

            {/* 1st text links */}
            <ul className='flex flex-wrap text-[13px] px-3 pt-6 gap-x-3 gap-y-2 '>
                {textLinks[0].map((name, index) => (
                    <li key={name+index}> {name} </li>
                ))}
            </ul>
            
            {/* 2nd text links */}
            <ul className='flex flex-wrap text-[13px] px-3 pt-9 pb-6 gap-x-2 gap-y-2 '>
                {textLinks[1].map((name, index) => (
                    <li key={name+index}> {name} </li>
                ))}
            </ul>

            <span className="px-4 pb-6 text-sm text-zinc-400">Made by Soumya with 💝</span>
        </div>
    );
}

export const MobileSidebar = () => {
    const [clickedOption, setClickedOption] = useState('Home');

    const handleOptionClick = (name) => {
        setClickedOption(name);
    };

    return (
        <ul className={`flex flex-col gap-y-4`}>
            {[...mainLinks, {
                icon: <MdOutlineVideoLibrary className="text-[1.3rem]" />,
                name: "You",
                route: '/',
            }].map((link, index) => (
                <Link 
                to={`${link.route}`} 
                className={`hover:bg-zinc-800 rounded-lg ml-3 px-2 py-3 ${clickedOption === link.name ? 'bg-zinc-700' : ''}`}
                key={link.name+index}
                onClick={() => handleOptionClick(link.name)}>
                    <li 
                    className={`flex-col flex items-center`}>
                        {link.icon}
                        <span className='text-[10px] mt-1.5'>{link.name}</span>
                    </li>
                </Link>
            ))}
        </ul>
    )
}

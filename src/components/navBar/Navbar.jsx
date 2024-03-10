import React, { useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import avatar from '../../assets/avatar.jpg'
import { FaArrowLeft } from "react-icons/fa6";
import { RiVideoAddLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import LeftSideIconArea from './LeftSideIconArea';

const Navbar = () => {
    const [searchItem, setSearchItem] = useState('');
    const [createIconColor, setCreateIconColor] = useState(false);
    const comparableWidth = 718;
    const [showSearchBar, setShowSearchBar] = useState(window.innerWidth > comparableWidth);
    const [hideIconInMobile, setHideIconInMobile] = useState(window.innerWidth > 500);
    const [showFullSearchBar, setShowFullSearchBar] = useState(false);
    const [hoverBG, setHoverBG] = useState({
        hamBurger: false,
        search: false,
        mic: false,
        create: false,
        notifications: false,
        backArrow: false,
    });

    useLayoutEffect(() => {
        const handleResize = () => {
            setShowSearchBar(window.innerWidth > comparableWidth ? true : false)
            setHideIconInMobile(window.innerWidth > 500 ? true : false)
            setShowFullSearchBar(false)
        }
        handleResize()

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handleSearch = (item) => {
        item.preventDefault();

        console.log(item.target.value);
        setSearchItem(item.target.value);
        console.log(searchItem);
    }

    const SearchInput = ({width}) => {
        return (
            <div className={`${width} flex items-center gap-x-4`}>
                <div className=' w-full'>
                    <form action="" className=' w-full '>
                        <div className='flex h-[2.6rem] w-full'>
                            <input 
                                type="text" 
                                placeholder="Search" 
                                className='h-full bg-zinc-900 border border-zinc-600 px-5 rounded-l-full focus:border-blue-500 focus:outline-none text-white font-xl w-[100%]'
                                onChange={(e) => handleSearch(e)}
                            />

                            <button className='h-full px-2 lg:px-4 xl:px-5 py-[.4rem] rounded-r-full border-t border-r border-b border-zinc-600 bg-zinc-800'>
                                <IoIosSearch className=' text-white h-6 w-6'/>
                            </button>
                        </div>
                    </form>
                </div>

                <button className='text-white p-3 rounded-full bg-zinc-800'>
                    <FaMicrophone className='text-xl'/>
                </button>
            </div>
        );
    }

    
    return (
        <div className='w-full flex justify-between items-center px-7 opacity-95 sticky top-0'>
            {showFullSearchBar ? (
                <div className='w-full flex items-center justify-between gap-x-4 '>
                    <div 
                    className={`cursor-pointer h-10 w-12 flex items-center justify-center ${hoverBG.backArrow && 'bg-neutral-700'} rounded-full`}
                    onMouseEnter={ () => setHoverBG({...hoverBG, backArrow: true}) }
                    onMouseLeave={ () => setHoverBG({...hoverBG, backArrow: false}) }
                    onClick={() => setShowFullSearchBar(false)}>
                        <FaArrowLeft className=' w-6 h-6'/>
                    </div>
                    <SearchInput width={'w-[100%]'} />
                </div>
            ) : ( 
                <>
                    {/* Left side */}
                    <LeftSideIconArea
                        setHoverBG={setHoverBG}
                        hoverBG={hoverBG}
                    />

                    {/* middle search bar */}
                    {showSearchBar && (
                        <SearchInput width={'w-[35%]'} />
                    )}
                    
                    {/* right side icons */}
                    {!showFullSearchBar && (
                        <div className='flex items-center gap-x-6 '>
                            {!showSearchBar && (
                                <>
                                    {/* search and mic */}
                                    <div className='flex gap-x-6 items-center justify-center'>
                                        <div 
                                        className={` cursor-pointer h-10 w-10 flex items-center justify-center ${hoverBG.search && 'bg-neutral-700'} rounded-full`}
                                        onMouseEnter={ () => setHoverBG({...hoverBG, search: true}) }
                                        onMouseLeave={ () => setHoverBG({...hoverBG, search: false}) }
                                        onClick={() => (
                                            setShowFullSearchBar(true),
                                            setHoverBG({ ...hoverBG, search: false})
                                        )}>
                                            <IoIosSearch className=' w-6 h-6'/>
                                        </div>

                                        {hideIconInMobile && (
                                            <div 
                                            className={` cursor-pointer h-10 w-10 flex items-center justify-center ${hoverBG.mic && 'bg-neutral-700'} rounded-full`}
                                            onMouseEnter={ () => setHoverBG({...hoverBG, mic: true}) }
                                            onMouseLeave={ () => setHoverBG({...hoverBG, mic: false}) }>
                                                <FaMicrophone className=' w-6 h-6'/>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                            
                            {/* create button */}
                            <div 
                            className={`cursor-pointer`} 
                            onClick={() => setCreateIconColor(!createIconColor)}>
                                <div className={`cursor-pointer h-10 w-10 flex items-center justify-center ${hoverBG.create && 'bg-neutral-700'} rounded-full`}
                                onMouseEnter={ () => setHoverBG({...hoverBG, create: true}) }
                                onMouseLeave={ () => setHoverBG({...hoverBG, create: false}) }>
                                    <RiVideoAddLine className={`w-6 h-6`} />
                                </div>
                            </div>
                            
                            {/* notification */}
                            {hideIconInMobile && (
                                <div className='relative cursor-pointer'>
                                    <div className={` cursor-pointer h-10 w-10 flex items-center justify-center ${hoverBG.notifications && 'bg-neutral-700'} rounded-full`}
                                    onMouseEnter={ () => setHoverBG({...hoverBG, notifications: true}) }
                                    onMouseLeave={ () => setHoverBG({...hoverBG, notifications: false}) }>
                                        <IoNotificationsOutline className={`w-6 h-6`} />
                                    </div>

                                    <div className="absolute top-[.2rem] -right-0 bg-red-700 rounded-full text-white text-[12px] px-1 flex items-center justify-center">
                                        1+
                                    </div>
                                </div>
                            )}
                            
                            {/* avatar */}
                            <div className=' w-8 h-8 rounded-full overflow-hidden cursor-pointer'>
                                <img src={avatar} />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Navbar;

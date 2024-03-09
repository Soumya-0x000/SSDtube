import { useLayoutEffect, useState } from 'react';
import FeedBar from '../components/feedbar/FeedBar';
import Navbar from '../components/Navbar'
import MainSidebar from '../components/sideBar/MainSidebar';
import { useSelector } from 'react-redux';
import { DesktopSidebar } from '../components/sideBar/Sidebars';

const Home = () => {
    const sidebarVisibleWidth = 760;
    const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth > sidebarVisibleWidth);
    const isFullSidebarWindow = useSelector((state) => state.sidebar.isFullSidebarWindowSupport);
    const isSidebarFloating = useSelector((state) => state.sidebar.isFloatSidebar);

    useLayoutEffect(() => {
        const handleResize = () => {
            setSidebarVisible(window.innerWidth > sidebarVisibleWidth ? true : false);
        }
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return (
        <div className=' h-screen overflow-hidden flex flex-col'>
            <div className='h-[6vh] flex items-center '>
                <Navbar/>
            </div>

            <div className='flex items-center justify-start h-[94vh] overflow-hidden '>
                <div 
                className={`max-w-[17rem] h-full flex`}>
                    {sidebarVisible && (
                        <MainSidebar/>
                    )}

                    {isFullSidebarWindow && isSidebarFloating && (
                        <div className='absolute z-20 bg-[#0f0f0f] overflow-y-auto w-[16rem] h-[94vh]'>
                            <DesktopSidebar/>
                        </div>
                    )}
                </div>
                
                <div className={`w-full h-full bg-neutral-900 rounded-lg overflow-x-auto `}>
                    <FeedBar sidebarVisibleWidth={sidebarVisibleWidth}/>
                </div>
            </div>
        </div>
    );
}

export default Home

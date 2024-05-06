import React, { useLayoutEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navBar/Navbar'
import MainSidebar from './components/sideBar/MainSidebar';
import { useSelector } from 'react-redux'
import { DesktopSidebar } from './components/sideBar/Sidebars'
import './components/sideBar/sidebarAnimation.css'

const App = () => {
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
    }, []);

    return (
        <div className=' '>
            {/* navbar */}
            <div className='h-[3.3rem] flex items-center absolute w-full'>
                <Navbar/>
            </div>

            <div className='absolute top-[3.3rem] w-full'>
                <div className={`flex items-center justify-start h-[94vh] overflow-hidden `}>
                    {/* sidebar */}
                    <div 
                    className={`max-w-[16rem] h-full flex`}>
                        {sidebarVisible && <MainSidebar/>}

                        {isFullSidebarWindow && isSidebarFloating && (
                            <div className={`fixed -top-0 z-20 bg-[#0f0f0f] overflow-y-auto w-[15rem] h-[100vh] ${isSidebarFloating ? 'openSidebarAnimation-div' : 'closeSidebarAnimation-div'}`}>
                                <DesktopSidebar sidebarVisible={sidebarVisible}/>
                            </div>
                        )}
                    </div>
                    
                    {/* outlet */}
                    <div className={`w-full h-full bg-neutral-900 rounded-lg overflow-x-auto mr-1.5 relative`}>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;

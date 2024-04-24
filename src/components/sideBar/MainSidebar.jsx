import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DesktopSidebar, MobileSidebar } from './Sidebars';
import { fullSidebarWindowSupport, sideBarFloat, sideBarOpen } from '../../store/reducers/SidebarSlice';

const Sidebar = () => {
    const isSideBarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
    const dispatch = useDispatch();
    const comparableWidth = [1312, 790];
    const [showSideBar, setShowSideBar] = useState(window.innerWidth > comparableWidth[0]);

    useLayoutEffect(() => {
        const handleSidebarVisibility = () => {
            if (window.innerWidth > comparableWidth[0]) {
                setShowSideBar(true);
                dispatch(fullSidebarWindowSupport(false));
            } else {
                setShowSideBar(false);
                dispatch(sideBarOpen(true));
                dispatch(fullSidebarWindowSupport(true));
            }
        }
        handleSidebarVisibility()

        window.addEventListener('resize', handleSidebarVisibility)
        return () => window.removeEventListener('resize', handleSidebarVisibility)
    }, [])

    return (
        <div className={`mr-2 overflow-y-auto pt-2`}>
            {showSideBar && isSideBarOpen ? (
                <DesktopSidebar/>
            ) : (
                <MobileSidebar/>
            )}
        </div>
    );
}

export default Sidebar

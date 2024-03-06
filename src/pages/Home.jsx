import React, { useLayoutEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Home = () => {
    const comparableHeight = 600
    const [windowHeight, setWindowHeight] = useState(window.innerHeight > comparableHeight)

    useLayoutEffect(() => {
        const handleInnerHeight = () => {
            setWindowHeight(window.innerHeight ? true : false)
        }
        handleInnerHeight()

        window.addEventListener('resize', handleInnerHeight)
        return () => window.removeEventListener('resize', handleInnerHeight)
    }, []);

    return (
        <div className=' h-screen overflow-hidden flex flex-col gap-y-2 pt-2'>
            <Navbar/>
            <Sidebar/>
        </div>
    );
}

export default Home

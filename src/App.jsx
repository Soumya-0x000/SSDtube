import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Watch from './pages/watch/Watch'
import Channel from './pages/channel/Channel'
import Navbar from './components/navBar/Navbar'
import DedicatedPlaylist from './pages/channel/playlist/DedicatedPlaylist'
import WatchLater from './pages/watch/WatchLater'
import Search from './pages/search/Search'

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/search',
            element: <Search/>
        },
        {
            path: '/watch/:id',
            element: <Watch/>
        },
        {
            path: '/watchLater',
            element: <WatchLater/>
        },
        {
            path: '/channel/:id',
            element: <Channel/>
        },
        {
            path: '/dedicatedPlaylist/:id',
            element: <DedicatedPlaylist/>
        }
    ])

    return (
        <div>
            {/* <div className='h-[3.3rem] flex items-center '> */}
                {/* <Navbar/> */}
            {/* </div> */}
            <RouterProvider router={router}/>
        </div>
    )
}

export default App;

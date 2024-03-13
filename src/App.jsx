import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Watch from './pages/Watch'
import Channel from './pages/channel/Channel'
import Navbar from './components/navBar/Navbar'

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
            path: '/channel/:id',
            element: <Channel/>
        },
    ])

    return (
        <>
            {/* <div className='h-[3.3rem] flex items-center '>
                <Navbar/>
            </div> */}
            <RouterProvider router={router}/>
        </>
    )
}

export default App;

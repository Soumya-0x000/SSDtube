import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Watch from './pages/Watch'

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
        }
    ])

    return (
        <RouterProvider router={router}/>
    )
}

export default App
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import Home from './pages/Home.jsx'
import Search from './pages/search/Search.jsx'
import Watch from './pages/watch/Watch.jsx'
import WatchLater from './pages/watch/WatchLater.jsx'
import Channel from './pages/channel/Channel.jsx'
import DedicatedPlaylist from './pages/channel/playlist/DedicatedPlaylist.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '',
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
        ]
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
    </Provider>
)

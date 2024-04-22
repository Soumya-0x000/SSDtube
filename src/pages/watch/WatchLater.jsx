import React from 'react'
import { useSelector } from 'react-redux';

const WatchLater = () => {
    const { watchLater } = useSelector(state => state.watch);
    
    return (
        <div>WatchLater</div>
    )
}

export default WatchLater
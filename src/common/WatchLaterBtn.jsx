import React, { useState } from 'react'
import { MdOutlineWatchLater } from 'react-icons/md';

const WatchLaterBtn = ({mode}) => {
    const [watchLaterMode, setWatchLaterMode] = useState('');

    const handleWatchLater = (mainMode) => {
        // setClicked(prevVal => ({
        //     ...prevVal,
        //     watchLater: true
        // }))
        setWatchLaterMode('mainMode');
        setWatchLaterMode(mainMode);
        console.log(watchLaterMode)
    };

    return (
        <div className=' flex flex-wrap gap-x-3'
        onClick={() => handleWatchLater(mode)}>
            <MdOutlineWatchLater className=' text-2xl'/>
            <span>Add to watch later</span>
        </div>
    )
}

export default WatchLaterBtn
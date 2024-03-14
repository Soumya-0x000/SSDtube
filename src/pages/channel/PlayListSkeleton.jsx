import React from 'react'

const PlayListSkeleton = () => {
    return (
        <div className=' animate-pulse'>
            <div className='w-[15rem] sm:max-w-[12.5rem] md:max-w-[15rem] h-[10rem] sm:max-h-[12rem] rounded-lg relative bg-slate-800'>
                <div className='absolute left-1/2 -translate-x-1/2 bg-slate-600 -top-[.4rem] w-[90%] h-[4%] rounded-t-xl'/>
            </div>

            <div className=' space-y-1 mt-2'>
                <div className=' line-clamp-1 font-bold text-sm max-w-[90%] h-2 rounded-sm bg-slate-700'/>
                <div className=' bg-gray-700 text-[.9rem] h-2 rounded-sm w-[98%]'/> 
            </div>
        </div>
    )
}

export default PlayListSkeleton
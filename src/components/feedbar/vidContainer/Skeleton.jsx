import React from 'react'

const Skeleton = () => {
    return (
        <div className=' flex flex-col gap-y-2 min-w-[7rem] ml-1 mb-1 animate-pulse'>
            <div className=' h-[12.5rem] sm:h-[13rem] w-full bg-slate-600 rounded-md'/>

            <div className='flex gap-x-2'>
                <div className=' min-w-9 h-9 bg-slate-600 rounded-full'/>
                
                <div className='flex flex-col gap-y-2 w-full'>
                    <div className='w-[88%] h-5 bg-slate-600 rounded-sm'/>
                    <div className=' w-[70%] pr-6 h-4 bg-slate-600 rounded-sm'/>
                </div>
            </div>
        </div>
    )
}

export default Skeleton
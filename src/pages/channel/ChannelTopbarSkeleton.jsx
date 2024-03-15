import React from 'react'

const ChannelTopBarSkeleton = ({statisticsAlignment}) => {
    return (
        <div className='px-6 sm:px-3 flex items-center gap-x-8 relative '>
            {/* logo */}
            <div className=' h-[11rem] min-w-[11rem] bg-cover bg-center rounded-full overflow-hidden bg-slate-700 animate-pulse '/>
            
            {/* info */}
            <div className=' flex flex-col gap-y-2 '>
                {/* title */}
                <div className=' w-[18rem] h-7 rounded-md bg-slate-700 animate-pulse '>                    
                </div>

                {/* statistics */}
                <div className=' text-gray-400 space-y-3'>
                    <div className={` flex items-center gap-x-1 `}>
                        <p className=' w-[7rem] h-3 bg-slate-700 rounded-sm animate-pulse'/>
                        <p className=' w-[5rem] h-3 bg-slate-700 rounded-sm animate-pulse'/>
                        <p className=' w-[4rem] h-3 bg-slate-700 rounded-sm animate-pulse'/>
                    </div>

                    <div className=' flex items-center '>
                        <div className=' w-full sm:w-[24rem] md:w-[31rem] lg:w-[39rem] xl:w-[43rem] rounded-sm animate-pulse h-4 bg-slate-700'/>
                    </div>
                    
                    <div className='flex gap-x-1'>
                        <p className=' w-[6rem] h-3 bg-slate-700 rounded-sm animate-pulse'/>
                        <p className=' w-[8rem] h-3 bg-slate-700 rounded-sm animate-pulse'/>
                    </div>

                    <p className=' w-[8rem] h-10 bg-slate-700 rounded-full animate-pulse'/>
                </div>
            </div>
        </div>   
    )
}

export default ChannelTopBarSkeleton
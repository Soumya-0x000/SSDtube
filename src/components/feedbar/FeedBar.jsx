import ButtonList from './buttonList/ButtonList'
import VideoContainer from './VideoContainer'

const FeedBar = () => {
    return (
        <div 
        className={` pt-4 flex flex-col items-center justify-start overflow-x-auto `}>
            <div className={` w-[98.5%] space-y-2`}>
                <ButtonList/>
                {/* <div className='ring'> */}
                {/* </div> */}
                {/* <div className=' overflow-y-aut ring fixed w-full'> */}
                    {/* <div className='h-[100rem]  overflow-y-auto'> */}
                        <VideoContainer/>
                    {/* </div> */}
                {/* </div> */}
            </div>
        </div>
    );
}

export default FeedBar;
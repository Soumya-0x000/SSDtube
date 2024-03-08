import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'

const FeedBar = () => {
    return (
        <div 
        className={` pt-4 flex flex-col items-center justify-start overflow-x-auto `}>
            <div className={` w-[98%`}>
                <ButtonList/>
                <VideoContainer/>
            </div>
        </div>
    );
}

export default FeedBar
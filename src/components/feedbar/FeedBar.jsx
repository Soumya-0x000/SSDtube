import Spinner from '../loading/Spinner';
import ButtonList from './buttonList/ButtonList'
import VideoContainer from './vidContainer/VideoContainer'

const FeedBar = () => {
    return (
        <>  
            {/* button list */}
            <div className=' absolute w-full px-2'>
                <ButtonList/>
            </div>

            {/* videos */}
            <div className={`h-full w-full absolute`}>
                <VideoContainer/>            
            </div>
        </>
    );
}

export default FeedBar;

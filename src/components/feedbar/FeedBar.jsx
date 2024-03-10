import Spinner from '../loading/Spinner';
import ButtonList from './buttonList/ButtonList'
import VideoContainer from './VideoContainer'

const FeedBar = () => {
    return (
        <div className=''>  
            {/* button list */}
            <div className=' absolute w-full px-2'>
                <ButtonList/>
            </div>

            {/* videos */}
            <div className={`h-full w-full absolute`}>
                <VideoContainer/>            
            </div>
        </div>
    );
}

export default FeedBar;

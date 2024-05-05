import FeedBar from '../components/feedbar/FeedBar';

const Home = () => {
    return (
        <div className=' h-scree overflow-hidden flex flex-col'>
            <div className={`flex items-center justify-start h-[94vh] overflow-hidden `}>
                <div className={`w-full h-full bg-neutral-900 rounded-lg overflow-x-auto mr-1.5 relative`}>
                    <FeedBar/>
                </div>
            </div>
        </div>
    );
}

export default Home

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Home = () => {
    return (
        <div className=' h-screen overflow-hidden flex flex-col gap-y-2'>
            <div>
                <Navbar/>
            </div>
            <Sidebar/>
        </div>
    );
}

export default Home

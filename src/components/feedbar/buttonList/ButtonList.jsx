import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import './btnList.css'
import { useDispatch } from "react-redux";
import { setCategoryName } from "../../../store/reducers/HomePageSlice";

const buttons = [
    {name: 'All'},
    {name: 'Gaming'},
    {name: 'Music'},
    {name: 'Battlegrounds Mobile India'},
    {name: 'Unboxing'},
    {name: 'Dramedy'},
    {name: 'Sci-fi films'},
    {name: 'Wickets'},
    {name: 'Live'},
    {name: 'Game shows'},
    {name: 'Thrillers'},
    {name: 'Animated films'},
    {name: 'Sketch comedy'},
    {name: 'Machines'},
    {name: 'Apple'},
    {name: 'Bollywood Music'},
    {name: 'Home improvement'},
    {name: 'Physics'},
    {name: 'HTML'},
    {name: 'Recently uploaded'},
    {name: 'New to you'},
]

const ButtonList = () => {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [selectedOption, setSelectedOption] = useState(buttons[0].name);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleScroll = () => {
            if(scrollRef.current) {
                setShowLeftArrow(scrollRef.current.scrollLeft > 0);
                setShowRightArrow(
                    scrollRef.current.scrollLeft < 
                    scrollRef.current.scrollWidth - scrollRef.current.clientWidth
                )
            }
        };

        if(scrollRef.current) {
            scrollRef.current.addEventListener('scroll', handleScroll);
        };

        return () => {
            if(scrollRef.current) {
                scrollRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [])    

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: scrollRef.current.scrollLeft - 200,
                behavior: 'smooth'
            })
        }
    }
    
    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: scrollRef.current.scrollLeft + 200,
                behavior: 'smooth'
            })
        }
    }
    
    const handleClick = (name) => {
        setSelectedOption(name);
        dispatch(setCategoryName(name));
    };

    return (
        <div className="h-[3rem] z-10 bg-neutral-900 relative flex items-center px-[3.1rem]">
            <div className="absolute left-0 h-full w-10 bg-gradient-to-r from-neutral-800 to-neutral-900 transition-all flex items-center justify-center rounded-lg">
                {showLeftArrow && (
                    <button 
                    className="flex items-center justify-center h-full w-full bg-gradient-to-r hover:from-neutral-700 hover:to-neutral-700 transition-all px-3 py-2 rounded-lg"
                    onClick={scrollLeft}>
                        <FaArrowLeft className="h-5 w-5"/>
                    </button>
                )}
            </div>

            <div className={`overflow-x-auto btnContent`} ref={scrollRef}>
                <div className=' flex items-center  gap-x-4'>
                    {buttons.map((buttonName, index) => (
                        <div key={index}
                        onClick={() => handleClick(buttonName.name)}>
                            <button 
                            className={`  font-medium cursor-pointer px-3 py-2 rounded-md ${buttonName.name === selectedOption ? 'bg-white text-gray-700' : 'bg-neutral-600 hover:bg-neutral-700'} `}>
                                <span className="whitespace-nowrap">
                                    {buttonName.name}
                                </span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute right-0 h-full w-10 bg-gradient-to-l from-neutral-800 to-neutral-900 transition-all flex items-center justify-center rounded-lg"> 
                {showRightArrow && (
                    <button 
                    className="flex items-center justify-center h-full w-full bg-gradient-to-l hover:from-neutral-700 hover:to-neutral-700 transition-all px-3 py-2 rounded-lg"
                    onClick={scrollRight}>
                        <FaArrowRight className="h-5 w-5"/>
                    </button>
                )}
            </div>
        </div>
    );
}

export default ButtonList;

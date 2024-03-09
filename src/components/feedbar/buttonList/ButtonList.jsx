import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import './btnList.css'

const buttons = [
    {text: <a href="#">All</a>},
    {text: <a href="#">Gaming</a>},
    {text: <a href="#">Music</a>},
    {text: <a href="#">Battlegrounds Mobile India</a>},
    {text: <a href="#">Unboxing</a>},
    {text: <a href="#">Dramedy</a>},
    {text: <a href="#">Sci-fi films</a>},
    {text: <a href="#">Wickets</a>},
    {text: <a href="#">Live</a>},
    {text: <a href="#">Game shows</a>},
    {text: <a href="#">Thrillers</a>},
    {text: <a href="#">Animated films</a>},
    {text: <a href="#">Sketch comedy</a>},
    {text: <a href="#">Machines</a>},
    {text: <a href="#">Apple</a>},
    {text: <a href="#">Bollywood Music</a>},
    {text: <a href="#">Home improvement</a>},
    {text: <a href="#">Physics</a>},
    {text: <a href="#">HTML</a>},
    {text: <a href="#">Recently uploaded</a>},
    {text: <a href="#">New to you</a>},
]

const ButtonList = () => {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

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
    
    return (
        <div className=" relative flex items-center px-[3.1rem]">
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
                        <div key={index}>
                            <button 
                            className={`hover:bg-neutral-700 bg-neutral-600 font-medium cursor-pointer px-3 py-2 rounded-md`}>
                                <span className="whitespace-nowrap">
                                    {buttonName.text}
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

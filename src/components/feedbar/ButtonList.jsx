import React, { useLayoutEffect, useState } from 'react'

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
    return (
        <div className={`mx-14 w-[60rem] flex flex-wrap gap-x-3 gap-y-3 items-center justify-between text-md`}>
            {buttons.map((button, index) => (
                <button 
                className=' bg-neutral-700 rounded-lg px-3 py-1' 
                key={button.text + index}>
                    {button.text}
                </button>
            ))}
        </div>
    );
}

export default ButtonList;

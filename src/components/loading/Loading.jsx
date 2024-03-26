import React from 'react';
import './Loading.css';

const Loading = () => {
    return (
        <div className="container bg-green-400 ">
            <div className="loader"></div>
            <div className="loader"></div>
            <div className="loader"></div>
        </div>
    )
}

export default Loading;
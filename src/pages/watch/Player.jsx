import React from 'react'
import ReactPlayer from 'react-player'

const Player = ({id}) => {
    return (
        <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            controls
            width='100%'
            height='100%'
            playing
            pip = {true}
            stopOnUnmount={false}
            loop={false}  
            light={true}
            config={{
                youtube: {
                    playerVars: {
                        autoplay: 1, 
                        controls: 1, 
                        modestbranding: 1, 
                        fs: 1, 
                        rel: 1, 
                        loop: 0 
                    }
                }
            }}
        />  
    )
}

export default Player
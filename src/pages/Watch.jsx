import React from 'react'
import { useParams } from 'react-router-dom'

const Watch = () => {
    const { id } = useParams(); 
    return (
        <div>
            <iframe 
                width="560" height="315" 
                src={`https://www.youtube.com/embed/${id}?si=fhmTDD3O_taB3Rvh`} 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen={true}
            />
        </div>
    )
}

export default Watch;

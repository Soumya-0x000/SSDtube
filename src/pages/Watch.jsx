import React from 'react'
import { useParams } from 'react-router-dom'

const Watch = () => {
    const { id } = useParams(); 
    return (
        <div>{id}</div>
    )
}

export default Watch
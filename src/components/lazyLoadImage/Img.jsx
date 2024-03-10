import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Img = ({className, src}) => {
    return (
        <LazyLoadImage
            className={className || ''}
            // effect='blur'
            src={src}
        />
    )
}

export default Img;

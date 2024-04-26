import axios from 'axios';
import React, { useEffect } from 'react'
import { getComments } from '../../utils/Hooks';

const CommentSection = ({vdoId}) => {
    const fetchComments = async (vdoCode) => {
        const commentThreads = await getComments(vdoCode);
        console.log(commentThreads)
    };

    useEffect(() => {
        // fetchComments(vdoId);
    }, []);

    return (
        <div>CommentSection</div>
    )
}

export default CommentSection
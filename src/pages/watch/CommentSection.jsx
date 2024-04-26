import axios from 'axios';
import React, { useEffect } from 'react'
import { getComments } from '../../utils/Hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setComments, setNxtPgToken, setTotalCommentCount } from '../../store/reducers/CommentSlice';
import { BASE_URL, YOUTUBE_API_KEY } from '../../utils/Constant'
import { MdOutlineSort } from "react-icons/md";

const CommentSection = ({vdoId}) => {
    const dispatch = useDispatch();
    const {
        comments,
        totalCommentCount,
        nxtPageToken,
    } = useSelector(state => state.comments)

    const fetchComments = async (vdoCode) => {
        const commentThreads = await getComments(vdoCode);
        const commentArr = commentThreads?.data?.items;

        // console.log(commentThreads)
        const pureValues = commentArr.map(item => {
            const commentId = item?.id
            const key = item?.etag
            const canReply = item?.snippet?.canReply
            const channelId = item?.snippet?.channelId
            const vdoId = item?.snippet?.videoId
            const replyCount = item?.snippet?.totalReplyCount
            
            const primaryPart = item?.snippet?.topLevelComment?.snippet

            const authorChannelId = primaryPart?.authorChannelId?.value
            const authorChannelUrl = primaryPart?.authorChannelUrl
            const authorDisplayName = primaryPart?.authorDisplayName 
            const authorProfileImageUrl = primaryPart?.authorProfileImageUrl
            const likeCount = primaryPart?.likeCount
            const publishedAt = primaryPart?.publishedAt
            const textDisplay = primaryPart?.textDisplay
            const updatedAt = primaryPart?.updatedAt

            return {
                commentId, key, canReply, channelId, vdoId, replyCount,  
                authorChannelId, authorChannelUrl, authorDisplayName,  
                authorProfileImageUrl, likeCount, publishedAt, textDisplay,  
                updatedAt
            }
        })
        dispatch(setComments(pureValues))
        
        const nxtPgToken = commentThreads?.data?.nextPageToken;
        dispatch(setNxtPgToken(nxtPgToken));

        const commentNum = commentThreads?.data?.pageInfo?.totalResults;
        dispatch(setTotalCommentCount(commentNum));
    };
    // console.log(comments)

    const nextCommentPage = async () => {
        const NEXT_COMMENT_PG_URL = `${BASE_URL}/commentThreads?textFormat=plainText&part=snippet&maxResults=50&pageToken=${nxtPageToken}&key=${YOUTUBE_API_KEY}&videoId=${vdoId}`;

        try {
            const fetchNextComments = await axios.get(NEXT_COMMENT_PG_URL);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // fetchComments(vdoId);
    }, []);

    return (
        <div>
            {/* topmost part */}
            <div className=' flex items-center mb-6 space-x-14'>
                <div className=' text-[20px] font-bold'>
                    {totalCommentCount} Comments
                </div>

                <div className='flex items-center space-x-2'>
                    <MdOutlineSort className=' text-2xl'/>
                    <div className=' text-xl'>Sort</div>
                </div>
            </div>

            {/* throw your comment */}
            <div className=' flex gap-x-3 w-full'>
                <div className=' w-12 h-12 rounded-full overflow-hidden'>
                    <img 
                        src="https://yt3.ggpht.com/yti/ANjgQV9Mml6GMMaczuenhrZ2kXfnmWvrwtu-gGDWSALbxYo14t40=s48-c-k-c0x00ffffff-no-rj" 
                        className=' w-full h-full'
                        alt="profile image" 
                    />
                </div>

                <div>
                    <input 
                        type="text" 
                        className=' w-full bg-transparent border-b-[1px] border-b-slate-500'
                    />
                </div>
            </div>
        </div>
    )
}

export default CommentSection
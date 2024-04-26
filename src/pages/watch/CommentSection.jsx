import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getComments } from '../../utils/Hooks';
import { useDispatch, useSelector } from 'react-redux';
import { 
    setComments, 
    setTotalCommentCount,
    setNxtPgToken,
    setNewCommentToAdd,
} from '../../store/reducers/CommentSlice';
import { BASE_URL, YOUTUBE_API_KEY, extractLinks, handleDayCount } from '../../utils/Constant'
import { MdOutlineSort } from "react-icons/md";
import { BsEmojiSunglasses } from "react-icons/bs";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";

const CommentSection = ({ vdoId, logoURL }) => {
    const dispatch = useDispatch();
    const {
        comments,
        totalCommentCount,
        nxtPageToken,
    } = useSelector(state => state.comments);
    const [customComment, setCustomComment] = useState('');
    const [showOperationPanel, setShowOperationPanel] = useState(false);
    const [openEmojiPanel, setOpenEmojiPanel] = useState(false);
    const [newComment, setNewComment] = useState('');

    const [openReplyEmojiPanel, setOpenReplyEmojiPanel] = useState(new Array(comments.length).fill(false));
    const [showReplyOperationPanel, setShowReplyOperationPanel] = useState(new Array(comments.length).fill(false));
    const [showReply, setShowReply] = useState(new Array(comments.length).fill(false));
    const [replyValue, setReplyValue] = useState(new Array(comments.length).fill(''));

    const fetchComments = async (vdoCode) => {
        const commentThreads = await getComments(vdoCode);
        const commentArr = commentThreads?.data?.items;

        console.log(commentThreads)
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

    const nextCommentPage = async () => {
        console.log('fetchNextComments')
        const NEXT_COMMENT_PG_URL = `${BASE_URL}/commentThreads?textFormat=plainText&part=snippet&maxResults=50&pageToken=${nxtPageToken}&key=${YOUTUBE_API_KEY}&videoId=${vdoId}`;

        try {
            const fetchNextComments = await axios.get(NEXT_COMMENT_PG_URL);
            console.log(fetchNextComments)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // fetchComments(vdoId);
    }, []);

    // console.log(comments)
    const handleThrowNewComment = (e) => {
        e.preventDefault;
        if (customComment.trim() !== '') {
            dispatch(setNewCommentToAdd(newComment));
            setCustomComment('');
            setOpenEmojiPanel(false);
            setShowOperationPanel(false);
            console.log(newComment)
        }
    };

    useEffect(() => {
        setNewComment(customComment)
    }, [customComment]);
    
    const handleCancel = (e) => {
        e.preventDefault;
        setShowOperationPanel(false);
        setCustomComment('');
    };

    const handleEmojiClick = (e) => {
        const sym = e.unified.split("_");
        const codeArray = [];
        sym.forEach((el) => codeArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codeArray);
        setCustomComment(customComment + emoji);
    };


    const handleReplyShow = (index) => {
        const tempArr = [...showReply];
        tempArr[index] = !tempArr[index];
        setShowReply(tempArr);

        const tempArr1 = [...showReplyOperationPanel];
        tempArr1[index] = true;
        setShowReplyOperationPanel(tempArr1);
    };

    const handleReply = (e, index) => {
        const tempArr = [...replyValue];
        tempArr[index] = e.target.value;
        setReplyValue(tempArr);
    };

    const handleOpenRplyEmojiPanel = (index) => {
        const tempArr = [...openReplyEmojiPanel];
        tempArr[index] = !tempArr[index];
        setOpenReplyEmojiPanel(tempArr)
    };

    const handleReplyEmojiClick = (e, index) => {
        const tempArr = [...replyValue];

        const sym = e.unified.split("_");
        const codeArray = [];
        sym.forEach((el) => codeArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codeArray);
        tempArr[index] = tempArr[index] + emoji;
        setReplyValue(tempArr);
    };

    const handleReplyCancel = (index) => {
        const tempArr1 = [...showReplyOperationPanel];
        const tempArr2 = [...replyValue];
        const tempArr3 = [...openReplyEmojiPanel];
        const tempArr4 = [...showReply];
        
        tempArr1[index] = false;
        tempArr2[index] = '';
        tempArr3[index] = false;
        tempArr4[index] = false;
        
        setShowReplyOperationPanel(tempArr1);
        setReplyValue(tempArr2);
        setOpenReplyEmojiPanel(tempArr3)
        setShowReply(tempArr4)
    };

    const handleThrowNewReply = (index) => {};

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
                <div className=' w-10 h-10 rounded-full overflow-hidden'>
                    <img 
                        src="https://yt3.ggpht.com/yti/ANjgQV9Mml6GMMaczuenhrZ2kXfnmWvrwtu-gGDWSALbxYo14t40=s48-c-k-c0x00ffffff-no-rj" 
                        className=' w-full h-full'
                        alt="profile image" 
                    />
                </div>

                <div className=' w-full'>
                    <input 
                        type="text" 
                        onFocus={() => setShowOperationPanel(true)}
                        className=' w-full bg-transparent border-b-[1px] border-b-slate-500 focus:outline-none focus:border-b-white'
                        placeholder='Add a comment...'
                        value={customComment}
                        onChange={(e) => setCustomComment(e.target.value)}
                    />

                    {showOperationPanel && (
                        <div className='flex items-center justify-between mt-3'>
                            <div className=' relative'>
                                <button className=' text-2xl hover:bg-neutral-800 p-2 rounded-full'
                                onClick={() => setOpenEmojiPanel(prevVal => !prevVal)}>
                                    <BsEmojiSunglasses/>
                                </button>
                            
                                {openEmojiPanel && (
                                    <div className=' absolute top-0 mt-12'>
                                        <Picker
                                            data={data}
                                            emojiSize={20}
                                            emojiButtonSize={28}
                                            onEmojiSelect={handleEmojiClick}
                                            maxFrequentRows={2}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className='flex gap-x-4'>
                                <button className={`px-7 py-2 rounded-full hover:bg-neutral-800`}
                                onClick={() => handleCancel(false)}>
                                    Cancel
                                </button>

                                <button className={`px-7 py-2 rounded-full ${customComment.trim() ? 'bg-blue-700' : 'bg-neutral-800 text-neutral-400'}`}
                                onClick={handleThrowNewComment}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* main comments */}
            <InfiniteScroll 
            loader='Loading...'
            className=' h-full flex flex-col gap-y-7 pt-10 w-full'
            // hasMore={true}
            // next={nextCommentPage}
            dataLength={comments.length}>   
                {comments.map((cmnt, indx) => (
                    <div className='flex gap-x-4 w-full '
                    key={cmnt.key + indx}>
                        <Link className=' min-w-10 max-w-10 min-h-10 max-h-10 rounded-full overflow-hidden'
                        to={`/channel/${cmnt.authorChannelId}`}>
                            <img 
                                src={cmnt.authorProfileImageUrl} 
                                className=' w-full h-full'
                                alt="profile image" 
                            />
                        </Link>

                        <div className=' w-full'>
                            <div>
                                <div className=' flex gap-x-2'>
                                    <Link className='text-[13.5px]'
                                    to={`/channel/${cmnt.authorChannelId}`}>
                                        {cmnt.authorDisplayName}
                                    </Link>

                                    <div className='text-[13px] text-neutral-400'>
                                        {handleDayCount(cmnt.publishedAt)}
                                    </div>
                                </div>

                                <div className=' mt-1 text-[14px] whitespace-pre-line'>
                                    {extractLinks(cmnt.textDisplay)}
                                </div>
                            </div>

                            <div className=' flex items-center '>
                                <div className='flex mt-2'>
                                    <AiOutlineLike className=' h-6 w-6 mr-1'/> 
                                    {cmnt.likeCount !== 0 && (
                                        <span className=' text-[14px]'>
                                            {cmnt.likeCount}
                                        </span> 
                                    )}
                                </div>

                                <AiOutlineDislike className=' h-6 w-6 mx-4'/>
                                
                                {cmnt.canReply && (
                                    <button className=' hover:bg-neutral-700 px-5 py-1.5 rounded-full text-sm'
                                    onClick={() => handleReplyShow(indx)}>
                                        Reply
                                    </button>
                                )}
                            </div>

                            {showReply[indx] && (
                                <div className=' flex gap-x-3 w-full mt-4'>
                                    <div className=' w-10 h-10 rounded-full overflow-hidden'>
                                        <img 
                                            src="https://yt3.ggpht.com/yti/ANjgQV9Mml6GMMaczuenhrZ2kXfnmWvrwtu-gGDWSALbxYo14t40=s48-c-k-c0x00ffffff-no-rj" 
                                            className=' w-full h-full'
                                            alt="profile image" 
                                        />
                                    </div>

                                    <div className=' w-full'>
                                        <input 
                                            type="text" 
                                            className=' w-full bg-transparent border-b-[1px] border-b-slate-500 focus:outline-none focus:border-b-white'
                                            placeholder='Add a reply...'
                                            value={replyValue[indx]}
                                            onChange={(e) => handleReply(e, indx)}
                                        />

                                        {showReplyOperationPanel[indx] && (
                                            <div className='flex items-center justify-between mt-3'>
                                                <div className=' relative'>
                                                    <button className=' text-2xl hover:bg-neutral-800 p-2 rounded-full'
                                                    onClick={() => handleOpenRplyEmojiPanel(indx)}>
                                                        <BsEmojiSunglasses/>
                                                    </button>
                                                
                                                    {openReplyEmojiPanel[indx] && (
                                                        <div className=' absolute top-0 mt-12'>
                                                            <Picker
                                                                data={data}
                                                                emojiSize={20}
                                                                emojiButtonSize={28}
                                                                onEmojiSelect={(e) => handleReplyEmojiClick(e, indx)}
                                                                maxFrequentRows={2}
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className='flex gap-x-4'>
                                                    <button className={`px-7 py-2 rounded-full hover:bg-neutral-800`}
                                                    onClick={() => handleReplyCancel(indx)}>
                                                        Cancel
                                                    </button>

                                                    <button className={`px-7 py-2 rounded-full ${customComment.trim() ? 'bg-blue-700' : 'bg-neutral-800 text-neutral-400'}`}
                                                    onClick={() => handleThrowNewReply(indx)}>
                                                        Reply
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))} 
            </InfiniteScroll>
        </div>
    )
}

export default CommentSection;

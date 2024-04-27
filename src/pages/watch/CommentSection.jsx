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
import { BASE_URL, YOUTUBE_API_KEY, extractLinks, generateRandomID, handleDayCount } from '../../utils/Constant'
import { MdOutlineSort } from "react-icons/md";
import { BsEmojiSunglasses } from "react-icons/bs";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

const sortOptions = [
    {key: 'newestFirst', text: 'Date added (newest)'},
    {key: 'oldestFirst', text: 'Last video added'},
    {key: 'mostReply', text: 'Most Reply'},
    {key: 'leastReply', text: 'Least Reply'},
]

const CommentSection = ({ vdoId, logoURL }) => {
    const profileImg = `https://yt3.ggpht.com/yti/ANjgQV9Mml6GMMaczuenhrZ2kXfnmWvrwtu-gGDWSALbxYo14t40=s48-c-k-c0x00ffffff-no-rj`
    const dispatch = useDispatch();
    const {
        comments,
        totalCommentCount,
        nxtPageToken,
    } = useSelector(state => state.comments);
    const [commentContents, setCommentContents] = useState([]);
    const [customComment, setCustomComment] = useState('');
    const [showOperationPanel, setShowOperationPanel] = useState(false);
    const [openEmojiPanel, setOpenEmojiPanel] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [showSortOption, setShowSortOption] = useState(false);
    const [activeSortOption, setActiveSortOption] = useState({
        newestFirst: false,
        oldestFirst: false,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [moreDataLoading, setMoreDataLoading] = useState(false);
    const [fetchMoreData, setFetchMoreData] = useState(false);

    const [openReplyEmojiPanel, setOpenReplyEmojiPanel] = useState(new Array(comments.length).fill(false));
    const [showReplyOperationPanel, setShowReplyOperationPanel] = useState(new Array(comments.length).fill(false));
    const [showReply, setShowReply] = useState(new Array(comments.length).fill(false));
    const [replyValue, setReplyValue] = useState(new Array(comments.length).fill(''));
    const [showAllReplies, setShowAllReplies] = useState(new Array(comments.length).fill(true));
    const [commentOption, setCommentOption] = useState(new Array(comments.length).fill(false));

    const sortContents = (sortType) => {
        let sortedContents = [...comments];
    
        switch (sortType) {
            case 'newestFirst':
                sortedContents.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
                break;
            case 'oldestFirst':
                sortedContents.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
                break;
            case 'mostReply':
                sortedContents.sort((a, b) => b.replyCount - a.replyCount);
                break;
            case 'leastReply':
                sortedContents.sort((a, b) => a.replyCount - b.replyCount);
                break;
            default:
                break;
        }
    
        dispatch(setComments(sortedContents));
        setActiveSortOption(sortType)
    };

    const fetchComments = async (vdoCode) => {
        const commentThreads = await getComments(vdoCode);
        const commentArr = commentThreads?.data?.items;

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
        dispatch(setComments(pureValues));
        setCommentContents(pureValues);

        const commentNum = commentThreads?.data?.pageInfo?.totalResults;
        dispatch(setTotalCommentCount(commentNum));
        
        const ObjKeys = Object.keys(commentThreads?.data)
        if (ObjKeys.includes('nextPageToken')) {
            setFetchMoreData(true);
            const nxtPgToken = commentThreads?.data?.nextPageToken;
            dispatch(setNxtPgToken(nxtPgToken));
            setMoreDataLoading(true);
        } else {
            setFetchMoreData(false);
            return
        };
        
        setMoreDataLoading(false);
    };

    const nextCommentPage = async () => {
        const NEXT_COMMENT_PG_URL = `${BASE_URL}/commentThreads?textFormat=plainText&part=snippet&maxResults=50&pageToken=${nxtPageToken}&key=${YOUTUBE_API_KEY}&videoId=${vdoId}`;

        if (fetchMoreData) {
            try {
                setFetchMoreData(false);
                const fetchNextComments = await axios.get(NEXT_COMMENT_PG_URL);
                const commentArr = fetchNextComments?.data?.items;

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
                });
                setCommentContents(prev => [ ...prev, ...pureValues ])
                
                const commentNum = fetchNextComments?.data?.pageInfo?.totalResults + pureValues.length;
                dispatch(setTotalCommentCount(commentNum));
                
                const ObjKeys = Object.keys(fetchNextComments?.data)
                if (ObjKeys.includes('nextPageToken')) {
                    setFetchMoreData(true);
                    const nxtPgToken = fetchNextComments?.data?.nextPageToken;
                    dispatch(setNxtPgToken(nxtPgToken));
                    setMoreDataLoading(true);
                } else {
                    dispatch(setNxtPgToken(''));
                    setMoreDataLoading(false);
                    setFetchMoreData(false);
                };
            } catch (error) {
                console.error(error);
            }
        }
        setMoreDataLoading(false);
    };

    useEffect(() => {
        fetchComments(vdoId);

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 400);
    
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        commentContents.length > 0 && dispatch(setComments(commentContents));
    }, [commentContents]);

    const Loading = () => {
        return (<>
            {moreDataLoading ? (
                <div className='flex gap-x-4 w-full'>
                    <div className=' min-w-10 max-w-10 min-h-10 max-h-10 bg-slate-600 animate-pulse rounded-full overflow-hidden'/>

                    <div className=' w-full'>
                        {/* comment part, channel title */}
                        <div>
                            {/* channel title */}
                            <div className=' flex gap-x-2'>
                                <div className='h-5 w-[11rem] bg-slate-600 animate-pulse rounded-full'/>
                                <div className='h-5 w-[7rem] bg-slate-600 animate-pulse rounded-full'/>
                            </div>

                            {/* comment text */}
                            <div className=' mt-2 h-6 w-full bg-slate-600 animate-pulse rounded-full'/>
                            <div className=' mt-1 h-6 w-[70%] bg-slate-600 animate-pulse rounded-full'/>
                        </div>

                        {/* icons */}
                        <div className=' flex items-center mt-3'>
                            <div className='h-6 w-6 bg-slate-600 animate-pulse rounded-full'/>
                            <div className=' h-6 w-6 mx-4 bg-slate-600 animate-pulse rounded-full'/>
                            <button className=' bg-slate-600 animate-pulse rounded-full w-24 h-6'/>
                        </div>
                    </div>
                </div>
            ) : (<></>)}
        </>)
    };

    const handleThrowNewComment = (e) => {
        e.preventDefault;
        if (customComment.trim() !== '') {
            const newCommentObj = {
                commentId: generateRandomID(),
                key: generateRandomID(),
                canReply: true, 
                channelId: generateRandomID(),
                vdoId: generateRandomID(),
                replyCount: 0,
                authorChannelId: generateRandomID(),
                authorChannelUrl: generateRandomID(),
                authorDisplayName: '@SS Das',
                authorProfileImageUrl: profileImg,
                likeCount: 0,
                publishedAt: new Date().toISOString(),
                textDisplay: newComment,
                updatedAt: new Date().toISOString()
            };
            
            dispatch(setNewCommentToAdd(newCommentObj));
            setCustomComment('');
            setOpenEmojiPanel(false);
            setShowOperationPanel(false);
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

    const handleThrowNewReply = (index) => {
        if (replyValue[index] && replyValue[index].trim() !== '') {
            const tempArr = [...comments];
            const updatedComment = {
                ...tempArr[index],
                myReply: {
                    reply: replyValue[index],
                    publishedAt: new Date().toISOString(),
                    likeCount: 0,
                    user: '@SS Das',
                    profilePhoto: profileImg,
                    canReply: false,
                }, 
            }
            const newReplyCount = Object.keys(updatedComment).filter(key => key.startsWith('myReply')).length;
            if (updatedComment.replyCount === 0) {
                updatedComment.replyCount = newReplyCount;
            } else {   
                updatedComment.replyCount = (tempArr[index].replyCount || 0) + newReplyCount;
            }
            tempArr[index] = updatedComment;
            dispatch(setComments(tempArr))
            
            const tempArr1 = [...showReplyOperationPanel];
            const tempArr2 = [...openReplyEmojiPanel];
            const tempArr3 = [...showReply];
            
            tempArr1[index] = false;
            tempArr2[index] = false;
            tempArr3[index] = false;
            
            setShowReplyOperationPanel(tempArr1);
            setOpenReplyEmojiPanel(tempArr2)
            setShowReply(tempArr3)
        }
    };

    const handleShowEachReply = (index) => {
        const tempArr = [...showAllReplies];
        tempArr[index] = !tempArr[index];
        setShowAllReplies(tempArr);
    };

    const handleCommentOption = (index) => {
        const tempArr = [...commentOption];
        tempArr[index] = !tempArr[index];
        setCommentOption(tempArr);
    };
    
    const handleMouseLeave = (index) => {
        const tempArr = [...commentOption];
        tempArr[index] = false;
        setCommentOption(tempArr);
    };

    const handleRemoveComment = (index, data) => {
        const isExist = comments.some(entry => entry.commentId === data.commentId);
        if(!isExist) return;
        let newCommentArr = comments.filter(entry => entry.commentId !== data.commentId);
        dispatch(setComments(newCommentArr));
    };

    return (
        <div>
            {/* topmost part */}
            <div className=' flex items-center mb-6 space-x-14'>
                <div className=' text-[20px] font-bold'>
                    {comments.length} Comments
                </div>

                <div className={`relative cursor-pointer flex items-center space-x-2 ${showSortOption && 'bg-neutral-800'} px-5 py-2 rounded-full transition-all`}
                onClick={() => setShowSortOption(!showSortOption)}>
                    <MdOutlineSort className=' text-[22px]'/>
                    <span className=' text-lg'>Sort</span>

                    {showSortOption && (
                        <div className={` absolute top-12 -left-2 bg-neutral-800 rounded-lg overflow-hidden flex flex-col items-center justify-between w-[12rem] text-[1rem] z-20`}>
                            {sortOptions.map((data, i) => (
                                <button className={`w-full ${activeSortOption[data.key] && ' bg-slate-600'} hover:bg-gray-700 active:scale-105 transition-all py-3`}
                                key={i + data.key}
                                onClick={() => sortContents(data.key)} >
                                    {data.text}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* add your comment */}
            <div className=' flex gap-x-3 w-full'>
                <div className=' w-10 h-10 rounded-full overflow-hidden'>
                    <img 
                        src={profileImg} 
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
                                    <div className=' absolute top-0 mt-12 z-30 '>
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
            loader={<Loading/>}
            className=' h-full flex flex-col gap-y-7 pt-10 w-full'
            hasMore={true}
            next={nextCommentPage}
            dataLength={comments.length}>
                {isLoading ? (<>
                    {[...new Array(9)].map((_, indx) => (
                        <div className='flex gap-x-4 w-full'
                        key={indx}>
                            <div className=' min-w-10 max-w-10 min-h-10 max-h-10 bg-slate-600 animate-pulse rounded-full overflow-hidden'/>

                            <div className=' w-full'>
                                {/* comment part, channel title */}
                                <div>
                                    {/* channel title */}
                                    <div className=' flex gap-x-2'>
                                        <div className='h-5 w-[11rem] bg-slate-600 animate-pulse rounded-full'/>
                                        <div className='h-5 w-[7rem] bg-slate-600 animate-pulse rounded-full'/>
                                    </div>

                                    {/* comment text */}
                                    <div className=' mt-2 h-6 w-full bg-slate-600 animate-pulse rounded-full'/>
                                    <div className=' mt-1 h-6 w-[70%] bg-slate-600 animate-pulse rounded-full'/>
                                </div>

                                {/* icons */}
                                <div className=' flex items-center mt-3'>
                                    <div className='h-6 w-6 bg-slate-600 animate-pulse rounded-full'/>
                                    <div className=' h-6 w-6 mx-4 bg-slate-600 animate-pulse rounded-full'/>
                                    <button className=' bg-slate-600 animate-pulse rounded-full w-24 h-6'/>
                                </div>
                            </div>
                        </div>
                    ))}
                </>) : (<>
                    {comments.map((cmnt, indx) => (
                        <div className='flex gap-x-4 w-full relative group'
                        key={cmnt.key + indx}
                        onMouseLeave={() => handleMouseLeave(indx)}>
                            <Link className=' min-w-10 max-w-10 min-h-10 max-h-10 rounded-full overflow-hidden'
                            to={`/channel/${cmnt.authorChannelId}`}>
                                <img 
                                    src={cmnt.authorProfileImageUrl} 
                                    className=' w-full h-full'
                                    alt="profile image" 
                                />
                            </Link>

                            <div className=' w-full'>
                                {/* comment part, channel title */}
                                <div>
                                    {/* channel title */}
                                    <div className=' flex gap-x-2'>
                                        <Link className='text-[13.5px]'
                                        to={`/channel/${cmnt.authorChannelId}`}>
                                            {cmnt.authorDisplayName}
                                        </Link>

                                        <div className='text-[13px] text-neutral-400'>
                                            {handleDayCount(cmnt.publishedAt)}
                                        </div>
                                    </div>

                                    {/* comment text */}
                                    <div className=' mt-1 text-[14px] whitespace-pre-line'>
                                        {extractLinks(cmnt.textDisplay)}
                                    </div>
                                </div>

                                {/* icons */}
                                <div className=' flex items-center mt-3'>
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

                                {/* add your reply part */}
                                {showReply[indx] && (
                                    <div className=' flex gap-x-3 w-full mt-4'>
                                        {/* profile image */}
                                        <div className=' w-10 h-10 rounded-full overflow-hidden'>
                                            <img 
                                                src={profileImg} 
                                                className=' w-full h-full'
                                                alt="profile image" 
                                            />
                                        </div>

                                        <div className=' w-full'>
                                            {/* reply input */}
                                            <input 
                                                type="text"
                                                autoFocus
                                                className=' w-full bg-transparent border-b-[1px] border-b-slate-500 focus:outline-none focus:border-b-white'
                                                placeholder='Add a reply...'
                                                value={replyValue[indx]}
                                                onChange={(e) => handleReply(e, indx)}
                                            />

                                            {/* operating part */}
                                            {showReplyOperationPanel[indx] && (
                                                <div className='flex items-center justify-between mt-2'>
                                                    {/* emoji */}
                                                    <div className=' relative'>
                                                        <button className=' text-xl hover:bg-neutral-800 p-2 rounded-full'
                                                        onClick={() => handleOpenRplyEmojiPanel(indx)}>
                                                            <BsEmojiSunglasses/>
                                                        </button>
                                                    
                                                        {openReplyEmojiPanel[indx] && (
                                                            <div className=' absolute top-0 mt-12 z-20'>
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

                                                    {/* buttons */}
                                                    <div className='flex gap-x-4'>
                                                        <button className={`px-6 py-2 rounded-full hover:bg-neutral-800`}
                                                        onClick={() => handleReplyCancel(indx)}>
                                                            Cancel
                                                        </button>

                                                        <button className={`px-6 py-2 rounded-full ${replyValue[indx] ? 'bg-blue-700' : 'bg-neutral-800 text-neutral-400'}`}
                                                        onClick={() => handleThrowNewReply(indx)}>
                                                            Reply
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* show replies blue button */}
                                {cmnt.replyCount > 0 && (
                                    <button className='w-fit px-3 py-1 rounded-full flex items-center gap-x-2 mt-2 text-blue-500 hover:text-blue-700 font-bold hover:bg-blue-300 transition-all'
                                    onClick={() => handleShowEachReply(indx)}>
                                        {showAllReplies[indx] ? (
                                            <VscTriangleUp className=' text-xl'/>
                                        ) : (
                                            <VscTriangleDown className=' text-xl'/>
                                        )}
                                        <span>{cmnt.replyCount} reply</span>
                                    </button>
                                )}

                                {/* my reply */}
                                {cmnt.myReply && cmnt.myReply.reply.trim() !== '' && showAllReplies[indx] && (
                                    <div className='mt-3 flex justify-start gap-x-3'>
                                        <div className=' w-9 h-9 rounded-full overflow-hidden'>
                                            <img 
                                                src={profileImg} 
                                                className=' w-full h-full'
                                                alt="profile image" 
                                            />
                                        </div>

                                        <div>
                                            {/* channel title */}
                                            <div className=' flex gap-x-2'>
                                                <div className='text-[13.5px]'>
                                                    {cmnt.myReply.user}
                                                </div>

                                                <div className='text-[13px] text-neutral-400'>
                                                    {handleDayCount(cmnt.myReply.publishedAt)}
                                                </div>
                                            </div>

                                            {/* comment text */}
                                            <div className=' mt-1 text-[14px] whitespace-pre-line'>
                                                {extractLinks(cmnt.myReply.reply)}
                                            </div>

                                            {/* icons */}
                                            <div className=' flex items-center '>
                                                <div className='flex mt-2'>
                                                    <AiOutlineLike className=' h-6 w-6 mr-1'/> 
                                                    {cmnt.myReply.likeCount !== 0 && (
                                                        <span className=' text-[14px]'>
                                                            {cmnt.myReply.likeCount}
                                                        </span> 
                                                    )}
                                                </div>

                                                <AiOutlineDislike className=' h-6 w-6 mx-4'/>
                                                
                                                {cmnt.myReply.canReply && (
                                                    <button className=' hover:bg-neutral-700 px-5 py-1.5 rounded-full text-sm'
                                                    onClick={() => handleReplyShow(indx)}>
                                                        Reply
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className=' absolute right-0'>
                                <div className='absolute right-0 top-2 hidden group-hover:flex items-center justify-center w-8 h-8 bg-neutral-800 rounded-full overflow-hidden cursor-pointer'
                                onClick={() => handleCommentOption(indx)}>
                                    <BsThreeDotsVertical className=' text-xl'/>
                                </div>

                                {commentOption[indx] && (
                                    <button className=' absolute right-0 top-10 flex flex-wrap bg-neutral-800 hover:bg-slate-800 pl-3 py-2 my-1 rounded-md overflow-hidden w-[12rem]'
                                    onClick={() => handleRemoveComment(indx, cmnt)}>
                                        Remove Comment
                                    </button>
                                )}
                            </div>
                        </div>
                    ))} 
                </>)}
            </InfiniteScroll>
        </div>
    );
}

export default CommentSection;

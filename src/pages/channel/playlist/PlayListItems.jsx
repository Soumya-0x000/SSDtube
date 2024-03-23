import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BASE_URL, YOUTUBE_API_KEY } from '../../../utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setBannerUrl, setChannelName, setCounting, setNextPgToken, setPlayListData } from '../../../store/PlayListSlice';
import { RxCross1, RxShuffle } from "react-icons/rx";
import { RxLoop } from "react-icons/rx";
import { SlOptionsVertical } from "react-icons/sl";
import Img from '../../../components/lazyLoadImage/Img';
import InfiniteScroll from 'react-infinite-scroll-component';

const PlayListItems = () => {
    const {id} = useParams();
    console.log(id)
    const {
        playListTitle, 
        playListData, 
        channelName, 
        nxtPgToken
    } = useSelector(state => state.playlist);
    const {totalItemCount, currentItemsCount} = useSelector(state => state.playlist);
    const channelID = useSelector(state => state.channel.channelId);

    const dispatch = useDispatch();
    const [currentVdoCount, setCurrentVdoCount] = useState(1);
    const [resultCount, setResultCount] = useState({
        total: 0,
        current: 0,
    });
    const [dataToRender, setDataToRender] = useState([]);
    
    const fetchFullPlayList = async(playListId) => {
        const PLAY_LIST_DATA_URL = `${BASE_URL}/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${playListId}&key=${YOUTUBE_API_KEY}`;
        
        try {
            const getFullPlayList = await axios.get(PLAY_LIST_DATA_URL);
            console.log(getFullPlayList)
            const vdoItems = getFullPlayList?.data?.items;
            const channelName = vdoItems[0]?.snippet?.channelTitle
            const totalCount = getFullPlayList?.data?.pageInfo?.totalResults;
            setResultCount({
                total: totalCount,
                current: vdoItems.length,
            })
            const nextPgToken = getFullPlayList?.data?.nextPageToken;
            let mainData = [];
            vdoItems.map((item, indx) => {
                const videoId = item?.contentDetails?.videoId;
                const publishedAt = item?.contentDetails?.videoPublishedAt;
                const description = item?.snippet?.description;
                const title = item?.snippet?.title;
                const thumbnail = item?.snippet?.thumbnails?.maxres?.url
                                || item?.snippet?.thumbnails?.high?.url
                                || item?.snippet?.thumbnails?.medium?.url
                                || item?.snippet?.thumbnails?.standard?.url
                                || item?.snippet?.thumbnails?.default?.url
                mainData.push({videoId, publishedAt, description, title, thumbnail});                
            });
            setDataToRender(mainData);
            dispatch(setPlayListData(mainData));
            dispatch(setChannelName(channelName));
            dispatch(setCounting({totalCount, currentCount: currentVdoCount}));
            dispatch(setNextPgToken(nextPgToken));
        } catch (error) {
            console.error(error);
        }
    };

    const fetchNxtPgData = async() => {
        const NXT_PG_URL = `${BASE_URL}/playlistItems?part=snippet%2CcontentDetails&maxResults=50&pageToken=${nxtPgToken}&playlistId=${id}&key=${YOUTUBE_API_KEY}`;

        if (resultCount.current <= resultCount.total) {
            try {
                const getNxtPgData = await axios.get(NXT_PG_URL);
                const vdoItems = getNxtPgData?.data?.items;
                const nextPgToken = getNxtPgData?.data?.nextPageToken;
                let moreItems = [];
                vdoItems.map((item, indx) => {
                    const videoId = item?.contentDetails?.videoId;
                    const publishedAt = item?.contentDetails?.videoPublishedAt;
                    const description = item?.snippet?.description;
                    const title = item?.snippet?.title;
                    const thumbnail = item?.snippet?.thumbnails?.maxres?.url
                                    || item?.snippet?.thumbnails?.high?.url
                                    || item?.snippet?.thumbnails?.medium?.url
                                    || item?.snippet?.thumbnails?.standard?.url
                                    || item?.snippet?.thumbnails?.default?.url
                    moreItems.push({videoId, publishedAt, description, title, thumbnail});                  
                });
                setDataToRender(prevData => [...prevData, ...moreItems]);
                dispatch(setNextPgToken(nextPgToken));
            } catch (error) {
                console.error(error);
            }
        };
    }
    
    useEffect(() => {
        dispatch(setPlayListData(dataToRender))
    }, [dataToRender])

    useEffect(() => {
        fetchFullPlayList(id);
    }, []);

    return (
        <div className=' px-5'>
            <div className=' rounded-xl overflow-hidden border'>
                <div className='space-y-2 bg-neutral-800 px-3 py-3'>
                    {/* Upper part */}
                    <div className='relative flex items-center justify-between'>
                        <div className='text-[.84rem] space-y-1'>
                            <Link 
                            className='text-[1.3rem] font-bold'
                            to={`/dedicatedPlaylist/${id}`}>
                                {playListTitle}
                            </Link>
                            <p><Link to={`/channel/${channelID}`}>{channelName}</Link> - {currentItemsCount}/{totalItemCount}</p>
                        </div>
                        <RxCross1 className=' text-2xl' />
                    </div>

                    {/* Lower part */}
                    <div className='flex items-center justify-between'>
                        <div className='flex text-2xl items-center gap-x-5'>
                            <RxLoop/>
                            <RxShuffle/>
                        </div>
                        <SlOptionsVertical className=' text-xl'/>
                    </div>
                </div>

                <InfiniteScroll 
                next={fetchNxtPgData}
                dataLength={playListData.length}
                height={'26rem'}
                className={` max-h-[28rem] overflow-y-auto mt-2`}
                hasMore={playListData.length <= resultCount.total}>
                    {playListData.map((data, index) => (
                        <div className='py-1.5 cursor-pointer hover:bg-neutral-700 pl-2 flex gap-x-3'
                        key={data?.videoId+index}>
                            <div className=' text-[.8rem] text-gray-400 flex items-center'>
                                {index+1}
                            </div>

                            <div className=' min-w-[7rem] h-[4rem] rounded-lg overflow-hidden'>
                                <Img
                                    src={data?.thumbnail}
                                    className={` w-full h-full`}
                                />
                            </div>

                            <div className=' space-y-2 '>
                                <div className='line-clamp-1 w-full'>{data?.title}</div>
                                <p className='text-gray-400 text-[.8rem]'>{channelName}</p>
                            </div>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default PlayListItems;

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL, YOUTUBE_API_KEY } from '../../../utils/Constant';
import { useParams } from 'react-router-dom';
import PlayListSkeleton from './PlayListSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getPlayLists } from '../../../utils/Hooks';
import { MdOutlineSort } from 'react-icons/md';
import PlayListCard from './PlayListCard';

const sortOptions = [
    {key: 'newestFirst', text: 'Date added (newest)'},
    {key: 'oldestFirst', text: 'Last video added'},
    {key: 'most', text: 'Most Video'},
    {key: 'least', text: 'Least Video'},
]

const PlayListSection = ({ isChannelContentLoaded }) => {
    const {id} = useParams()
    const [playListDataStatus, setPlayListDataStatus] = useState(true);
    const [resultCount, setResultCount] = useState({
        total: 0,
        current: 0  
    });
    const [nxtPgToken, setNxtPageToken] = useState('');
    const [playListContents, setPlayListContents] = useState([]);
    const [showSortOption, setShowSortOption] = useState(false);
    const [activeSortOption, setActiveSortOption] = useState({
        newestFirst: false,
        oldestFirst: false,
        most: false,
        least: false,
    });
    const skeletonNumbers = 18;

    const handlePlaylists = async (channelId) => {
        const playListData = await getPlayLists(channelId);
        playListData?.status === 200 ? setPlayListDataStatus(true) : setPlayListDataStatus(false);
        const nextPageToken = playListData?.data?.nextPageToken;
        setNxtPageToken(nextPageToken);
        const playListItems = playListData?.data?.items;
        setPlayListContents(playListItems);
        const playListResultCount = {
            total: playListData?.data?.pageInfo?.totalResults,
            current: playListData?.data?.pageInfo?.resultsPerPage,
        }
        setResultCount({total: playListResultCount.total, current: playListResultCount.current})
    };

    const fetchMorePlayLists = async () => {
        const MORE_PLAYLISTS = `${BASE_URL}/playlists?part=snippet%2CcontentDetails&channelId=${id}&maxResults=25&pageToken=${nxtPgToken}&key=${YOUTUBE_API_KEY}`;

        try {
            const loadMoreData = await axios.get(MORE_PLAYLISTS);
            const playListItems = loadMoreData?.data?.items;
            setNxtPageToken(loadMoreData?.data?.nextPageToken);
            setPlayListContents(prevResults => [...prevResults, ...playListItems]);
            setResultCount(prevResultCount => ({
                total: loadMoreData?.data?.pageInfo?.totalResults, 
                current: prevResultCount.current + loadMoreData?.data?.pageInfo?.resultsPerPage
            }))
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handlePlaylists(id);
    }, []);

    const renderPlayListSkeleton = new Array(skeletonNumbers).fill().map((_, indx) => (
        <PlayListSkeleton key={indx}/>
    ));

    const handleSelectedSortType = (sortType) => {
        const sortFunction = {
            'newestFirst': (a, b) => new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt), 
            'oldestFirst': (a, b) => new Date(a.snippet.publishedAt) - new Date(b.snippet.publishedAt), 
            'most': (a, b) => b.contentDetails.itemCount - a.contentDetails.itemCount,
            'least': (a, b) => a.contentDetails.itemCount - b.contentDetails.itemCount,
        };
        
        const sortedContents = [...playListContents].sort(sortFunction[sortType]);
        setPlayListContents(sortedContents);

        const selectedOptionColor = Object.fromEntries(Object.keys(activeSortOption).map(key => [key, key === sortType]))
        setActiveSortOption(selectedOptionColor)
    };
        
    return (
        <>
            {playListDataStatus ? (
                <>
                    {isChannelContentLoaded && (
                        <div className='text-[.9rem] w-full flex items-center justify-between'>
                            <p>Created playlists</p>
                            <div className={`flex items-center gap-x-2 cursor-pointer hover:bg-slate-800 ${showSortOption && 'bg-slate-800'} rounded-lg  px-3 py-1 relative`}
                            onClick={() => setShowSortOption(!showSortOption)}>
                                <MdOutlineSort className=' text-2xl' />
                                <p>Sort By</p>

                                {showSortOption && (
                                    <div className={`z-20 absolute top-10 right-0 bg-neutral-800 rounded-lg overflow-hidden flex flex-col items-center justify-between w-[12rem] text-[1rem]`}>
                                        {sortOptions.map((data, i) => (
                                            <button className={`w-full ${activeSortOption[data.key] && ' bg-slate-600'} hover:bg-gray-700 active:scale-105 transition-all py-3`}
                                            key={i + data.key}
                                            onClick={() => handleSelectedSortType(data.key)} >
                                                {data.text}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <InfiniteScroll 
                    className='pt-2 grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-y-9 gap-x-2'
                    dataLength={playListContents.length}
                    next={fetchMorePlayLists}
                    hasMore={resultCount.current <= resultCount.total}>
                        {isChannelContentLoaded ? (
                            <>
                                {playListContents.map((item, indx, orgArr) => (
                                    <PlayListCard
                                        itemData = {item} 
                                        index = {indx}
                                        key={indx}
                                        orgArr={orgArr}
                                        channelID={id}
                                    />
                                ))}
                            </>
                        ) : (
                            <>{renderPlayListSkeleton}</>
                        )}
                    </InfiniteScroll>
                </>
            ) : (
                <div className=' text-gray-300 text-6xl flex items-center justify-center font-bold'>
                    This channel has no Playlists yet
                </div>
            )}
        </>
    )
}

export default PlayListSection;

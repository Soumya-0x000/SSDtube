import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img';

const DedicatedPlaylist = () => {
    const {
        playListTitle, 
        playListData, 
        channelName, 
        nxtPgToken,
        playListBannerUrl,
        totalCount
    } = useSelector(state => state.playlist);

    return (
        <div className=' ring h-screen py-2 pl-2'>
            <div className='w-[22rem] h-full bg-slate-600 rounded-lg overflow-hidden bg-no-repeat'
                style={{ 
                    backgroundImage: `url(${playListBannerUrl})`,
                    backgroundSize: 'cover',
                    backdropFilter: 'blur(18px)',
                    
                }}>
                
            </div>
            <div>

            </div>
        </div>
    )
}

export default DedicatedPlaylist;

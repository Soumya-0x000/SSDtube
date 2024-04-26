import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getSearchResults } from '../../utils/Hooks';

const Search = () => {
    const {
        searchItem,
        searchResult,
        totalSearchResultCount,
    } = useSelector(state => state.search)
    
    console.log(searchItem);

    const fetchAllSearchResults = async () => {
        const fetchedResults = await getSearchResults();
        console.log(fetchedResults);
    };

    useEffect(() => {
        fetchAllSearchResults(searchItem.trim());
    }, []);

    return (
        <div>Search</div>
    )
}

export default Search
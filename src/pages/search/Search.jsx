import React from 'react'
import { useSelector } from 'react-redux';

const Search = () => {
    const {
        searchItem,
        searchResult,
        totalSearchResultCount,
    } = useSelector(state => state.search)
    
    console.log(searchItem);
    return (
        <div>Search</div>
    )
}

export default Search
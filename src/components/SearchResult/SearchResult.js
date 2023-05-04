import React from 'react'
import SearchItem from './SearchItem/SearchItem'
import classes from './SearchResult.module.css'
import { useUserContext } from '../../context/userContext'

const SearchResult = ({focus}) => {
  const {searchResults} = useUserContext()
  return (
    <div className={focus ? `${classes.wrapper} ${classes.open}` : classes.wrapper}>
      {searchResults.length > 0 ?  searchResults.map(user => (
        <SearchItem {...user} key={user.id}/>
      )) : <h4>No result found</h4>}
    </div>
  )
}

export default SearchResult

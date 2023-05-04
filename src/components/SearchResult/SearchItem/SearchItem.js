import React from 'react'
import classes from './SearchItem.module.css'
import { useUserContext } from '../../../context/userContext'

const SearchItem = ({name, id}) => {
  const {setUserId, setName} = useUserContext()
  const handleClick = (e) => {
    setName(e.target.textContent)
    setUserId(e.target.id)
  }
  return (
    <div className={classes.wrapper}>
      <span id={id} onClick={handleClick}>{name}</span>
    </div>
  )
}

export default SearchItem

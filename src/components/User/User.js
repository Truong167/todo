import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import classes from './User.module.css'
import Title from '../Title/Title'
import SearchResult from '../SearchResult/SearchResult'
import { useUserContext } from '../../context/userContext'

const User = () => {
  const {setSearchResult, setName, name} = useUserContext()
    const [focus, setFocus] = useState(false)
    const onChange = (e) => {
      setName(e.target.value)
      setSearchResult(e.target.value)
    }

  return (
    <div className={classes.wrapper}>
      <Title title='User'/>
      <div className={classes.search}>
        <input 
            type='text' 
            value={name} 
            onChange={onChange} 
            placeholder='Select user' 
            className={classes["search-input"]} 
            onFocus={() => setFocus(true)} 
            onBlur={() => setFocus(false)}
        />
        {focus ? 
          <FontAwesomeIcon icon={faMagnifyingGlass} className={classes.icon}/>
        :
          <FontAwesomeIcon icon={faChevronDown} className={classes.icon}/>
        }
        <SearchResult focus={focus}/>
      </div>
    </div>
  )
}

export default User

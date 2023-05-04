import React from 'react'
import classes from './Title.module.css'

const Title = ({title}) => {
  return (
    <div className={classes.wrapper}>
      <h3>{title}</h3>
      <span className={classes.line}></span>
    </div>
  )
}

export default Title

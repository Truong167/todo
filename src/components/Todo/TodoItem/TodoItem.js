import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCheck, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import classes from './TodoItem.module.css'
import { useTodoContext } from '../../../context/todoContext'

const TodoItem = ({id, title, completed}) => {
    const {updateStatusTask} = useTodoContext()
    const [loading, setLoading] = useState(false)

    const check = async (e) => {
        setLoading(true)
        if(await updateStatusTask(e.target.id)){
          setLoading(false)
        }
    }

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>
        {completed ? <FontAwesomeIcon icon={faCheck} className={classes['finish']}/> : <FontAwesomeIcon icon={faXmark} className={classes['not-finish']}/>}
        <span>{title}</span>
      </div>
      {!completed &&
        <div className={loading ? `${classes.btn} ${classes.show}` : classes.btn} >
            <FontAwesomeIcon icon={faCircleNotch} className={loading ? `${classes.spinner} ${classes.show1}` : classes.spinner}/>
            <span id={id} onClick={check}>Mark done</span>
        </div>
      }
    </div>
  )
}

export default TodoItem

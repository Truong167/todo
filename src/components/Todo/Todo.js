import Title from '../Title/Title'
import classes from './Todo.module.css'
import TodoItem from './TodoItem/TodoItem'
import { useTodoContext } from '../../context/todoContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { useUserContext } from '../../context/userContext'

const Todo = () => {
  const {name} = useUserContext()
  const {todosByUserId, todosLoading, tasksDone} = useTodoContext()
  let output = []
  if(!todosLoading){
    todosByUserId.map(todo => {
      output.push(<TodoItem key={todo.id} {...todo}/>)
      output.push(<hr key={`${todo.id} ${todo.userId}`}/>)
    })
  }
  output.pop()
  return (
    <div className={classes.wrapper}>
      <Title title='Tasks'/>
      <div className={classes.tasks}>
        {name ? (todosLoading ? 
          <FontAwesomeIcon icon={faCircleNotch} className={classes.spinner}/>
        :
          todosByUserId.length > 0 && output) : <h4 className={classes['no-data']}>No data</h4>
        }
        </div>
      <div style={{marginTop: 8}}>{(name && todosByUserId.length > 0) ? `Done ${tasksDone}/${todosByUserId.length}` : `Done 0/0 tasks`}</div>
    </div>
  )
}

export default Todo

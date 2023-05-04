import { createContext, useContext, useEffect, useReducer } from "react";
import { todoReducer } from "../reducer/todoReducer";
import { useUserContext } from "./userContext";

const TodoContext = createContext()
const TodoContextProvider = ({children}) => {
    const {id} = useUserContext()
    const [todoState, dispatch] = useReducer(todoReducer, {
        todos: [],
        todosByUserId: [],
        userIdFetched: [],
        todosLoading: false,
        tasksDone: ''
    })

    const fetchTodos = async (userId) => {
        const check = todoState.userIdFetched.some(id => id === parseInt(userId))
        let jsonData = []
        if(!check){
            setLoading()
            setTimeout(async () => {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
                jsonData = await response.json()
                dispatch({
                    type: 'GET_TODO_LIST',
                    payload: {todos: jsonData, userId: parseInt(userId)}
    
                })
            }, 800)
        } else {
            jsonData = todoState.todos.filter(todo => todo.userId === parseInt(userId))
            dispatch({
                type: 'GET_TODO_LIST',
                payload: {todosByUserId: jsonData}
            })
        }
    }

    const updateStatusTask = async (id, data = {completed: true}) => {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(data)
        })
        dispatch({
            type: 'COMPLETE_TASK',
            payload: {id: id}

        })
        return true
    }

    const setLoading = () => {
        dispatch({
            type: 'SET_LOADING',
            payload: {todosLoading: true}
        })
    }

    useEffect(() => {
        if(id){
            fetchTodos(id)
        }
    }, [id])

    const TodoContextData = {...todoState, updateStatusTask, fetchTodos}
    return (
        <TodoContext.Provider value={TodoContextData}>{children}</TodoContext.Provider>
    )
}

export default TodoContextProvider

export const useTodoContext = () => {
    return useContext(TodoContext)
}
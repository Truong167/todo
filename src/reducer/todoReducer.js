import { countArr, sortArr } from "../utils/handleArray"

export const todoReducer = (state, action) => {
    const {type, payload: {todos, todosByUserId, userId, id, todosLoading}} = action
    switch(type) {
        case 'GET_TODO_LIST':
            const arr = todosByUserId ? sortArr(todosByUserId) : sortArr(todos)
            const todosArr = todos ? [...state.todos, ...todos] : state.todos
            return {
                ...state,
                todosLoading: false,
                todos: todosArr,
                todosByUserId: arr,
                userIdFetched: [...state.userIdFetched, userId],
                tasksDone: countArr(arr)
            }
        case 'COMPLETE_TASK':
            const updateTodosByUserId = state.todosByUserId.map(todo => todo.id === parseInt(id) ? {...todo, completed: true} : todo)
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === parseInt(id) ? {...todo, completed: true} : todo),
                todosByUserId: sortArr(updateTodosByUserId),
                tasksDone: countArr(updateTodosByUserId)
            }
        case 'SET_LOADING':
            return {
                ...state,
                todosLoading
            }
        default: 
            return state
    }
}
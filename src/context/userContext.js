import { createContext, useContext, useEffect, useReducer } from "react";
import { userReducer } from "../reducer/userReducer";

const UserContext = createContext()
const UserContextProvider = ({children}) => {
    const [userState, dispatch] = useReducer(userReducer, {
        users: [],
        searchResults: [],
        id: '',
        name: ''
    })

    const fetchUser = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const jsonData = await response.json();
        dispatch({
            type: 'GET_USERS',
            payload: {users: jsonData, searchResults: jsonData}
        })
    }

    const setUserId = (id) => {
        dispatch({
            type: 'SET_USER_ID',
            payload: {id: id}
        })
    }

    const setName = (name) => {
        dispatch({
            type: 'SET_NAME',
            payload: {name: name}
        })
    }

    const setSearchResult = name => {
        if(name.length > 0) {
            let temp = userState.users.filter(user => (user.name.toLowerCase()).includes(name.toLowerCase()))
            dispatch({
                type: 'SET_SEARCH_RESULTS',
                payload: {searchResults: temp}
            })
        } else {
            dispatch({
                type: 'SET_SEARCH_RESULTS',
                payload: {searchResults: userState.users}
            })
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const userContextData = {
        ...userState,
        setUserId,
        setSearchResult,
        setName
    }

    return (
        <UserContext.Provider value={userContextData}>{children}</UserContext.Provider>
    )
}

export default UserContextProvider

export const useUserContext = () => {
    return useContext(UserContext)
}
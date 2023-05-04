export const userReducer = (state, action) => {
    const {type, payload: {users, searchResults, id, name}} = action
    switch(type) {
        case 'GET_USERS':
            return {
                ...state,
                users,
                searchResults
            }
        case 'SET_SEARCH_RESULTS':
            return {
                ...state,
                searchResults
            }
        case 'SET_USER_ID':
            return {
                ...state,
                id
            }
        case 'SET_NAME':
            return {
                ...state,
                name
            }
        default:
            return state
    }
}
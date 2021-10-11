const currentUser = (state = {}, action) => {
    switch(action.type){
        case "LOG_IN":
            return {
                token: action.payload,
                loggedIn: true
            }
        case "LOG_OUT":
            return {
                ...state,
                user: {},
            
                loggedIn: false
            }
        default:
            return state
    }
}

export default currentUser;
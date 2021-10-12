const initialState ={
    token: '',
    role: '',
    id: '',
    loggedIn: false,
}

const currentUser = (state = initialState, action) => {
    switch(action.type){
        case "LOG_IN":
            return {
                ...state,
                token: action.payload.token,
                role: action.payload.user.roles[0].name,
                id: action.payload.user.id,
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
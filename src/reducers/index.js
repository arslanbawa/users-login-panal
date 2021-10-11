import currentUser from './currentUser'
import CurrentuserRole from './CurrentuserRole'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    currentUser,CurrentuserRole
})

export default rootReducer
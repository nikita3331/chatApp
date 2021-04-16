import { combineReducers } from 'redux'
import {SET_AUTHKEY} from '../actions/user'

const user = (state = {authKey:null }, action) => {
    switch (action.type) { 
        case SET_AUTHKEY:
            return { ...state, authKey: action.payload } 
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user
})

export default rootReducer

import { combineReducers } from 'redux'
import {SET_AUTHKEY} from '../actions/user'
import {SET_MESSAGES} from '../actions/messages'
import {messagesState,userState} from '../types'

const user = (state:userState = {authKey:null }, action) => {
    switch (action.type) { 
        case SET_AUTHKEY:
            return { ...state, authKey: action.payload } 
        default:
            return state
    }
}
const messages = (state:messagesState = {messageArray:[] }, action) => {
    switch (action.type) { 
        case SET_MESSAGES:
            return { ...state, messageArray: action.payload } 
        default:
            return state
    }
}


const rootReducer = combineReducers({
    user,messages
})

export default rootReducer

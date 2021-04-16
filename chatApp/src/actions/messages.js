import {getAllMessages} from '../func/messages'
export const setMessages = messageArray => {
    return {
        type: SET_MESSAGES,
        payload: messageArray
    }
}

export const fetchMessages = () => {
    return async (dispatch, getState) => {
        let {authKey}=getState().user
        let messages=await getAllMessages(authKey)
        dispatch(setMessages(messages))
    }
}

export const SET_MESSAGES = 'SET_MESSAGES'


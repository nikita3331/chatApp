import {login} from '../func/users'
export const setAuthKey = key => {
    return {
        type: SET_AUTHKEY,
        payload: key
    }
}

export const handleLogin = (email,pass) => {
    return async (dispatch, getState) => {
        // let {shopID}=getState().shop
        let resp=await login(email,pass)
        if(resp.success){
            dispatch(setAuthKey(resp.authKey))
        }
    }
}


export const SET_AUTHKEY = 'SET_AUTHKEY'

import {MAIN_URL} from '../config'
export async function login(login,password) {
    let url = `${MAIN_URL}/users/login`
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                login:login, 
                password:password 
            })
        });
        let json = await response.json();
        return json
    }
    catch (error) {
        console.error(error);
        return {success:false}
    }
}
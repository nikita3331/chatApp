import {MAIN_URL} from '../config/config'
export async function getAllMessages(authKey) {
    let url = `${MAIN_URL}/messages/getAll`
    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "authKey":authKey
            }
        });
        let json = await response.json();
        console.log(json)
        return json.success?json.messages:[]
    }
    catch (error) {
        console.error(error);
        return []
    }
}
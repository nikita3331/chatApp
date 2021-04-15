export async function login(login,password) {
    let url = 'https://madsprtest.herokuapp.com/users/login'
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                login:login, //Nikita
                password:password //Babcia2
            })
        });
        let json = await response.json();

        console.log(json)
        return json

    }
    catch (error) {
        console.error(error);
        return {success:false}
    }
}
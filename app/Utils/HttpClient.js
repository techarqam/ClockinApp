import  Helpers from '@Utils/Helpers';
import AuthService from '@Service/Auth';

 const BASE_URL = 'http://52.66.212.132/clockInApp/Service/';


function get(endpoint, params) {
    return request(endpoint, params);    
}

function post(endpoint, params) {
    return request(endpoint, params, "POST");
}

function put(endpoint, params) {
    return request(endpoint, params, "PUT");
}

// function delete(endpoint, params) {
//     return fetch(endpoint, params, "DELETE");
// }

async function request(endpoint, params = null, method = 'GET') {
    let userData = await AuthService.getAccount();
    console.log('token',userData);
    let token ;  // Helpers.getApiToken();
    if(userData != null){
        token = userData.token
    }
    let url = BASE_URL + endpoint;
    const config = {
        method: method,
        headers: {
            "content-Type" : "application/json",
            "token" : token
        }
    };
    console.log("config",config.headers);
    if(method != 'GET') {
        config['body'] = JSON.stringify(params);
        console.log('send data', config);
    }
    console.log('url', url);
  
    return fetch(url, config ).then((response) => response.json());
}

async function upload(endpoint, params, method = 'POST') {
    try {
        let token = "647ac4ed7e82829132705af7ff02a8e1";
        let url = BASE_URL + endpoint;
        const config = {
            method: method, //'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token,
            },
            body: params,
        };
        console.log('url', url);
        return fetch(url, config ).then((response) => response.json());   
    } catch (error) {
        console.log('error', error);
    }
}


export default {
    get,
    post,
    put,
    // delete,
    upload,    
}
import HttpClient from '@Utils/HttpClient'
import Storage from '@Utils/Storage'
import { AsyncStorage } from 'react-native';


async function login(mobile, pass) {
    let endpoint = 'userValidation';
    let user = {userLogin:mobile,userPwd:pass}
    // console.log("endpoint"+endpoint);
    return HttpClient.post(endpoint,user);
}



function register(data) {
    let endpoint = 'register.php?mobile='+data.mobile+'&name='+data.name+'&email='+data.email+'&pass='+data.pass;
    console.log("endpoint"+endpoint);
    return HttpClient.get(endpoint);
}

async function getAccount() {
    return await Storage.get('account');
}

async function setAccount(data) {
    return await Storage.set('account', data);
}

async function logout() {
    return await Storage.set('account', null);
    console.log('logout');
}

export default {
    register,
    login,
    logout,
    getAccount,
    setAccount,
}
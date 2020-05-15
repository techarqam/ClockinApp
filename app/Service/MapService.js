import HttpClient from '@Utils/HttpClient'
import Storage from '@Utils/Storage'
import { AsyncStorage } from 'react-native';


function MapPing() {
    let endpoint = 'mapPing.php';
    return HttpClient.put(endpoint);
}

async function startShift(data) {
    let endpoint = 'punchDetails';
    return HttpClient.put(endpoint, data);
}

async function startMyDay(data) {
    let endpoint = 'punchDayDetails';
    return HttpClient.put(endpoint, data);
}

export default {
    MapPing,
    startShift,
    startMyDay
}
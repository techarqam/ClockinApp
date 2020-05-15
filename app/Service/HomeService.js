import HttpClient from '@Utils/HttpClient'


function CalenderData(staffId) {
    let endpoint = 'schedules/';
    let data = {
        "staffID" : staffId
    }
    console.log("data",data);
    return HttpClient.post(endpoint,data);
}
function keyList(key) {
    let endpoint = 'key_list.php?key='+key;
    return HttpClient.put(endpoint);
}
function Postdetails(id) {
    let endpoint = 'postdetails.php?id='+id;
    return HttpClient.put(endpoint);
}

export default {
    CalenderData,
    Postdetails,
    keyList
}
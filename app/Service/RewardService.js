import HttpClient from '@Utils/HttpClient'


function getReward(u_id,code) {
    let endpoint = 'reward.php?u_id='+u_id+'&code='+code;
    return HttpClient.put(endpoint);
}

export default {
    getReward
}
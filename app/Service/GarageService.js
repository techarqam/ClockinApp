import HttpClient from '@Utils/HttpClient'


function MygarageSale(u_id) {
    let endpoint = 'mygaragePost.php?u_id='+u_id;
    return HttpClient.put(endpoint);
}

function CatList() {
    let endpoint = 'cat.php';
    return HttpClient.put(endpoint);
}


function deleteMygarageSale(id) {
    let endpoint = 'delete_mygaragePost.php?id='+id;
    return HttpClient.put(endpoint);
}

function verifySale(id,u_id) {
    let endpoint = 'verify_sale.php?id='+id+'&u_id='+u_id;
    return HttpClient.put(endpoint);
}

function promoteSale(id,u_id) {
    let endpoint = 'promote_sale.php?id='+id+'&u_id='+u_id;
    return HttpClient.put(endpoint);
}

export default {
    MygarageSale,
    deleteMygarageSale,
    verifySale,
    promoteSale,
    CatList
}
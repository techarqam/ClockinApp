import firebase from 'react-native-firebase';
import RNLocation from 'react-native-location';
import Geolocation from '@react-native-community/geolocation';

async function getData() {
    let allData=[];
    await firebase.database().ref('UserPost')
    .on('child_added', async (value, prevChildKey) => {
    //  let data = value.val();
      allData.push(value.val());
    //    console.log("starCountRef",data);
    });

    // for (let i = 0; i < allData.length; i++) {

    //     // if(i==0 && Number(i)+1 != data.length){
    //     //    latlng+=data[i].lat+','+data[i].lng;
    //     // }
    //     // if(i>1 && Number(i)+1!=data.length){
    //     //   latlng+='|'+data[i].lat+','+data[i].lng;
    //     // }
    //     // if( Number(i)+1 == data.length){
    //     //   latlng+='|'+data[i].lat+','+data[i].lng;
    //     // }
    //     console.log("latlng",allData[i]);
    //   }
    console.log("length",allData.length);
    return allData;
}

// async function latlng(){
//     Geolocation.getCurrentPosition(info => {
//             this.setState({
//                 latitude: info.coords.latitude,
//                 longitude: info.coords.longitude,
//               });
       
//      }); 
//   }


export default {
    getData,
    // latlng
}
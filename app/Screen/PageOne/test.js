import React, { useState, useEffect } from 'react';
import { Text, View, TextInput } from 'react-native';
import geolocation from '@react-native-community/geolocation';

// interface GeolocationData {
//     latitude: number;
//     longitude: number;
// }

const App = (props) => {
    const [error, setError] = useState("");
    const [position, setPosition] = useState({
      latitude: 0,
      longitude: 0
    });
    useEffect(() => {
        // const getPosition = 
        //     Geolocation.getCurrentPosition(
        //       pos => {
        //         setError("");
        //         setPosition({
        //           latitude: pos.coords.latitude,
        //           longitude: pos.coords.longitude
        //         });
        //       },
        //       e => setError(e.message)
        //     );
        //     console.log('location',getPosition)
        //     console.log('position',position)
        //     console.log('error',error)

        const watchId = navigator.geolocation.watchPosition(
          pos => {
            setError("");
            console.log('pos',pos)
            setPosition({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            });

          },
          // e => setError(e.message),
          {enableHighAccuracy: true, maximumAge: 0,distanceFilter:5}
        //   e => setError(e.message)
        );
        console.log('location',watchId)
        console.log('position',position)
        console.log('error',error)
        // alert('lat'+position.latitude+' log'+position.longitude)


      }, []);
    return (
      <View >
        <Text>{'lat'+position.latitude+' log'+position.longitude}</Text>
      </View>
    );
}

export default App;
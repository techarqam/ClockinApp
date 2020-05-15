import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size='large' color="#5192fa"/>
      </View>
    );
  }
}
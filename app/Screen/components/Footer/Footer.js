import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FooterTab,Footer, Button, Icon } from 'native-base';
import NavigationService from '@Service/Navigation';
import AuthService from '@Service/Auth';

export default class FooterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  logout = async() =>{
    await AuthService.logout();
    NavigationService.navigate('Login');
  }

  render() {
    return (
      <Footer style={{height:50}}>
        <FooterTab >
            <Button  vertical style={{backgroundColor:'#1281CF'}} onPress={() => NavigationService.navigate('HomeTab')}>                    
              <Icon name="apps" style={{fontSize:18,color:'#fff'}}  />
              <Text style={{fontSize:10,color:'#fff'}}>My Calendar</Text>
            </Button>
            <Button vertical  style={{backgroundColor:'#1281CF'}} onPress={() => NavigationService.navigate('DocumentScreen')}>
              <Icon name="document" style={{fontSize:18,color:'#fff'}} />
              <Text style={{fontSize:10,color:'#fff'}}>Document</Text>
            </Button>
            <Button   vertical  style={{backgroundColor:'#1281CF'}} onPress={() => NavigationService.navigate('MyProfileScreen')}>                   
              <Icon  name="person" style={{fontSize:18,color:'#fff'}} />
              <Text style={{fontSize:10,color:'#fff'}}>Profile</Text>
            </Button>
            <Button vertical  style={{backgroundColor:'#1281CF'}} onPress={this.logout}>
              <Icon name="log-out" style={{fontSize:18,color:'#fff'}} />
              <Text style={{fontSize:10,color:'#fff'}}>Logout</Text>
            </Button>
        </FooterTab>
      </Footer>
    );
  }
}

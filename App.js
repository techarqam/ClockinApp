import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Icon,Root } from 'native-base';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import NavigationService from './app/Service/Navigation';
import LoginScreen from './app/Screen/Auth/login';
import RegisterScreen from './app/Screen/Auth/register';
import Home from './app/Screen/Home/Home';
import PageOne from './app/Screen/PageOne/PageOne';
import EndPageOne from './app/Screen/EndPage/EndPageOne';
import DrawerContent from './app/Screen/components/Drawer/index';
import MyProfile from './app/Screen/MyProfile/MyProfile';
import UploadDocument from './app/Screen/Document/UploadDocument';
import JobPage from './app/Screen/components/JobPage/JobPage';
import payout from './app/Screen/Payout/payout';
import AuthService from '@Service/Auth';
import Loader from './app/Screen/components/Loader';
import useGeolocation from './app/Screen/PageOne/test';
import PageTypeOne from './app/Screen/Type2/PageTypeOne';
import PageThree from './app/Screen/Type3/PageThree';

const drawerNavigator = createDrawerNavigator({
  PageOne:{
    screen:PageOne
  },
  DocumentScreen:{
      screen:UploadDocument
  },
  MyProfileScreen:{
    screen:MyProfile
  },
  HomeTab:{
    screen:Home,
    navigationOptions: {
      header: false
    }
  },
  EndPageOneTab:{
    screen:EndPageOne,
    navigationOptions: {
      header: false
    }
  },
  PayoutScreen:{
    screen:payout,
    navigationOptions:{
      header:false
    }
  },
  JobScreen:{
    screen:JobPage,
    navigationOptions: {
      header: false
    }
  },
  EndPageOneTab:{
    screen:EndPageOne,
    navigationOptions: {
      header: false
    }
  },
  testScreen:{
    screen : useGeolocation
  },
  TypeTwo:{
    screen : PageTypeOne,
    navigationOptions: {
      header: false
    }
  },
  TypeThree : {
    screen : PageThree,
    navigationOptions: {
      header: false
    }
  }
},{
  unmountInactiveRoutes : true,
  contentComponent: DrawerContent,
  initialRouteName:'HomeTab',
  headerMode:'none',
})

const MainNavigator = createStackNavigator({
  Login:{
    screen:LoginScreen,
    navigationOptions: {
      header: false
    }
  },
  Register:{
    screen: RegisterScreen,
    navigationOptions: {
      header: false
    }
  }
},{
  initialRouteName:'Login',
  // headerMode: 'none'
});

class AppLoading extends Component {

  constructor(props) {
    super(props);
       this._logData();
   }

   _logData = async() => {
    let data = await AuthService.getAccount();
    this.props.navigation.navigate(data != null ? 'App' : 'Auth');
  
   }


 render() {
  return (
    <Loader/>  
  );
 }
} 

const LoginCheck= createAppContainer(
  createSwitchNavigator(
  {
    AuthLoading: AppLoading,
    App: drawerNavigator,
    Auth: MainNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

const AppRoot = createAppContainer(MainNavigator);

export default class App extends React.Component{
  render(){
      return(
        <Root>
          <LoginCheck ref={(r) => {NavigationService.setTopLevelNavigator(r)}}/>
        </Root>
      )
  }
}
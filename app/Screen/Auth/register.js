import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Animated,
  StyleSheet,
} from 'react-native';
import {Item, Icon, Input, Button} from 'native-base';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

import NavigationService from '@Service/Navigation';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      userdata: [],
      name: '',
      email: '',
      mobile: '',
      password: '',
      isLoading: false,
      offset: new Animated.ValueXY({x: 200, y: -180}),
      button: new Animated.ValueXY({x: 0, y: 180}),
    };
  }

  async handleRegister() {
    
  }




  render() {
    Animated.parallel([
      Animated.spring(this.state.offset.y, {
        toValue: 0,
        speed: 1,
        // bounciness: 20,
      }),
      Animated.timing(this.state.offset, {
        toValue: 0,
        duration: 1000,
        // speed:5
      }),
    ]).start();

    Animated.parallel([
      Animated.spring(this.state.button.y, {
        toValue: 0,
        speed: 1,
        // bounciness: 10,
      }),
      Animated.timing(this.state.button, {
        toValue: 0,
        duration: 1000,
        // speed:5
      }),
    ]).start();

    

    return (
      <KeyboardAvoidingScrollView style={{flex: 1, backgroundColor: '#eee'}}>
        <Animated.View
          style={[
            styles.uppercard,
            {transform: [{translateY: this.state.offset.y}]},
          ]}
          elevation={8}>
          <View style={{width:'100%'}}>
            {/* <Image
              source={require('@Assets/images/AI.png')}
              style={{width: 190, height: 70}}
            /> */}
              <Text style={{textAlign:'center',fontSize:50,color:'white',width:'100%',fontWeight:'bold'}}>Clockin</Text>
          </View>
          <View style={{position: 'absolute', bottom: 30, right: 15,width:'100%',width:'35%'}}>
            <Text style={{color: '#fff', fontWeight: '700', fontSize: 22,width:'100%'}}>
              Registration
            </Text>
          </View>
        </Animated.View>
        <View
          style={{
            height: Height - Height / 2.4,
            width: Width,
            alignItems: 'center',
          }}>
          <View style={{width: '90%', height: '70%', justifyContent: 'center'}}>
            <Item
              rounded
              style={{backgroundColor: '#fff', elevation: 8, marginBottom: 10}}>
              <Icon type="EvilIcons" name="user" style={{width: 42}} />
              <Input
                placeholder="Full Name"
                onChangeText={value => this.setState({name: value})}
              />
            </Item>
            <Item
              rounded
              style={{backgroundColor: '#fff', elevation: 8, marginBottom: 10}}>
              <Icon name="ios-mail" style={{marginLeft: 10, fontSize: 20}} />
              <Input
                placeholder="Email "
                onChangeText={value => this.setState({email: value})}
              />
            </Item>
            <Item
              rounded
              style={{backgroundColor: '#fff', elevation: 8, marginBottom: 10}}>
              <Icon
                type="FontAwesome"
                name="mobile"
                style={{marginLeft: 10, fontSize: 30, width: 35}}
              />
              <Input
                placeholder="Mobile No."
                maxLength={10}
                onChangeText={value => this.setState({mobile: value})}
                keyboardType="number-pad"
                underlineColorAndroid="transparent"
              />
            </Item>
            <Item
              rounded
              style={{
                backgroundColor: '#fff',
                elevation: 8,
                marginVertical: 1,
              }}>
              <Icon name="md-key" style={{marginLeft: 10}} />
              <Input
                placeholder="Password."
                secureTextEntry={true}
                onChangeText={value => this.setState({password: value})}
              />
            </Item>
          </View>
          <Animated.View
            style={[
              styles.login,
              {
                transform: [{translateY: this.state.button.y}],
              },
            ]}>
            <Button
              style={{
                backgroundColor: '#FA0B0B',
                justifyContent: 'center',
                borderRadius: 50,
                elevation: 10,
                width:'100%'
              }}
              onPress={() => {
                this.handleRegister();
              }}
              >
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16,width:'100%',textAlign:'center'}}>
                REGISTER
              </Text>
            </Button>
          </Animated.View>
          <View style={{width: '90%', height: '10%', justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text>Already have an account ? </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={{color: '#FA0B0B', fontWeight: 'bold'}}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingScrollView>
    );
  }
}

export default RegisterScreen;

const styles = StyleSheet.create({
  uppercard: {
    height: Height / 2.7,
    backgroundColor: '#FA0B0B',
    borderBottomLeftRadius: Height / 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    width: '90%',
    height: '20%',
    justifyContent: 'center',
    zIndex: 2,
  },
});

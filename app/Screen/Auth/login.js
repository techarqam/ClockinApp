import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  StyleSheet,
  StatusBar,
  ToastAndroid
} from 'react-native';
import {Item, Icon, Input, Button,Container} from 'native-base';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
// import NavigationService from '@Service/Navigation';
import NavigationService from '../../Service/Navigation';
import AuthService from '@Service/Auth';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      userdata:[],
      mobile: '',
      password:'',
      isLoading: false,
      offset: new Animated.ValueXY({x: 200, y: -180}),
      button: new Animated.ValueXY({x:0,y:180}),
    };
  }

  login = async() => {
    console.log(this.state.mobile);
    let result = await AuthService.login(this.state.mobile, this.state.password)
    console.log("result",result);
    if (result.Message == "Success") {
        ToastAndroid.show('Login Successfully', ToastAndroid.SHORT);
        await AuthService.setAccount(result);
        NavigationService.navigate('HomeTab');
    } else {
        ToastAndroid.show('Invalid Email Id or Mobile Number', ToastAndroid.SHORT);
    }
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
        duration: 800,
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
        duration: 800,
        // speed:5
      }),
    ]).start();

    
    return (
      <Container>
        <StatusBar backgroundColor="#1281CF" barStyle="light-content" />
      <KeyboardAvoidingScrollView style={{flex: 1, backgroundColor: '#eee'}}>
        <Animated.View
          style={[styles.uppercard,{
            // opacity: this.state.opacity,
            transform: [{translateY: this.state.offset.y}],
            // translateY:[]
          }]}
          elevation={8}>
          <View style={{justifyContent:'center',alignItems:'center',width:'100%'}}>
            {/* <Image
              source={require('@Assets/images/AI.png')}
              style={{width: 190, height: 70}}
            /> */}
            
            <Text style={{textAlign:'center',fontSize:50,color:'white',width:'100%',fontFamily:'Akronim-Regular'}}>ClockIn</Text>
          </View>
          <View style={{position: 'absolute', bottom: 30, right: 15,width:60}}>
            <Text style={{color: '#fff',width:'100%',fontSize: 20,fontFamily:'Pacifico-Regular'}}>
              Login
            </Text>
            
          </View>
        </Animated.View>
        <View
          style={{
            height: Height - Height / 2.4,
            width: Width,
            alignItems: 'center',
          }}>
          <View style={{width: '90%', height: '50%', justifyContent: 'center',marginTop:15}}>
            <Item
              rounded
              style={{backgroundColor: '#fff', elevation: 10, marginBottom: 8}}>
              <Icon  name="ios-mail" style={{marginLeft: 10}} />
              <Input placeholder="Email"
                // maxLength={10}
                onChangeText={(value) => this.setState({mobile : value})}
                underlineColorAndroid='transparent'
              />
            </Item>
            <Item
              rounded
              style={{
                backgroundColor: '#fff',
                elevation: 10,
                marginVertical: 8,
              }}>
              <Icon name="md-key" style={{marginLeft: 10}} />
              <Input placeholder="Password"
               secureTextEntry={true}
            //    maxLength={10}
               onChangeText={(value) => this.setState({ password:value })} />
            </Item>
            <View style={{alignSelf: 'flex-end'}}>
              <Text style={{fontSize: 12}}>Forgot Password ?</Text>
            </View>
          </View>
          <Animated.View style={[styles.login,
             {
              transform: [{translateY: this.state.button.y}],
            }
             ]}>
            <Button
              style={{
                backgroundColor: '#1281CF',
                justifyContent: 'center',
                borderRadius: 50,
                elevation: 8,
                width:'100%'
              }}
               onPress={this.login}
              // onPress={() => {
              //   this.handleLogin();
              // }}
              >
              <Text style={{color: '#fff',textAlign:'center', fontWeight: 'bold',width:'100%', fontSize: 16}}>
                LOGIN
              </Text>
            </Button>
          </Animated.View>

            {/* <View style={{flexDirection: 'row', justifyContent:'center',alignItems:'center', alignContent:'center', width: Width}}>
              <Text style={{width: Width, textAlign:'center'}}>Don't have an account ? </Text>
              <TouchableOpacity style={{width:'100%'}}
                onPress={() => this.props.navigation.navigate('')}>
                <Text style={{color: '#00CCFF', fontWeight: 'bold',width:'100%'}}>
                  Register
                </Text>
              </TouchableOpacity>

          </View> */}
        </View>
      </KeyboardAvoidingScrollView>
      </Container>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  uppercard: {
    height: Height / 2.7,
    backgroundColor: '#1281CF',
    borderBottomLeftRadius: Height / 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    width: '90%',
    height: '30%',
    justifyContent: 'center',
    zIndex:2
  }
});
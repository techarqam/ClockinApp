import React, { Component } from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';
import {Button,Icon, Card,Textarea,Footer, FooterTab } from 'native-base';
import NavigationService from '../../Service/Navigation';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import AwesomeButtonRick  from "react-native-really-awesome-button/src/themes/rick";
import ImagePicker from 'react-native-image-picker';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import * as Progress from 'react-native-progress';
import ProgressBar from 'react-native-progress/Bar';
import CustomHeader from '../components/Header/CustomHeader';
import FooterComponent from '../components/Footer/Footer';
const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
export default class UploadDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
        image:'',
        imageView:null,

    };
  }
  imageHandler = () =>{
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
       
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };
          this.setState({
            image: source.uri,
            
          });
          this.setState({
            imageView: (<Image source={{uri: this.state.image}} style={{height:200,width:'95%',alignSelf:'flex-start',marginTop:10,marginLeft:10}} resizeMode="stretch"/>)
          })
        }
    });
}

  render() {
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <CustomHeader name="Upload Doc" />
            <KeyboardAvoidingScrollView>
            <Card style={styles.maincard}>
                <View style={styles.mainview}>
                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <Text style={{fontSize:14,fontFamily:'Aclonica-Regular',color:'#fff'}}>Upload Files</Text>       
                    </View>                               
                </View>
                {this.state.imageView}
                {/* <Progress.Bar progress={0.3} width={200} style={{alignSelf:'center'}} /> */}
                <View style={{marginVertical:10,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <View style={{width:'60%'}}>
                  <Text style={{fontSize:15,fontFamily:'EmilysCandy-Regular'}}>Upload Document :</Text>
                  </View>
                    <View style={{width:'30%'}}>
                    <Button style={{height:25,width:80,backgroundColor:'green',borderRadius:10,justifyContent:'center',alignItems:'center',alignSelf:'center'}}
                        onPress={this.imageHandler}
                    >
                        <Text style={{color:'#fff',fontSize:10}}>Choose File</Text>
                    </Button>
                    </View>
                </View>
                <View style={{marginVertical:10}}>
                    <Textarea rowSpan={4} style={{borderWidth:1,width:'90%',alignSelf:'center'}} placeholder="Description"/>
                </View>
                <View style={{marginVertical:5,justifyContent:'center',alignItems:'center'}}>
                    <AwesomeButtonRick type="anchor" 
                        height={70}
                        width={70}
                        borderRadius={60}
                        textSize={12}
                    >Upload</AwesomeButtonRick>
                    
                </View>               
            </Card>
            </KeyboardAvoidingScrollView>
            <FooterComponent/>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    maincard:{      
              
    },
    mainview:{
        height:40,
        width:'100%',
        backgroundColor:'#1281CF',
        justifyContent:'center',
        alignItems:'center'
    }
})
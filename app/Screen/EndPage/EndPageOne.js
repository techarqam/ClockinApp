import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal,ImageBackground,ScrollView,ToastAndroid } from 'react-native';
import {Card,Button,Footer, FooterTab,Icon } from 'native-base';
import NavigationService from '../../Service/Navigation';
import AwesomeButtonRick  from "react-native-really-awesome-button/src/themes/rick";
import MapView, { Marker } from 'react-native-maps';
import CustomHeader from '../components/Header/CustomHeader';

export default class EndPageOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            modalVisible1:false

        };

    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    showConfirm() {
        this.setState({modalVisible:false,modalVisible1:true});
        // ToastAndroid.show('your job is End now',ToastAndroid.SHORT)
       
        setTimeout(() => {
            this.setState({modalVisible1:false});
            
            NavigationService.navigate('PageOne')
        }, 3000);
    }

    

    render() {
        const Height = Dimensions.get('window').height;
        return (
            <View style={{ backgroundColor: '#fff'}}>
                <CustomHeader name="Sift" />
                <View style={{height:Height-120}}>
                <ScrollView>
                <Card style={{ height: 180, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width:'100%', height: 180, alignSelf: 'center' }}>
                        <MapView
                            style={{ ...StyleSheet.absoluteFill }}
                            initialRegion={{
                                latitude: 22.577056,
                                longitude: 88.434345,
                                latitudeDelta: 1,
                                longitudeDelta: 1,
                            }}
                            zoomEnabled={true}

                        >
                            <Marker
                                coordinate={{
                                    latitude: 22.577056,
                                    longitude: 88.434345
                                }}
                            />
                        </MapView>
                    </View>
                </Card>
                <Card style={{backgroundColor:'#fff'}}>                
                    
                        <View style={styles.MainView}>
                            <Text style={styles.maintext} >LOCATION</Text>                            
                            <Text style={styles.othertext} >Ovation</Text>
                            <Text style={styles.othertext}>3880 Duke Of York Blvd</Text>
                        </View>
                        <View style={styles.MainView}>
                            <Text style={styles.maintext} >YOUR NEXT SIFT DATE</Text>
                            <Text style={styles.othertext} >Monday 25 feb,2020</Text>
                            <Text style={styles.othertext}>3880 Duke Of York Blvd</Text>
                        </View>
                        <View style={styles.MainView}>
                            <Text style={styles.maintext} >SHIFT TIME:~</Text>
                            <Text style={styles.othertext} >5:00 PM TO 10:00 PM</Text>
                            <Text style={styles.othertext}>3880 Duke Of York Blvd</Text>
                        </View>
                        <View style={styles.MainView}>
                        <AwesomeButtonRick type="anchor" onPress={() => this.setState({ modalVisible: true })}
                                   height={85}
                                   width={85}
                                   borderRadius={50}
                                   backgroundColor="#EC7063"
                                   backgroundDarker="#7B241C"
                                   textColor="#fff"
                                >End Sift</AwesomeButtonRick>                                  
                        </View>                                                        
                </Card>
                </ScrollView> 
                </View>
                <Modal

                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setState({ modalVisible: false })}
                >
                    <View style={{ justifyContent: 'center', alignItems: 'center',backgroundColor:'#0000004b' }}>
                        <Button onPress={()=>this.setState({modalVisible:false})} style={{ height: '40%',transparent:true }}>
                        </Button>
                        <View style={{ height: '20%', width: '80%', backgroundColor: 'white' }}>
                            <View style={{justifyContent:'center',marginTop:20}}>
                            <Text style={{ textAlign: 'center', fontSize: 14,fontFamily:'Aclonica-Regular' }}>END MY SHIFT </Text>
                            <Text style={{ textAlign: 'center', fontSize: 13,fontFamily:'Aclonica-Regular' }}> CONFIRMATION</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:30}}>
                                <View style={{width:144}}>
                                    <Button onPress={() => this.showConfirm()} style={{ backgroundColor: 'green', justifyContent: 'center',height:53}}><Text style={{color:'#fff',fontSize:15}}>Yes</Text></Button>
                                </View>
                                <View style={{width:144}}>
                                    <Button onPress={() => this.setState({modalVisible:false})} style={{backgroundColor: '#A93226', justifyContent: 'center',height:53}}><Text style={{color:'#fff',fontSize:15}}>No</Text></Button>
                                </View>
                            </View>
                        </View>
                        <Button style={{ height: '40%',transparent:true }} onPress={() => this.setState({modalVisible:false})}>
                        </Button>
                    </View>

                </Modal>
                <Modal

                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible1}
                    onRequestClose={() => this.setState({ modalVisible1: false })}
                    >
                    <View style={{ justifyContent: 'center', alignItems: 'center',backgroundColor:'#99999999' }}>
                        <Button style={{ height: '40%',transparent:true}}>
                        </Button>
                        <View style={{ height: '20%', width: '70%', backgroundColor: '#fff',borderRadius:10 }}>
                            <View style={{justifyContent:'center',marginTop:20}}>
                                <Text style={{textAlign:'center',fontSize:18}}>Hi Rohan Maity</Text>
                                <Text style={{textAlign:'center',fontSize:18}}>Thank You For Clocking Out</Text>
                            </View>
                        </View>
                        <Button style={{ height: '40%',transparent:true }}>
                        </Button>
                    </View>

                </Modal>
                <Footer style={{height:50}}>
                <FooterTab >
                    <Button  vertical style={{backgroundColor:'#1281CF'}} onPress={() => NavigationService.navigate('HomeTab')}>                    
                    <Icon name="apps" style={{fontSize:18,color:'#fff'}}  />
                    <Text style={{fontSize:10,color:'#fff'}}>Dashboard</Text>
                    </Button>
                    <Button vertical  style={{backgroundColor:'#1281CF'}} onPress={() => NavigationService.navigate('DocumentScreen')}>
                    <Icon name="document" style={{fontSize:18,color:'#fff'}} />
                    <Text style={{fontSize:10,color:'#fff'}}>Document</Text>
                    </Button>
                    <Button   vertical  style={{backgroundColor:'#1281CF'}} onPress={() => NavigationService.navigate('MyProfileScreen')}>                   
                    <Icon  name="person" style={{fontSize:18,color:'#fff'}} />
                    <Text style={{fontSize:10,color:'#fff'}}>Profile</Text>
                    </Button>
                    <Button vertical  style={{backgroundColor:'#1281CF'}} onPress={() => NavigationService.navigate('Login')}>
                    <Icon name="log-out" style={{fontSize:18,color:'#fff'}} />
                    <Text style={{fontSize:10,color:'#fff'}}>Logout</Text>
                    </Button>
                </FooterTab>
                </Footer>
            </View>
        );
    }
}
    const styles = StyleSheet.create({

        MainView: {
            marginVertical:4,
            justifyContent:'center',
            alignItems:'center'
        },
        maintext:{
            fontSize:15,
            color:'#1281CF',
            textAlign:'center',
            marginVertical:5,
            fontFamily:'EmilysCandy-Regular'
        },
        othertext: {
            color:'#000',
            textAlign:'center',
            fontSize:12
        }
    })

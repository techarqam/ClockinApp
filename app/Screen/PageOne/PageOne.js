import React, { Component, useEffect,useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, ToastAndroid, Image, Linking } from 'react-native';
import { Card, Button, Container, Footer, FooterTab, Icon, Form, Textarea, Picker } from 'native-base';
import NavigationService from '../../Service/Navigation';
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import MapView, { Marker,Polyline,PROVIDER_GOOGLE } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
import CustomHeader from '../components/Header/CustomHeader';
import Moment from 'moment';
import Geolocation from '@react-native-community/geolocation';
import AuthService from '@Service/Auth';
import MapViewDirections from 'react-native-maps-directions';
import MapService from '../../Service/MapService';
import FooterComponent from '../components/Footer/Footer';
import firebase from 'react-native-firebase';
import Permission2 from '../components/Permission2';
import Permission3 from '../components/Permission3';

const rootRef = firebase.database().ref();
let update = null;
export default class PageOne extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            modalVisible1: false,
            selectedStartDate: null,
            data: this.props.navigation.getParam('data',{}),
            todayDate : this.props.navigation.getParam('todayDate',null),
            Currentlatitude: 20.5937,
            Currentlongitude: 78.9629,
            name:'',
            allData: this.props.navigation.getParam('allData',[]),
            index: this.props.navigation.getParam('index',null),
            totalLength:this.props.navigation.getParam('totalLength',null),
            startButton: true,
            NewCurrentlatitude: 20.5937,
            NewCurrentlongitude: 78.9629,
            newLat:0,
            newLong:0,
            latDelta:0.2,
            longDelta:0.2,
            fullScreenMap: false,
            userData : {},
            regionLong : 78.9629,
            regionLat : 20.5937,
            startTime : null,
            shiftEndBtn : false,
            endShiftModal :false,
            endModalVisible1 : false,
            parmission : null,
            ready : false

        };
        this.onDateChange = this.onDateChange.bind(this);
        console.log('data',this.props.navigation.getParam('allData',[]));
        console.log('index',this.state.index)

    }

    // watchId: ?number = null

    componentDidMount = async() => {
        this.getAccount();
        this.state = {
            modalVisible2: true
        }
        Geolocation.getCurrentPosition(async (info) => {
                let region = {
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                    latitudeDelta: 1,
                    longitudeDelta: 1
                };
                await this.setState({
                    Currentlatitude: info.coords.latitude,
                    Currentlongitude: info.coords.longitude,
                    newLat: info.coords.latitude,
                    newLong: info.coords.longitude,
                    regionLong : info.coords.longitude,
                    regionLat : info.coords.latitude
                });
                this.firebaseTest();
                this.startShift();
            },
            (error)=>alert(JSON.stringify(error)),
            {timeout:20000}
        );

        this.watchID = Geolocation.watchPosition((position) => 
            {
                // Create the object to update this.state.mapRegion through the onRegionChange function
                let region = {
                latitude:       position.coords.latitude,
                longitude:      position.coords.longitude,
                latitudeDelta:  0.00922*1.5,
                longitudeDelta: 0.00421*1.5
                }
                // console.log(position.coords.latitude)
                this.onRegionChange(region, region.latitude, region.longitude);
            }, 
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter:1, interval:1000}
        );

        setTimeout(() => {
            this.setState({
                ready : true
            })
        }, 5000);
    }

    onRegionChange(region, lastLat, lastLong) {
        this.setState({
            newLat : lastLat,
            newLong : lastLong,
        });
        this.firebaseTest();
        this.startShift();
        
    }
    
    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
    }

    getAccount = async() => {
        let account = await AuthService.getAccount();
        console.log("account",account);
        this.setState({
            name : account.staffFirstName + ' ' + account.staffMiddleName,
            userData : account,
            parmission : account.staffPermissionID
        })
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    showConfirm() {
        this.setState({ modalVisible: false, modalVisible1: true, });

        setTimeout(() => {
            this.setState({ 
                modalVisible1: false,
                shiftEndBtn : true
            });
        }, 3000);
    }

    diff_minutes = (dt2, dt1) =>{
        let diff = (new Date(dt1) - new Date(dt2)) / 1000;

        diff /= 60;
        return Math.abs(Math.round(diff));
    }

    endShowConfirm = async() => {
        let time = Moment().format('YYYY-MM-DD HH:mm:ss');
        if(this.diff_minutes(this.state.startTime,time) >= 30){

            let data = {
                scheduleID : this.state.data.id,
                staffID : this.state.userData.staffID,
                method : "punchOut",
                punchTimeStamp : time.toString()
            }
            let result = await MapService.startShift(data);
            // console.log('end',result)
            if(result.Message == 'Success'){
                this.setState({endShiftModal:false,endModalVisible1:true});
                setTimeout(() => {
                    this.setState({
                        endModalVisible1:false,
                        shiftEndBtn : false
                    });
                }, 3000);
            }
        }else{
            ToastAndroid.show('30 Minutes is not Complete',ToastAndroid.SHORT);
        }
    }
    firebaseTest = () =>{
        let FBUserData = {
            "scheduleID" : this.state.data.id,
            "staffID" : this.state.userData.staffID,
            "token" : this.state.userData.token,
            "email" : this.state.userData.userLogin,
            "permission" : this.state.userData.staffPermissionID,
            "location" : {
                "latitude" : this.state.newLat,
                "longitude" : this.state.newLong
            }
        }
        const postRef = rootRef.child("User").child(this.state.userData.staffID);
        postRef.set(FBUserData);
    }

    startShift = async() =>{
        let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+this.state.newLat+','+this.state.newLong+'&destinations='+this.state.data.locationLatitude+'%2C'+this.state.data.locationLongitude+'&key=AIzaSyDXPthFaun171ToxPDqaLDi46L9cE-PK1Q';
        let response = await fetch(url);
        let responseJson = await response.json();
        console.log('distance',url)
        if(responseJson.rows[0].elements[0].status=='OK'){
            if(Number(responseJson.rows[0].elements[0].distance.value) <= 500){
                this.setState({
                    startButton: false
               })
            }
        }
        
    } 

    shiftStart = async() => {
        let time = Moment().format('YYYY-MM-DD HH:mm:ss')
        let data = {
            scheduleID : this.state.data.id,
            staffID : this.state.userData.staffID,
            method : "punchIn",
            punchTimeStamp : time.toString()
        }
        let result = await MapService.startShift(data);
        console.log(result);
        if(result.Message == 'Success'){
            this.setState({
                startTime : time
            })
            this.showConfirm();
        }
        
    }


    render() {
        const Height = Dimensions.get('window').height;
        const { data,name } = this.state;
        let perDate = [];
        let allData = null;
        let date = [];
        if (this.state.totalLength != this.state.index-1) {
            // console.log('ok')
            allData = this.state.allData[this.state.index+1];
            // console.log("object",allData);
            if(allData != undefined){
            date = allData.scheduleStartDate.split(' ');
            perDate =   date[0].split('-');
            }
        }
        return (
            <Container style={{ backgroundColor: '#fff', flex: 1 }}>
                <CustomHeader name="Home" />
                <View style={{height:Height-103}}>
                    <Card 
                        style={{ 
                            height: this.state.fullScreenMap == true ? Height-108 : Height/3.8, 
                            justifyContent: 'center' 
                        }}
                    >
                        <View 
                            style={{ 
                                width: '100%', 
                                height: this.state.fullScreenMap == true ? Height-108 : Height/3.8, 
                                alignSelf: 'center' 
                            }}
                        >
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                style={{ ...StyleSheet.absoluteFill }}
                                region={{
                                    latitude: this.state.regionLat,
                                    longitude: this.state.regionLong,
                                    latitudeDelta: this.state.latDelta,
                                    longitudeDelta: this.state.longDelta,
                                }}
                                followsUserLocation={false}
                                showsUserLocation={false}
                                showsMyLocationButton={true}
                                showsCompass={true}
                                toolbarEnabled={true}
                                zoomEnabled={true}
                                rotateEnabled={true}
                                showsMyLocationButton={true}
                                // userLocationUpdateInterval = {1000}	
                                zoomControlEnabled = {true}
                                onRegionChangeComplete ={(val) => {
                                    console.log(val);
                                    this.state.ready ? 
                                    this.setState({
                                        latDelta : val.latitudeDelta , 
                                        longDelta : val.longitudeDelta,
                                        regionLong:val.longitude,
                                        regionLat : val.latitude
                                    }) : null
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: Number(this.state.newLat),
                                        longitude: Number(this.state.newLong)
                                    }}
                                >
                                    <Image source={require('../../Assets/markar.png')}/>
                                </Marker>
                                <Marker
                                    coordinate={{
                                        latitude: Number(data.locationLatitude),
                                        longitude: Number(data.locationLongitude)
                                    }}
                                />
                                <MapViewDirections
                                    origin={{latitude: this.state.Currentlatitude, longitude: this.state.Currentlongitude}}
                                    destination={{latitude: Number(data.locationLatitude), longitude: Number(data.locationLongitude)}}
                                    apikey={'AIzaSyDXPthFaun171ToxPDqaLDi46L9cE-PK1Q'}
                                    strokeWidth={5}
                                    strokeColor="#6CDFFB"
                                />
                            </MapView>
                            {
                                this.state.fullScreenMap == false ?
                                <View 
                                    style={styles.mapMaxBtn}
                                    onTouchEnd={()=>this.setState({fullScreenMap:true})}
                                >
                                    <Icon type='MaterialCommunityIcons' name='fullscreen'/>
                                </View>
                                :
                                <View 
                                    style={styles.mapMaxBtn}
                                    onTouchEnd={()=>this.setState({fullScreenMap:false})}
                                >
                                    <Icon type='MaterialCommunityIcons' name='fullscreen-exit'/>
                                </View>
                            }
                            <View 
                                style={styles.mapRedirectBtn}
                                onTouchEnd={()=>{Linking.openURL('google.navigation:q='+this.state.data.locationLatitude+','+this.state.data.locationLongitude)}}
                            >
                                <Icon type='MaterialCommunityIcons' name='directions-fork' style={{fontSize:20}}/>
                            </View>
                            
                        </View>
                    </Card>
                    {
                        this.state.fullScreenMap == true ? null :
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            {
                                this.state.parmission == 1 ? 
                                <Card style={{ backgroundColor: '#fff' }}>
                                    <View style={styles.MainView}>
                                        <Text style={styles.maintext} >TODAY 'S LOCATION</Text>
                                        {/* <Text>{this.state.Currentlatitude+' '+this.state.Currentlongitude}</Text> */}
                                        <Text style={[styles.othertext,{fontWeight:'bold'}]} >{data.locationName}</Text>
                                        <Text style={styles.othertext}>{data.locationAddress}</Text>
                                        <Text style={styles.othertext}>
                                            {
                                                'SHIFT TIME:- '+data.scheduleStartDate.split(' ')[1]
                                                +' To '+
                                                data.scheduleEndDate.split(' ')[1]
                                            }
                                        </Text>
                                    </View>

                                    {
                                        allData != null ? 
                                        <>
                                            <View style={styles.MainView}>
                                                <Text style={styles.maintext} >YOUR NEXT SHIFT DATE</Text>
                                                <Text style={styles.othertext} >
                                                    {Moment(new Date(perDate[2],perDate[1]-1,perDate[0])).format('dddd Do MMM , YYYY')}
                                                </Text>
                                                <Text style={styles.othertext}>
                                                    {this.state.totalLength != this.state.index-1 ? allData.locationAddress : ''}
                                                </Text>
                                            </View>
                                            <View style={styles.MainView}>
                                                <Text style={styles.maintext} >YOUR NEXT SHIFT TIME:~</Text>
                                                <Text style={styles.othertext} >
                                                    {
                                                        this.state.totalLength != this.state.index-1 ? 
                                                        date[1]
                                                        +' To '+
                                                        allData.scheduleEndDate.split(' ')[1] : ''
                                                    }
                                                </Text>
                                                {/* <Text style={styles.othertext}>{this.state.totalLength != this.state.index-1 ? allData.locationAddress : ''}</Text> */}
                                            </View>
                                        </>
                                        : null 
                                    }

                                    <View style={styles.MainView}>
                                        {
                                            this.state.shiftEndBtn == false ?
                                            <AwesomeButtonRick type="anchor" 
                                                // onPress={this.firebaseTest}
                                                onPress={() => this.setState({modalVisible: true })}
                                                height={85}
                                                width={85}
                                                borderRadius={50}
                                                // backgroundColor="#1281CF"
                                                textColor="#fff"
                                                disabled={this.state.startButton}
                                            >Start Shift</AwesomeButtonRick>
                                            :
                                            <AwesomeButtonRick type="anchor"
                                                onPress = {() => this.setState({endShiftModal : true})}
                                                height={85}
                                                width={85}
                                                borderRadius={50}
                                                backgroundColor="#EC7063"
                                                backgroundDarker="#7B241C"
                                                textColor="#fff"
                                            >End Sift</AwesomeButtonRick>   
                                        }
                                    </View>
                                </Card>
                                : this.state.parmission == 2 ? 
                                <Permission2
                                    data = {this.state.allData}
                                    todayDate = {this.state.todayDate}
                                    userData = {this.state.userData}
                                />
                                : this.state.parmission == 3 ?
                                <Permission3/>
                                : null
                            }
                        </ScrollView>
                    }
                </View>
                <FooterComponent/>


                <Modal

                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setState({ modalVisible: false })}
                >
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#0000004b' }}>
                        <Button onPress={() => this.setState({ modalVisible: false })} style={{ height: '40%', transparent: true }}>
                        </Button>
                        <View style={{ height: '20%', width: '80%', backgroundColor: 'white' }}>
                            <View style={{ justifyContent: 'center', marginTop: 20 }}>
                                <Text style={styles.startShiftModalTxt}>START MY SHIFT</Text>
                                <Text style={styles.startShiftModalTxt}>CONFIRMATION</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, justifyContent: 'center' }}>
                                <View style={{ width: 144 }}>
                                    <Button 
                                        onPress={this.shiftStart} 
                                        style={{ backgroundColor: 'green', justifyContent: 'center', height: 53 }}
                                    >
                                        <Text style={{ color: 'white', fontSize: 15 }}>Yes</Text>
                                    </Button>
                                </View>
                                <View style={{ width: 144 }}>
                                    <Button 
                                        onPress={() => this.setState({ modalVisible: false })} 
                                        style={{ backgroundColor: '#A93226', justifyContent: 'center', height: 53 }}
                                    >
                                        <Text style={{ color: 'white', fontSize: 15 }}>No</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <Button style={{ height: '40%', transparent: true }} onPress={() => this.setState({ modalVisible: false })}>
                        </Button>
                    </View>

                </Modal>
                <Modal

                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible1}
                    onRequestClose={() => this.setState({ modalVisible1: false })}
                >
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#99999999' }}>
                        <Button style={{ height: '40%', transparent: true }}>
                        </Button>
                        <View style={{ height: '20%', width: '70%', backgroundColor: '#fff', borderRadius: 10 }}>
                            <View style={{ justifyContent: 'center', marginTop: 20 }}>
                                <Text style={{ textAlign: 'center', fontSize: 18 }}>Hi {name}</Text>
                                <Text style={{ textAlign: 'center', fontSize: 18 }}>Thank you For Clocking In</Text>
                            </View>
                        </View>
                        <Button style={{ height: '40%', transparent: true }}>
                        </Button>
                    </View>

                </Modal>

                <Modal

                    animationType="fade"
                    transparent={true}
                    visible={this.state.endShiftModal}
                    onRequestClose={() => this.setState({ endShiftModal: false })}
                >
                    <View style={{ justifyContent: 'center', alignItems: 'center',backgroundColor:'#0000004b' }}>
                        <Button onPress={()=>this.setState({endShiftModal:false})} style={{ height: '40%',transparent:true }}>
                        </Button>
                        <View style={{ height: '20%', width: '80%', backgroundColor: 'white' }}>
                            <View style={{justifyContent:'center',marginTop:20}}>
                            <Text style={{ textAlign: 'center', fontSize: 14,fontFamily:'Aclonica-Regular' }}>END MY SHIFT </Text>
                            <Text style={{ textAlign: 'center', fontSize: 13,fontFamily:'Aclonica-Regular' }}> CONFIRMATION</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:30}}>
                                <View style={{width:144}}>
                                    <Button onPress={() => this.endShowConfirm()} style={{ backgroundColor: 'green', justifyContent: 'center',height:53}}><Text style={{color:'#fff',fontSize:15}}>Yes</Text></Button>
                                </View>
                                <View style={{width:144}}>
                                    <Button onPress={() => this.setState({endShiftModal:false})} style={{backgroundColor: '#A93226', justifyContent: 'center',height:53}}><Text style={{color:'#fff',fontSize:15}}>No</Text></Button>
                                </View>
                            </View>
                        </View>
                        <Button style={{ height: '40%',transparent:true }} onPress={() => this.setState({endShiftModal:false})}>
                        </Button>
                    </View>

                </Modal>

                <Modal

                    animationType="fade"
                    transparent={true}
                    visible={this.state.endModalVisible1}
                    onRequestClose={() => this.setState({ endModalVisible1: false })}
                    >
                    <View style={{ justifyContent: 'center', alignItems: 'center',backgroundColor:'#99999999' }}>
                        <Button style={{ height: '40%',transparent:true}}>
                        </Button>
                        <View style={{ height: '20%', width: '70%', backgroundColor: '#fff',borderRadius:10 }}>
                            <View style={{justifyContent:'center',marginTop:20}}>
                                <Text style={{textAlign:'center',fontSize:18}}>Hi {name}</Text>
                                <Text style={{textAlign:'center',fontSize:18}}>Thank You For Clocking Out</Text>
                            </View>
                        </View>
                        <Button style={{ height: '40%',transparent:true }}>
                        </Button>
                    </View>

                </Modal>

            </Container>
        );
    }
}
const styles = StyleSheet.create({

    MainView: {
        marginVertical: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    maintext: {
        fontSize: 18,
        color: '#1281CF',
        textAlign: 'center',
        marginVertical: 5,
        fontFamily: 'EmilysCandy-Regular',
        elevation: 5
    },
    othertext: {
        color: '#000',
        textAlign: 'center',
        // fontFamily: 'Sriracha-Regular',
        fontSize: 15
    },
    mapMaxBtn : {
        height:35,
        width:35,
        position:'absolute',
        borderRadius:20,
        bottom:5,
        left:5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f7f7f7',
        elevation:15
    },
    mapRedirectBtn : {
        height:35,
        width:35,
        position:'absolute',
        borderRadius:20,
        top:5,
        right:5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f7f7f7',
        elevation:15
    },
    startShiftModalTxt : { 
        textAlign: 'center', 
        fontSize: 14, 
        fontFamily: 'Aclonica-Regular' 
    }
})

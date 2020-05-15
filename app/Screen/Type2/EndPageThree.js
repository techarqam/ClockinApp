import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal,TouchableHighlight } from 'react-native';
import { Container, Card, CardItem, Button, DatePicker, Icon, Header, Left, Body, Right, Title,Form,Picker,Input,Item } from 'native-base';
import NavigationService from '../../Service/Navigation';


import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CalendarPicker from 'react-native-calendar-picker';


const { width, height } = Dimensions.get('window');

export default class EndPageThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            modalVisible1:false,
            modalVisible2:false,
            selected: undefined,
            ButtonRed:false,
            ButtonOrange:true,
            ButtonOrange1:true,
            ButtonRed1:false,
            TimeElapsed:'01:22:13'

        };
        
        this.onDateChange = this.onDateChange.bind(this);


    }
    onValueChange(value) {
        this.setState({
          selected: value
        });
      }
    
    onDateChange(date) {
        this.setState({
          selectedStartDate: date,
        });
      }

    
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    showConfirm() {
        this.setState({modalVisible:false,ButtonOrange:false,ButtonRed:true});
        
        setTimeout(() => {
            this.setState({modalVisible2:false});
        }, 3000);
    }
    newConfirm() {
        this.setState({modalVisible1:false,ButtonOrange1:false,ButtonRed1:true});
        setTimeout(() => {
            this.setState({modalVisible2:false});
            NavigationService.navigate('PageTypeOne')
        }, 3000);
    }
    

    
    

    render() {

        return (
            <Container style={{ backgroundColor: '#e4e9ed' }}>
                <Header style={{backgroundColor:'#00CCFF'}}>
                    <Left>
                        <Button transparent onPress={()=>NavigationService.openDrawer()}>
                        <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>ClockIn</Title>
                    </Body>
                    <Right>
                        
                    </Right>
                    </Header>
                <View style={{ height: '35%', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>

                    <View style={{ width: width - 36, height: 250, alignSelf: 'center', borderWidth: 1.5, marginTop: 50 }}>
                        <MapView
                            style={{ ...StyleSheet.absoluteFill }}
                            initialRegion={{
                                latitude: 22.577056,
                                longitude: 88.434345,
                                latitudeDelta: 1,
                                longitudeDelta: 1,
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: 22.577056,
                                    longitude: 88.434345
                                }}
                            />
                        </MapView>
                    </View>

                </View>
                <View style={styles.MainView}></View>
                <View style={styles.MainView}>
                    <Button danger={this.state.ButtonRed} warning={this.state.ButtonOrange} rounded  style={styles.buttonstyle1} onPress={() => this.setState({ modalVisible: true })}>
                        <Text style={{ textAlign: 'center', width: '100%', color: 'white', fontWeight: 'bold', fontSize: 17 }}>END MY DAY</Text>
                    </Button>
                    <Text style={{fontSize:15,marginVertical:5}}>Time Elapsed : 00:00:00</Text>
                
                </View>
                <View style={styles.MainView1}>
                    <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold'}}>123 ABD ST. JBD</Text>
                </View>
                <View style={styles.buttonView}>
                    <Button danger={this.state.ButtonRed1} warning={this.state.ButtonOrange1} rounded  style={styles.buttonstyle1} onPress={() => this.setState({ modalVisible1: true })}>
                        <Text style={{ textAlign: 'center', width: '100%', color: 'white', fontWeight: 'bold', fontSize: 17 }}>END JOB</Text>
                    </Button>
                    <Text style={{fontSize:15,marginVertical:5,textAlign:'center'}}>Time Elapsed : 00:00:00</Text>

                </View>

                <Modal

                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setState({ modalVisible: false })}
                >
                    <View style={{ justifyContent: 'center', alignItems: 'center',backgroundColor:'#0000004b' }}>
                        <Button onPress={()=>this.setState({modalVisible:false})} style={{ height: '41%',transparent:true }}>
                        </Button>
                        <View style={{ height: '18%', width: '70%', backgroundColor: 'white' }}>
                            <View style={{justifyContent:'center',marginTop:20}}>
                                <Text style={{textAlign:'center',fontSize:17}}>END MY DAY CONFIRMATION</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:30}}>
                                <View style={{width:'40%'}}>
                                    <Button  onPress={() => this.showConfirm() } style={{backgroundColor:'green',justifyContent:'center'}}><Text style={{color:'white',fontSize:17}}>Yes</Text></Button>
                                </View>
                                <View style={{width:'41%'}}>
                                    <Button onPress={() => this.setState({modalVisible:false})} style={{backgroundColor:'green',justifyContent:'center'}}><Text style={{color:'white',fontSize:17}}>No</Text></Button>
                                </View>
                            </View>
                        </View>
                        <Button onPress={()=>this.setState({modalVisible1:false})} style={{ height: '40%',transparent:true }} onPress={() => this.setState({modalVisible1:false})}>
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
                        <Button style={{ height: '41%',transparent:true}}>
                        </Button>
                        <View style={{ height: '18%', width: '70%', backgroundColor: '#ecfc83' }}>
                            <View style={{justifyContent:'center',marginTop:20}}>
                                <Text style={{textAlign:'center',fontSize:20}}>END JOB CONFIRMATION</Text>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:30}}>
                                <View style={{width:'30%'}}>
                                    <Button  onPress={() => this.newConfirm()} style={{backgroundColor:'green',justifyContent:'center'}}><Text style={{color:'white',fontSize:17}}>Yes</Text></Button>
                                </View>
                                <View style={{width:'41%'}}>
                                    <Button onPress={() => this.setState({modalVisible1:false})} style={{backgroundColor:'green',justifyContent:'center'}}><Text style={{color:'white',fontSize:17}}>No</Text></Button>
                                </View>
                            </View>
                        </View>
                        <Button style={{ height: '41%',transparent:true }}>
                        </Button>
                    </View>

                </Modal>
                <Modal

                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible2}
                    onRequestClose={() => this.setState({ modalVisible1: false })}
                    >
                    <View style={{ justifyContent: 'center', alignItems: 'center',backgroundColor:'#99999999' }}>
                        <Button style={{ height: '41%',transparent:true}}>
                        </Button>
                        <View style={{ height: '17%', width: '70%', backgroundColor: '#ecfc83' }}>
                            <View style={{justifyContent:'center',marginTop:20}}>
                                <Text style={{textAlign:'center',fontSize:22, }}>Hi Amal</Text>
                                <Text style={{textAlign:'center',fontSize:21,marginHorizontal:10}}>123 ABD ST. JBD 01.22.13 Have a Great Day</Text>

                            </View>
                        </View>
                        <Button style={{ height: '41%',transparent:true }}>
                        </Button>
                    </View>

                </Modal>
                
                
            </Container>
        );
    }
}
const styles = StyleSheet.create({

    MainView: {

        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },

    MainView1:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,
        marginBottom:30
    },
    
    buttonstyle1: {
        width: '90%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonstyle2: {
        backgroundColor: '#ff9191',
        width: '70%',
        justifyContent: 'center',
        alignSelf: 'center',
    }


})

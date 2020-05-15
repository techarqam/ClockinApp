import React, { Component, useState } from 'react';
import { View, Text, Dimensions, ToastAndroid } from 'react-native';
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import { Picker } from 'native-base';
import moment from 'moment';
import MapService from '../../../Service/MapService';

const {height,width} = Dimensions.get('window');
const CHeight = (height-(height/3.8))-108;
const DayTimer = null ;
const ShiftTimer = null;
export default class Permission2 extends Component{
    constructor(props){
        super(props);
        this.state = {
            dTimerSecond : '00',
            dTimerMin : '00',
            dTimerHour : '00',
            dayStart : false,
            shiftStart : false,
            sTimerSecond : '00',
            sTimerMin : '00',
            sTimerHour : '00',
            data : this.props.data,
            todayDate : this.props.todayDate,
            userData : this.props.userData,
            todayJob : [],
            currentJob : '',
            chooseJobDisabled : false
        }
    }

    componentDidMount = () => {
        this.setState({
            todayJob : this.state.data.filter(val => val.scheduleStartDate.split(' ').find(Sdate => Sdate[0]) == this.state.todayDate)
        })
        setTimeout(() => {
            console.log(this.state.todayJob)
        }, 1000);
    }

    

    dayTimer = () => {
        this.DayTimer = setInterval(() => {
            let second = (Number(this.state.dTimerSecond)+1).toString();
            let min = this.state.dTimerMin;
            let hour = this.state.dTimerHour;
            if(Number(this.state.dTimerSecond) == 59){
                second = '00';
                min = (Number(this.state.dTimerMin)+1).toString();
            }
            if(Number(this.state.dTimerMin) == 59){
                min = '00';
                hour = (Number(this.state.dTimerHour)+1).toString();
            }
            this.setState({
                dTimerSecond : second.length == 1 ? '0'+second : second,
                dTimerMin : min.length == 1 ? '0'+min : min,
                dTimerHour : hour.length == 1 ? '0'+hour : hour
            })

        }, 1000);
    }

    shiftTimer = () => {
        this.ShiftTimer = setInterval(() => {
            let second = (Number(this.state.sTimerSecond)+1).toString();
            let min = this.state.sTimerMin;
            let hour = this.state.sTimerHour;
            if(Number(this.state.sTimerSecond) == 59){
                second = '00';
                min = (Number(this.state.sTimerMin)+1).toString();
            }
            if(Number(this.state.sTimerMin) == 59){
                min = '00';
                hour = (Number(this.state.sTimerHour)+1).toString();
            }
            this.setState({
                sTimerSecond : second.length == 1 ? '0'+second : second,
                sTimerMin : min.length == 1 ? '0'+min : min,
                sTimerHour : hour.length == 1 ? '0'+hour : hour
            })

        }, 1000);
    }

    startMyDay = async () => {
        let todayData = this.state.data.filter(val => val.scheduleStartDate.split(' ').find(Sdate => Sdate[0]) == this.state.todayDate);
        let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        // console.log("date",date)
        let data = {
            "scheduleID" : todayData[0].id,
            "staffID" : this.state.userData.staffID,
            "method" : "punchIn",
            "punchTimeStamp" : date,
            "description" : "test"
        }

        let result = await MapService.startMyDay(data);

        if(result && result.Message == 'Success'){
            ToastAndroid.show(result.punchDayDetails,ToastAndroid.SHORT);
            this.setState({
                dayStart : true,
                chooseJobDisabled: true,
            })
            this.dayTimer()
        }else{
            ToastAndroid.show('Something went wrong !! Please try again.',ToastAndroid.SHORT);
        }
    }

    endMyDay = async () => {
        let todayData = this.state.data.filter(val => val.scheduleStartDate.split(' ').find(Sdate => Sdate[0]) == this.state.todayDate);
        let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        if(this.state.shiftStart == false){
            let data = {
                "scheduleID" : todayData[0].id,
                "staffID" : this.state.userData.staffID,
                "method" : "punchOut",
                "punchTimeStamp" : date,
                "description" : "test"
            }
    
            let result = await MapService.startMyDay(data);
    
            if(result && result.Message == 'Success'){
                ToastAndroid.show(result.punchDayDetails,ToastAndroid.SHORT);
                this.setState({
                    dayStart : false,
                    chooseJobDisabled : false,
                    dTimerSecond : '00',
                    dTimerMin : '00',
                    dTimerHour : '00',
                })
                clearInterval(this.DayTimer);
            }else{
                ToastAndroid.show('Something went wrong !! Please try again.',ToastAndroid.SHORT);
            }
        }else{
            ToastAndroid.show('End the shift first.',ToastAndroid.SHORT);
        }
    }

    startMyShift = async () => {
        let todayData = this.state.data.filter(val => val.scheduleStartDate.split(' ').find(Sdate => Sdate[0]) == this.state.todayDate);
        let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

        if(this.state.currentJob != ''){
            let data = {
                "scheduleID" : todayData[0].id,
                "staffID" : this.state.userData.staffID,
                "method" : "punchIn",
                "punchTimeStamp" : date,
                "description" : this.state.currentJob
            }

            let result = await MapService.startShift(data);
            if(result && result.Message == 'Success'){
                ToastAndroid.show(result.punchDetails,ToastAndroid.SHORT);
                this.shiftTimer();
                this.setState({
                    shiftStart : true,
                    chooseJobDisabled : false
                })
            }else{
                ToastAndroid.show('Something went wrong !! Please try again.',ToastAndroid.SHORT);
            }
        }else{
            ToastAndroid.show('Please choose job.',ToastAndroid.SHORT);
        }   
    }

    endShift = async () =>{
        let todayData = this.state.data.filter(val => val.scheduleStartDate.split(' ').find(Sdate => Sdate[0]) == this.state.todayDate);
        let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

        let data = {
            "scheduleID" : todayData[0].id,
            "staffID" : this.state.userData.staffID,
            "method" : "punchOut",
            "punchTimeStamp" : date,
            "description" : this.state.currentJob
        }

        let result = await MapService.startShift(data);
        if(result && result.Message == 'Success'){
            ToastAndroid.show(result.punchDetails,ToastAndroid.SHORT);
            clearInterval(this.ShiftTimer);
            this.setState({
                shiftStart : false,
                chooseJobDisabled : true,
                sTimerSecond : '00',
                sTimerMin : '00',
                sTimerHour : '00',
            })
        }else{
            ToastAndroid.show('Something went wrong !! Please try again.',ToastAndroid.SHORT);
        }
    }

    render(){
        return (
            <View style={{height : CHeight,marginTop:30}}>
                <View style={{alignItems:'center',height : CHeight/3}}>
                    {
                        this.state.dayStart == false ?
                        <AwesomeButtonRick 
                            onPress = {() => {
                                this.startMyDay()
                                
                            }}
                            // height={85}
                            width={300}
                            borderRadius={10}
                            backgroundColor="#1281CF"
                            // backgroundDarker="#7B241C"
                            textColor="#fff"
                        >Start My Day</AwesomeButtonRick> 
                        :
                        <AwesomeButtonRick 
                            onPress = {() => {
                                this.endMyDay()
                                
                            }}
                            // height={85}
                            width={300}
                            borderRadius={10}
                            backgroundColor="#EC7063"
                            backgroundDarker="#7B241C"
                            textColor="#fff"
                        >End My Day</AwesomeButtonRick> 
                    }
                     
                    <Text style={{marginVertical:10}}>Time Elapsed : {this.state.dTimerHour}:{this.state.dTimerMin}:{this.state.dTimerSecond}</Text>
                </View>
                
                <View style={{alignItems:'center',height : CHeight/3,width:width}}>
                    <View style={{borderWidth:1,height:50,borderRadius:5}}>
                        <Picker
                            note
                            mode="dropdown"
                            style={{ width: 255 }}
                            selectedValue = {this.state.currentJob}
                            onValueChange = {(val) => this.setState({currentJob : val})}
                            enabled = {this.state.chooseJobDisabled}
                        >
                            <Picker.Item value="" label=''/>
                            {
                                this.state.todayJob.map((item,index) => {
                                    return(
                                        <Picker.Item value={item.locationName} label={item.locationName} key={index}/>
                                    )
                                })
                            }
                        </Picker>
                    </View>
                </View>

                <View style={{alignItems:'center',height : CHeight/3}}>
                    {
                        this.state.shiftStart == false ?
                        <AwesomeButtonRick 
                            onPress = {() => {
                                this.startMyShift()
                                
                            }}
                            // height={85}
                            width={300}
                            borderRadius={10}
                            backgroundColor={this.state.dayStart == true ? "#1281CF" : "#D1FFC0"}
                            
                            disabled={!this.state.dayStart}
                            textColor="#fff"
                        >Start Shift</AwesomeButtonRick>
                        :
                        <AwesomeButtonRick 
                            onPress = {() => {
                                this.endShift()
                                
                            }}
                            // height={85}
                            width={300}
                            borderRadius={10}
                            backgroundColor="#EC7063"
                            backgroundDarker="#7B241C"
                            textColor="#fff"
                        >End Shift</AwesomeButtonRick>
                    }
                    <Text>Time Elapsed : {this.state.sTimerHour}:{this.state.sTimerMin}:{this.state.sTimerSecond}</Text>
                </View>
            </View>
        );
    }
}

import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Textarea } from 'native-base';
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";


const {height,width} = Dimensions.get('window');
const CHeight = (height-(height/3.8))-108;
export default class Permission3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dayStart : false,
        shiftStart : false
    };
  }

  render() {
    return (
        <View style={{height : CHeight,marginTop:30}}>
            <View style={{alignItems:'center',height : CHeight/5}}>
                {
                    this.state.dayStart == false ?
                    <AwesomeButtonRick 
                        onPress = {() => {
                            this.setState({
                                dayStart : true
                            })
                            // this.dayTimer()
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
                            this.setState({
                                dayStart : false
                            })
                            // clearInterval(this.DayTimer);
                        }}
                        // height={85}
                        width={300}
                        borderRadius={10}
                        backgroundColor="#EC7063"
                        backgroundDarker="#7B241C"
                        textColor="#fff"
                    >End My Day</AwesomeButtonRick> 
                }
                
                {/* <Text style={{marginVertical:10}}>Time Elapsed : {this.state.dTimerHour}:{this.state.dTimerMin}:{this.state.dTimerSecond}</Text> */}
            </View>
            
            <View style={{alignItems:'center',height : CHeight/2,width:width}}>
                <View style={{width: 280,borderWidth:1}}>
                    <Textarea
                        rowSpan={8}
                        style={{paddingTop:10,fontSize:16,paddingHorizontal:15}}  
                        placeholder="Please Enter Your Job"
                    />
                </View>
            </View>

            <View style={{alignItems:'center',height : CHeight/5}}>
                {
                    this.state.shiftStart == false ?
                    <AwesomeButtonRick 
                        onPress = {() => {
                            // this.shiftTimer();
                            this.setState({
                                shiftStart : true
                            })
                        }}
                        // height={85}
                        width={300}
                        borderRadius={10}
                        backgroundColor="#1281CF"
                        // backgroundDarker="#7B241C"
                        textColor="#fff"
                    >Start Shift</AwesomeButtonRick>
                    :
                    <AwesomeButtonRick 
                        onPress = {() => {
                            // clearInterval(this.ShiftTimer);
                            this.setState({
                                shiftStart : false
                            })
                        }}
                        // height={85}
                        width={300}
                        borderRadius={10}
                        backgroundColor="#EC7063"
                        backgroundDarker="#7B241C"
                        textColor="#fff"
                    >End Shift</AwesomeButtonRick>
                }
                {/* <Text>Time Elapsed : {this.state.sTimerHour}:{this.state.sTimerMin}:{this.state.sTimerSecond}</Text> */}
            </View>
        </View>
    );
  }
}

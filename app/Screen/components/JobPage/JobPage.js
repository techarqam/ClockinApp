import React, { Component } from 'react';
import { View, Text,StyleSheet, Dimensions } from 'react-native';
import CustomHeader from '../Header/CustomHeader';
import {  Content, Card, Icon, Right, Button, Footer, FooterTab } from 'native-base';
import NavigationService from '../../../Service/Navigation';
import moment from 'moment';
import FooterComponent from '../Footer/Footer';

const Width = Dimensions.get('window').width;
export default class JobPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.getParam('data', []),
      date: this.props.navigation.getParam('date', null)
    };
    console.log(this.state.data)
    console.log(this.state.data.filter(val => val.scheduleStartDate.split(' ').find(Sdate => Sdate[0]) == this.state.date).length)
  }

  render() {
    const {date} = this.state;
    return (
      <View style={{ flex: 1 }}>
        <CustomHeader name="Job Details" />
        <Content>

          <Card style={{ height: 50, backgroundColor: '#1281CF', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', color: '#fff' }}>{'Job Details For '+moment(new Date(date.split('-')[2],date.split('-')[1]-1,date.split('-')[0])).format('ll') }</Text>
            </View>
          </Card>
          {
            this.state.data.filter(val => val.scheduleStartDate.split(' ').find(Sdate => Sdate[0]) == this.state.date)
                .map((item,index) => {
                  return(
                    <Card 
                      key={index} 
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                      onTouchEnd={() => NavigationService.navigate('PageOne',{data:item,allData:this.state.data,index:this.state.data.indexOf(this.state.data.find(val => val.id == item.id)),totalLength: this.state.data.length,todayDate : this.state.date})} 
                    >
                      <Icon active name="suitcase" type="Entypo" style={{ color: '#1281CF', left: 5 }} />

                      <View style={{width : Width/1.2,marginVertical: 10,}}>
                        <Text style={{ textAlign: 'center' }}>{item.scheduleTitle}</Text>
                        <Text style={[styles.othertext,{fontWeight:'bold'}]} >{item.locationName}</Text>
                        <Text style={styles.othertext}>{item.locationAddress}</Text>
                        <Text style={styles.othertext}>
                        {
                            'SHIFT TIME:- '+item.scheduleStartDate.split(' ')[1]
                            +' To '+
                            item.scheduleEndDate.split(' ')[1]
                        }
                        </Text>
                      </View>
                      
                      <Right>
                        <View style={{ width: 40, borderLeftWidth: 0.3 }}>
                          <Icon 
                            name="arrow-forward" 
                            style={{ color: '#1281CF',marginLeft:10 }}
                          />
                        </View>

                      </Right>
                    </Card>
                  )
                })
          }
          

        </Content>
        <FooterComponent/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  othertext: {
      color: '#000',
      textAlign: 'center',
      // fontFamily: 'Sriracha-Regular',
      fontSize: 15
  }
})

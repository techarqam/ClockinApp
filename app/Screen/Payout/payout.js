import React, { Component } from 'react';
import { View, Text } from 'react-native';
import CustomHeader from '../components/Header/CustomHeader';
import { Container,Tab,Tabs, Card,Footer,FooterTab,Button,Icon } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationService from '../../Service/Navigation';
export default class payout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container>
          <CustomHeader name="Payout" />
          <Tabs>
          <Tab heading="Daily" tabStyle={{ backgroundColor: "#1281CF" }}
           activeTabStyle={{backgroundColor:'#1281CF'}}
           textStyle={{fontFamily:'Sriracha-Regular',color:'#D5D8DC'}}
           activeTextStyle={{fontFamily:'Sriracha-Regular',color:'#fff'}}
           >
            <Card style={{justifyContent:'center',alignItems:'center',height:100,width:'95%',alignSelf:'center'}}>
                <Text style={{fontSize:15,fontFamily:'Aclonica-Regular',textDecorationLine:'underline'}}>Your Today Work</Text>
                <View style={{marginTop:10}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:'20%'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>HOUR :</Text></View>
                        <View style={{width:'80%'}}><Text >8 hrs 20 min 22 sec </Text></View>                   
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:'20%'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>DATE :</Text></View>
                        <View style={{width:'80%'}}><Text>20 Feb,2020</Text></View>
                    </View>
                </View>
            </Card>           
          </Tab>
          <Tab heading="Monthly" tabStyle={{ backgroundColor: "#1281CF" }}
           activeTabStyle={{backgroundColor:'#1281CF'}}
            textStyle={{fontFamily:'Sriracha-Regular',color:'#D5D8DC'}}
            activeTextStyle={{fontFamily:'Sriracha-Regular',color:'#fff'}}
           >
            <ScrollView>
            <Card style={{justifyContent:'center',alignItems:'center',height:150,width:'95%',alignSelf:'center'}}>
                <Text style={{fontSize:15,fontFamily:'Aclonica-Regular',textDecorationLine:'underline'}}>Your Monthly Work</Text>                    
                <View style={{marginTop:10}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:'20%',justifyContent:'flex-end'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>MONTH :</Text></View>
                        <View style={{width:'80%'}}><Text >January</Text></View>                   
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={{width:'20%'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>TOTAL :</Text></View>
                        <View style={{width:'80%'}}><Text >30 days</Text></View>                   
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={{width:'20%'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>WORK :</Text></View>
                        <View style={{width:'80%'}}><Text>25 days</Text></View>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={{width:'20%'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>DATE :</Text></View>
                        <View style={{width:'80%'}}><Text>01 jan,2020 To 30 jan,2020</Text></View>
                    </View>
                </View>
            </Card>
            <Card style={{justifyContent:'center',alignItems:'center',height:150,width:'95%',alignSelf:'center'}}>
                {/* <Text style={{fontSize:15,fontFamily:'Aclonica-Regular',textDecorationLine:'underline'}}>Your Monthly Work</Text>                     */}
                <View >
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:'20%',justifyContent:'flex-end'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>MONTH :</Text></View>
                        <View style={{width:'80%'}}><Text >February</Text></View>                   
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={{width:'20%'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>TOTAL :</Text></View>
                        <View style={{width:'80%'}}><Text >30 days</Text></View>                   
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={{width:'20%'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>WORK :</Text></View>
                        <View style={{width:'80%'}}><Text>25 days</Text></View>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={{width:'20%'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>DATE :</Text></View>
                        <View style={{width:'80%'}}><Text>1 feb,2020 To 28 feb,2020</Text></View>
                    </View>
                </View>
            </Card>
            </ScrollView>
          </Tab>
          <Tab heading="Yearly" tabStyle={{ backgroundColor: "#1281CF" }}
           activeTabStyle={{backgroundColor:'#1281CF'}}
           textStyle={{fontFamily:'Sriracha-Regular',color:'#D5D8DC'}}
           activeTextStyle={{fontFamily:'Sriracha-Regular',color:'#fff'}}
           >
            <ScrollView showsVerticalScrollIndicator={false}>
            <Card style={{justifyContent:'center',alignItems:'center',height:180,width:'95%',alignSelf:'center'}}>
                <Text style={{fontSize:15,fontFamily:'Aclonica-Regular',textDecorationLine:'underline'}}>Your Yearly Work</Text>
                <View style={{marginTop:10}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:'20%'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>YEAR :</Text></View>
                        <View style={{width:'80%'}}><Text >2017</Text></View>                   
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={{width:'20%'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>DATE :</Text></View>
                        <View style={{width:'80%'}}><Text>1 jan,2019 To 31 dec,2019</Text></View>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={{width:'20%'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>TOTAL :</Text></View>
                        <View style={{width:'80%'}}><Text>365 Days</Text></View>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={{width:'20%'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>WORK :</Text></View>
                        <View style={{width:'80%'}}><Text>285 Days</Text></View>
                    </View>
                </View>
            </Card>
            <Card style={{justifyContent:'center',alignItems:'center',height:180,width:'95%',alignSelf:'center'}}>
                {/* <Text style={{fontSize:15,fontFamily:'Aclonica-Regular',textDecorationLine:'underline'}}>Your Yearly Work</Text> */}
                <View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:'20%'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>YEAR :</Text></View>
                        <View style={{width:'80%'}}><Text >2018</Text></View>                   
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={{width:'20%'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>DATE :</Text></View>
                        <View style={{width:'80%'}}><Text>1 jan,2019 To 31 dec,2019</Text></View>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={{width:'20%'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>TOTAL :</Text></View>
                        <View style={{width:'80%'}}><Text>365 Days</Text></View>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={{width:'20%'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>WORK :</Text></View>
                        <View style={{width:'80%'}}><Text>300 Days</Text></View>
                    </View>
                </View>
            </Card>
            <Card style={{justifyContent:'center',alignItems:'center',height:180,width:'95%',alignSelf:'center'}}>
                {/* <Text style={{fontSize:15,fontFamily:'Aclonica-Regular',textDecorationLine:'underline'}}>Your Yearly Work</Text> */}
                <View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{width:'20%'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>YEAR :</Text></View>
                        <View style={{width:'80%'}}><Text >2019</Text></View>                   
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={{width:'20%'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>DATE :</Text></View>
                        <View style={{width:'80%'}}><Text>1 jan,2019 To 31 dec,2019</Text></View>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={{width:'20%'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>TOTAL :</Text></View>
                        <View style={{width:'80%'}}><Text>365 Days</Text></View>
                    </View>
                    <View style={{flexDirection:'row',marginVertical:5}}>
                        <View style={{width:'20%'}}><Text style={{textAlign:'center',fontWeight:'bold'}}>WORK :</Text></View>
                        <View style={{width:'80%'}}><Text>300 Days</Text></View>
                    </View>
                </View>
            </Card>
            </ScrollView>
          </Tab>
        </Tabs>
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
      </Container>
    );
  }
}

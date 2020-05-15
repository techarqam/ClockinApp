import React from 'react';
import{
  View,Text,Button, Dimensions,TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base';
import NavigationService from '../../Service/Navigation';
import HomeService from '@Service/HomeService';
import AuthService from '@Service/Auth';
import moment from 'moment';

const months = ["January", "February", "March", "April", 
"May", "June", "July", "August", "September", "October", 
"November", "December"];



 const weekDays = [
   {
     date:"Sun",
     text:''
   },
   {
    date:"Mon",
    text:''
   },
   {
    date:"Tue",
    text:''
   },
   {
    date:"Wed",
    text:''
   },
   {
    date:"Thu",
    text:''
   },
   {
    date:"Fri",
    text:''
   },
   {
    date:"Sat",
    text:''
   },
];
const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const Height = Dimensions.get('window').height; 
const currentDate = new Date();
export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeDate: new Date(),
      currentMonthIndex: 0,
      scheduleList : [],
      scheduleReady : false,
      TodayDate: new Date(),
      userData: {}
    }
  }
  componentDidMount = async() => {
    await this.getAccount();
    await this.getData();
  }

  getAccount = async() => {
    let data = await AuthService.getAccount();
    this.setState({
      userData : data
    })
    console.log("userData",this.state.userData);
  }

  getData = async() =>{
    let data = await HomeService.CalenderData(this.state.userData.staffID);
    this.setState({
      scheduleList : data.scheulesList,
      scheduleReady : true
    })
    console.log('data',data);
  }
  
  generateMatrix() {
    const { currentMonthIndex} = this.state;
    var matrix = [];
      // Create header
      matrix[0] = weekDays;
      var year = this.state.activeDate.getFullYear();
      var month = this.state.activeDate.getMonth();
      var firstDay = new Date(year, month, 1).getDay();
      var monthNumber;
      if(month<=8){
        monthNumber = '0'+(month+1);
      }else{
        monthNumber = month+1;
      }

      var maxDays = nDays[month];
      if (month == 1) { // February
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
          maxDays += 1;
        }
      }       

      // for (let index = 0; index <= currentMonthIndex; index++) {
       
    
        var counter = 1;
        let monthIndex=0;
      for (var row = 1; row < 7; row++) {
        matrix[row] = [];
        for (var col = 0; col < 7; col++) {
          matrix[row][col] = {
            date: -1,
          };

          let monthData = [];
          let price ; 
          let avl;
          let avlText;

           
           
          //  console.log("objectindex",index);

       

          if (row == 1 && col >= firstDay) {
            
            let CDate = counter++;
            
            if(CDate<=9){
              CDate = '0'+CDate;
            }
            let Mdate =  CDate+'-'+monthNumber+'-'+year;
            let jobLength = 0;
            let arrayIndex = 0;
            if(this.state.scheduleList.length !=0){
              jobLength = this.state.scheduleList.filter(val => val.scheduleStartDate.split(' ').find(Sdate => Sdate[0]) == Mdate).length;
              arrayIndex = this.state.scheduleList.indexOf(this.state.scheduleList.find(val => val.scheduleStartDate.split(' ').find(Sdate => Sdate[0]) == Mdate));

            }
            monthIndex++;
            matrix[row][col] = {
              date: CDate,
              job : jobLength,
              fullDate : Mdate,
              index : arrayIndex
            };
          
          } else if (row > 1 && counter <= maxDays) {
            let CDate = counter++;
            
            if(CDate<=9){
              CDate = '0'+CDate;
            }
            let Mdate =  CDate+'-'+monthNumber+'-'+year;
            let jobLength = 0;
            let arrayIndex = 0;
            if(this.state.scheduleList.length !=0){
              jobLength = this.state.scheduleList.filter(val => val.scheduleStartDate.split(' ').find(Sdate => Sdate[0]) == Mdate).length;
              arrayIndex = this.state.scheduleList.indexOf(this.state.scheduleList.find(val => val.scheduleStartDate.split(' ').find(Sdate => Sdate[0]) == Mdate));
              // if(arrayIndex != -1){
              //   console.log('color',this.state.scheduleList[3].scheduleColorCode)
              // }
            }
            monthIndex++;
            matrix[row][col] = {
              date: CDate,
              job : jobLength,
              fullDate : Mdate,
              index : arrayIndex
            };
            
          }
        }
      }
    // } 
      // console.log("matrix",matrix);
      return matrix;
  }

  // _onPress = (item) => {    
  //   this.setState(() => {
  //     if (!item.match && item != -1) {
  //       this.state.activeDate.setDate(item);
  //       return this.state;
  //     }
  //   });
  // };

  async changeMonth(n) {
   
    // if(n>0){
    //   let endpoint;
    //   if(this.props.HType=='camp'){
    //     endpoint = 'get_camping_calender.php?func=getCalenderC&year='+this.state.activeDate.getFullYear()+'&month='+((this.state.activeDate.getMonth() + n)+1)+'&tour_id='+this.state.id;
    //   }else  if(this.props.HType=='homestay'){
    //     endpoint = 'get_homestay_calender.php?func=getCalender&calender='+this.state.activeDate.getFullYear()+'&month='+((this.state.activeDate.getMonth() + n)+1)+'&hotel_id='+this.state.id; 
    //   }else if(this.props.HType=='activity'){
    //     endpoint = 'get_activity_calender.php?func=getCalender&year='+this.state.activeDate.getFullYear()+'&month='+((this.state.activeDate.getMonth() + n)+1)+'&adven_id='+this.state.id;
    //   }else if(this.props.HType=='combo'){
    //     endpoint = 'get_combo_calender.php?func=getCalender&year='+this.state.activeDate.getFullYear()+'&month='+((this.state.activeDate.getMonth() + n)+1)+'&combo_id='+this.state.id;
    //   }

    //   let hData = await HttpClient.get(endpoint);

    
    //    this.state.calenderData.push(hData.calender) 
    //    console.log(this.state.calenderData)
       
    // }
    this.setState(() => {
      this.state.activeDate.setMonth(
        this.state.activeDate.getMonth() + n
      ),
      this.setState({
        currentMonthIndex : this.state.currentMonthIndex + n 
      });
      
      return this.state;
    });

    
   
  }

   isDateBeforeToday(date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
   }

  validateDate = ( date , jobs )  => {
    if(date != undefined ){
      let newDate = moment(new Date(date.split('-')[2],date.split('-')[1]-1,date.split('-')[0]));
      // console.log(newDate);
      let ddd= moment(new Date());
      NavigationService.navigate('JobScreen',{data : this.state.scheduleList,date : date})
      if(newDate > ddd && jobs > 0){
        NavigationService.navigate('JobScreen',{data : this.state.scheduleList,date : date})
      }else if(newDate.format('DD/MM/YYYY') == ddd.format('DD/MM/YYYY') && jobs > 0){
        NavigationService.navigate('JobScreen',{data : this.state.scheduleList,date : date})
      }
    }
    
  }

  render() {
    var matrix = this.generateMatrix();
    var rows = [];

    rows = matrix.map((row, rowIndex) => {
        var rowItems = row.map((item, colIndex) => {
            return (
              <View
                key={colIndex}
                style={{
                  flex:1,
                  height:Height/8.36,
                  alignSelf:'center',
                  borderWidth:0.3,                 
                  backgroundColor: 
                        colIndex == 0 && this.state.activeDate.getDate()==item.date ? '#8C0101': 
                        item.index != -1 && item.date != -1 && rowIndex != 0 && this.state.scheduleReady==true ? 
                        this.state.scheduleList[item.index].scheduleColorCode : '#fff',
                  
                }}
                
                // onTouchEnd={item.job > 0 ? ()=> NavigationService.navigate('JobScreen',{data : this.state.scheduleList,date : item.fullDate}) : null}
                onTouchEnd={() => this.validateDate( item.fullDate , item.job  )}
              >
                <Text
                    style={{
                      fontSize:16,
                        textAlign: 'center',
                        fontWeight: item.date == this.state.activeDate.getDate() ? 'bold': 'normal',
                        color: item.index != -1 && item.date != -1 && rowIndex != 0 && this.state.scheduleReady==true ? '#fff' :
                        colIndex == 0 ? '#A93226' : '#000' 
                    }}
                >
                    {
                        item.date != -1 ? item.date: ''
                    }
                </Text>
                   <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: item.date == this.state.activeDate.getDate() ? 'bold': 'normal',
                      color: item.index != -1 && item.date != -1 && rowIndex != 0 && this.state.scheduleReady==true ? '#fff' :
                      colIndex == 0 ? '#A93226' : '#000',
                      fontSize:12
                  }}
                  >
                    {
                        item.date > 0 && item.job > 0 ? item.job+' Job/Shift': ''
                    }
                  </Text>

                  {/* <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: item.date == this.state.activeDate.getDate() ? 'bold': 'normal',
                      color: colIndex == 0 && this.state.activeDate.getDate()==item.date ? '#fff': colIndex == 0 ? '#8C0101' : '#fff',
                      fontSize:9
                    }}
                  >
                    {
                      this.state.activeDate.getDate()==item.date ? '#1281CF' : item.index != -1 && item.date != -1 && rowIndex != 0 ? this.state.scheduleList[3].id : 'bal'
                    }
                  </Text> */}
              </View>
            );
        });
        return (
            <View
                style={{
                    // flex: 1,
                    flexDirection: 'row',
                    // padding: 9,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // borderWidth:1,
                    
                }}
                key={rowIndex}
            >
                {rowItems}
            </View>
        );
    });
    return (
        <View style={{height:'100%'}}>
            <View style={{height:'8%',backgroundColor:'#1281CF',flexDirection:'row'}}>
                <View style={{height:'100%',width:'20%',alignItems:'center',justifyContent: 'center',}}>
                    <TouchableOpacity onPress={() => NavigationService.openDrawer()}>
                        <Icon name="menu" type="Entypo" style={{color:'#fff'}} />
                    </TouchableOpacity>
                </View>               
                <View style={{height:'100%',width:'40%',alignItems:'center',justifyContent: 'center',}}>
                    <Text 
                        style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            textAlign: 'center',
                            color:'#fff'
                        }}
                    >
                        {months[this.state.activeDate.getMonth()]} &nbsp;
                        {this.state.activeDate.getFullYear()}
                    </Text>
                </View>
            </View>
            <View>
                { rows }
            </View>
            <View style={{height:'8%',backgroundColor:'#1281CF',flexDirection:'row',position:'absolute',bottom:0}}>
              {
                // this.state.activeDate.getMonth()> currentDate.getMonth() ? 
                <View style={{height:'100%',width:'20%',alignItems:'center',justifyContent: 'center',}}>
                    <Icon name="leftcircleo" type="AntDesign" style={{color:'#fff'}} onPress={()=>this.changeMonth(-1)}/>
                </View>
                // :
                // <View style={{height:'100%',width:'20%',alignItems:'center',justifyContent: 'center',}}>
                //     <Icon name="leftcircleo" type="AntDesign" style={{color:'gray'}} />
                // </View>
              }
                
                <View style={{height:'100%',width:'60%',alignItems:'center',justifyContent: 'center',}}>
                    <Text 
                        style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            textAlign: 'center',
                            color:'#fff'
                        }}
                    >
                        {months[this.state.activeDate.getMonth()]} &nbsp;
                        {this.state.activeDate.getFullYear()}
                    </Text>
                </View>
                <View style={{height:'100%',width:'20%',alignItems:'center',justifyContent: 'center',}}>
                    <Icon name="rightcircleo" type="AntDesign" style={{color:'#fff'}} onPress={()=>this.changeMonth(+1)}/>
                </View>
            </View>
        </View>
    );
  }
}
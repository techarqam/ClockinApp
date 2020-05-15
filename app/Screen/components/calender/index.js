import React from 'react';
import{
  View,Text,Button, Dimensions
} from 'react-native';
import { Icon } from 'native-base';
import CustomHeader from '../Header/CustomHeader';

const months = ["January", "February", "March", "April", 
"May", "June", "July", "August", "September", "October", 
"November", "December"];
const calenderData =[
  {
    "id": 7,
    "day": "01",
    "date": "2020-02-1",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 8,
    "day": "02",
    "date": "2020-02-2",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 9,
    "day": "03",
    "date": "2020-02-3",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 10,
    "day": "04",
    "date": "2020-02-4",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 11,
    "day": "05",
    "date": "2020-02-5",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 12,
    "day": "06",
    "date": "2020-02-6",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 13,
    "day": "07",
    "date": "2020-02-7",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 14,
    "day": "08",
    "date": "2020-02-8",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 15,
    "day": "09",
    "date": "2020-02-9",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 16,
    "day": "10",
    "date": "2020-02-10",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 17,
    "day": "11",
    "date": "2020-02-11",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 18,
    "day": "12",
    "date": "2020-02-12",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 19,
    "day": "13",
    "date": "2020-02-13",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 20,
    "day": "14",
    "date": "2020-02-14",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 21,
    "day": "15",
    "date": "2020-02-15",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 22,
    "day": "16",
    "date": "2020-02-16",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 23,
    "day": "17",
    "date": "2020-02-17",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 24,
    "day": "18",
    "date": "2020-02-18",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 25,
    "day": "19",
    "date": "2020-02-19",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 26,
    "day": "20",
    "date": "2020-02-20",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 27,
    "day": "21",
    "date": "2020-02-21",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 28,
    "day": "22",
    "date": "2020-02-22",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 29,
    "day": "23",
    "date": "2020-02-23",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 30,
    "day": "24",
    "date": "2020-02-24",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 31,
    "day": "25",
    "date": "2020-02-25",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 32,
    "day": "26",
    "date": "2020-02-26",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 33,
    "day": "27",
    "date": "2020-02-27",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 34,
    "day": "28",
    "date": "2020-02-28",
    "avail": "5",
    "price": "1200",
    "status": "Y"
},
{
    "id": 35,
    "day": "29",
    "date": "2020-02-29",
    "avail": "5",
    "price": "1200",
    "status": "Y"
}
]


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
export default class Calendar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeDate: new Date(),
      HType:this.props.HType,
      id:this.props.id,
      currentMonthIndex: 0
    }
  }
  componentDidMount(){
  }
  
  generateMatrix() {
    const { currentMonthIndex} = this.state;
    var matrix = [];
      // Create header
      matrix[0] = weekDays;
      var year = this.state.activeDate.getFullYear();
      var month = this.state.activeDate.getMonth();
      var firstDay = new Date(year, month, 1).getDay();

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
          monthData = calenderData[currentMonthIndex];
           
           console.log("monthData",currentMonthIndex)
          //  console.log("objectindex",index);

       

          if (row == 1 && col >= firstDay) {
            if(calenderData.length > 0){
              // console.log("calenderData[0]",monthIndex)
              // if(monthData[monthIndex].status=='Y'){
              //   price = monthData[monthIndex].price;
              //   avl = monthData[monthIndex].avail 
              // }else{
              //   price = 'N/A';
              //   avl = 'N/A' 
              // }
              // if(this.props.HType=='camp'){
              //   avlText='Camps'
              // }else  if(this.props.HType=='homestay'){
              //   avlText='Rooms'
              // }else if(this.props.HType=='activity'){
              //   avlText='Activity'
              // }else if(this.props.HType=='combo'){
              //   avlText='Combo'
              // }
              
            }
            let CDate = counter++;
            monthIndex++;
            matrix[row][col] = {
              date: CDate,
              // price: price ,
              // avl: avl,
              // avlText: avlText
            };
          
          } else if (row > 1 && counter <= maxDays) {
            if(calenderData.length > 0){
              // console.log("calenderData[0]",monthIndex)
              // if(monthData[monthIndex].status=='Y'){
              //   price = monthData[monthIndex].price;
              //   avl = monthData[monthIndex].avail 
              // }else{
              //   price = 'N/A';
              //   avl = 'N/A' 
              // }
              // if(this.props.HType=='camp'){
              //   avlText='Camps'
              // }else  if(this.props.HType=='homestay'){
              //   avlText='Rooms'
              // }else if(this.props.HType=='activity'){
              //   avlText='Activity'
              // }else if(this.props.HType=='combo'){
              //   avlText='Combo'
              // }
              
            }

            let CDate = counter++;
            monthIndex++;
            matrix[row][col] = {
              date: CDate,
              // price: price ,
              // avl: avl,
              // avlText: avlText
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

  render() {
    const {calenderData } = this.state;
    var matrix = this.generateMatrix();
    var rows = [];

    rows = matrix.map((row, rowIndex) => {
        var rowItems = row.map((item, colIndex) => {
            return (
              <View
                key={colIndex}
                style={{
                  flex:1,
                  height:Height/8.65,
                  alignSelf:'center',
                  borderWidth:0.3,
                  
                  backgroundColor: colIndex == 0 && this.state.activeDate.getDate()==item.date? '#8C0101': rowIndex == 0 || this.state.activeDate.getDate()==item.date ? '#fff' : '#fff',
                  
                }}
                onTouchEnd={()=>this.props.closemodal(false)}
              >
                <Text
                    style={{
                      fontSize:16,
                        textAlign: 'center',
                        fontWeight: item.date == this.state.activeDate.getDate() ? 'bold': 'normal',
                        color: colIndex == 0 && this.state.activeDate.getDate()==item.date ? '#fff': colIndex == 0 ? '#A93226' : '#1281CF' 
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
                      color: colIndex == 0 && this.state.activeDate.getDate()==item.date ? '#fff': colIndex == 0 ? '#A93226' : '#1281CF',
                      fontSize:10
                  }}
                  >
                    2 job
                  </Text>

                  {/*<Text
                    style={{
                      textAlign: 'center',
                      fontWeight: item.date == this.state.activeDate.getDate() ? 'bold': 'normal',
                      color: colIndex == 0 && this.state.activeDate.getDate()==item.date ? '#fff': colIndex == 0 ? '#8C0101' : '#fff',
                      fontSize:9
                    }}
                  >
                    {item.date > 0 ? 'Rs: '+item.price:''}
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
            >
                {rowItems}
            </View>
        );
    });
    return (
        <View style={{height:'100%'}}>
            <View style={{height:'8%',backgroundColor:'#1281CF',flexDirection:'row'}}>
              {
                this.state.activeDate.getMonth()> currentDate.getMonth()?
                <View style={{height:'100%',width:'20%',alignItems:'center',justifyContent: 'center',}}>
                    <Icon name="menu" type="Entypo" style={{color:'#fff'}} onPress={()=>this.changeMonth(-1)}/>
                </View>
                :
                <View style={{height:'100%',width:'20%',alignItems:'center',justifyContent: 'center',}}>
                    <Icon name="menu" type="Entypo" style={{color:'#fff'}} />
                </View>
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
                {/* <View style={{height:'100%',width:'20%',alignItems:'center',justifyContent: 'center',}}>
                    <Icon name="rightcircleo" type="AntDesign" style={{color:'#fff'}} onPress={()=>this.changeMonth(+1)}/>
                </View> */}
            </View>
            <View >
                { rows }
            </View>
            <View style={{height:'8%',backgroundColor:'#1281CF',flexDirection:'row'}}>
              {
                this.state.activeDate.getMonth()> currentDate.getMonth()?
                <View style={{height:'100%',width:'20%',alignItems:'center',justifyContent: 'center',}}>
                    <Icon name="leftcircleo" type="AntDesign" style={{color:'#fff'}} onPress={()=>this.changeMonth(-1)}/>
                </View>
                :
                <View style={{height:'100%',width:'20%',alignItems:'center',justifyContent: 'center',}}>
                    <Icon name="leftcircleo" type="AntDesign" style={{color:'gray'}} />
                </View>
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
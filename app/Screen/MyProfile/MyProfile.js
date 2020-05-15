import React, { Component } from 'react';
import { View, Text,TextInput,StyleSheet,Image } from 'react-native';
import { Container, Content, List, ListItem, Card } from 'native-base';
import NavigationService from '../../Service/Navigation';
import CustomHeader from '../components/Header/CustomHeader';
import FooterComponent from '../components/Footer/Footer';
export default class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Container>
          <CustomHeader name="My Profile" />
        <Content>                                    
            <Card style={{height:150,width:150,borderRadius:80,justifyContent:'center',alignItems:'center',elevation:10,alignSelf:'center'}}>
                <Image source={{uri:'https://steemitimages.com/640x0/https://res.cloudinary.com/hpiynhbhq/image/upload/v1514546912/hpvlrvffjtdq6fcxroyc.png'}}
                    style={{height:150,width:150}}
                />
            </Card>
            <Text style={{fontSize:20,fontFamily:'Aclonica-Regular',textAlign:'center'}}>Rohan Maity</Text>               

          <List>
            <ListItem>               
              <Text style={styles.maintext} >Name :</Text>
              <TextInput value="rohan Maity" style={styles.maintextinput} />
            </ListItem>
            <ListItem>
              <Text style={styles.maintext} >Email :</Text>
              <TextInput value="maityrohan420@gmail.com" style={styles.maintextinput} />
            </ListItem>
            <ListItem>
              <Text style={styles.maintext} >Address :</Text>
              <TextInput value="Jhargram,West Bengal,721507" style={styles.maintextinput} />
            </ListItem>
            <ListItem>
              <Text style={styles.maintext} >Phone No :</Text>
              <TextInput value="9749965211" style={styles.maintextinput} />
            </ListItem>
          </List>
        </Content>
        <FooterComponent/>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
    maintext:{
        fontSize:13,
        fontFamily:'Aclonica-Regular',       
    },
    maintextinput:{
        color:'#ABB2B9'
    }
})
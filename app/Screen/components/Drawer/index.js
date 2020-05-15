import React, { Component } from "react";
import { Image, StyleSheet, Dimensions, ScrollView, Text, TouchableOpacity } from "react-native";
import AuthService from '@Service/Auth';
import {
    Icon,
    Container,
    View,
    Button,
    List,
    ListItem,
    Content
} from "native-base";
import NavigationService from '@Service/Navigation';

const screenHeight = Math.round(Dimensions.get('window').height);

export default class Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4,
            userData: []
        };
    }

    componentDidMount = async() => {
        let userData = await AuthService.getAccount();
        console.log(userData);
        this.setState({
            userData : userData
        })
    }



    logout = async() => {
        await AuthService.logout(); 
        NavigationService.navigate('Login');
    }

    render() {
        return (

            <Container style={{ backgroundColor: '#00CCFF' }}>
                <View style={styles.mainstyle}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ height: 200 }}>
                            <Image blurRadius={1} source={{ uri: 'https://images.pexels.com/photos/164175/pexels-photo-164175.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} style={{ height: 200, resizeMode: 'cover', width: null }} />
                            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 10, left: 10 }}>
                                <Image style={{ borderRadius: 60, height: 60, resizeMode: 'cover', width: 60 }} source={{ uri: 'https://helpiewp.com/wp-content/uploads/2017/12/user-roles-wordpress.png' }} />
                                <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                                    <Text style={{ fontWeight: 'bold', color: '#fff' }}>
                                        {this.state.userData.userDisplayName}
                                    </Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 12, color: '#fff' }}>Edit Profile</Text>
                                        <TouchableOpacity onPress={() => NavigationService.navigate('Profile')}>
                                            <Icon style={{ fontSize: 20, color: '#fff', marginLeft: 5 }} name="square-edit-outline" type="MaterialCommunityIcons" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <Content>
                            <List>
                                <ListItem last >
                                    <TouchableOpacity
                                        onPress={() => { NavigationService.navigate('HomeTab') }}
                                    >
                                        <Text style={styles.sectionHeadingStyle}>
                                            My Calendar
                                </Text>
                                    </TouchableOpacity>
                                </ListItem>
                                <ListItem last>
                                    <TouchableOpacity
                                        onPress={() => { NavigationService.navigate('DocumentScreen') }}
                                    >
                                        <Text style={styles.sectionHeadingStyle}>
                                            Upload Document
                                </Text>
                                    </TouchableOpacity>
                                </ListItem>
                                <ListItem last>
                                    <TouchableOpacity
                                        onPress={() => { NavigationService.navigate('MyProfileScreen') }}
                                    >
                                        <Text style={styles.sectionHeadingStyle}>
                                            My Profile
                                </Text>
                                    </TouchableOpacity>
                                </ListItem>
                                <ListItem last>
                                    <TouchableOpacity
                                        onPress={() => { NavigationService.navigate('PayoutScreen') }}
                                    >
                                        <Text style={styles.sectionHeadingStyle}>
                                            My Payroll
                                </Text>
                                    </TouchableOpacity>
                                </ListItem>
                                <ListItem last>
                                    <TouchableOpacity
                                        onPress={this.logout}
                                    >
                                        <Text style={styles.sectionHeadingStyle}>
                                            Logout
                                        </Text>
                                    </TouchableOpacity>
                                </ListItem>

                            </List>
                        </Content>
                    </ScrollView>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        //   flex: 1,
        //   alignItems: "center",
        //   justifyContent: "center"
    },
    sectionHeadingStyle: {
        marginLeft: 20,
        color: '#000',
        fontSize: 16,
        

    },
    navSectionStyle: {
        backgroundColor: 'lightgrey'
    },
    navItemStyle: {

    }
    ,
    mainstyle: {
        backgroundColor: '#fff',
        height: screenHeight,
    },
    menuitem: {
        height: 50,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',

    },
    footerbutton: {

        backgroundColor: '#fff',
        height: 100,
        // flex:2,
        // marginTop:20,
        // marginHorizontal:20,
        alignItems: 'center',
        borderTopWidth: .25,
        borderTopColor: '#fff',
        // marginBottom:0

    },
    button: {
        marginLeft: 10,
        width: 210,
        backgroundColor: '#e91e63',
        alignSelf: "center"

    }

});
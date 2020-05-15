import React, { Component } from 'react';
import { View, Text,StatusBar } from 'react-native';
import { Container,Header,Left,Body,Right,Title,Button,Icon } from 'native-base';
import NavigationService from '../../../Service/Navigation';
export default class CustomHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
       
    };
  }

  render() {
    return (
      <View style={{height:50,width:'100%'}}>
          <Header style={{ backgroundColor: '#1281CF', height: 50, opecity: 0.2 }}>
          <StatusBar backgroundColor="#1281CF" barStyle="light-content" />
                    <Left>
                        <Button transparent onPress={() => NavigationService.openDrawer()}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{fontFamily:'EmilysCandy-Regular'}}>{this.props.name}</Title>
                    </Body>
                    <Right>
                      
                    </Right>                    
            </Header>
      </View>
    );
  }
}

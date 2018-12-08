/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,  TouchableOpacity, FlatList} from 'react-native';
import SendSMS from 'react-native-sms-x';
import axios from 'axios';
import Item from './components/row'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state={
      sms: []
    }
  }
  sendSMSFunction() {
    this.state.sms.forEach((item, index)=>{
      var x = item.msg;
      for(var i = 0; i < index; i++)
        x+=".";
      SendSMS.send(123, "+976" + item.phone, x , (msg)=>{ alert(msg) });
    })
  }
  getSms(){
    const temp = this;
    console.log("putang ina")
        axios.get('http://hubspottest.tk/api/', {
          params: {
              type: "GET_SMS",
          }
      })
      .then(function (response) {
          setTimeout(()=>{
              temp.setState({
                sms : response.data
              })
          }, 1);
        })
      .catch(function (error) {
          console.log(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>   
      
      <FlatList
            data={this.state.sms}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={(item, index) => index.toString()}
            /> 
        <View style={{flexDirection:"row", justifyContent: "space-between"}}>

         
      <TouchableOpacity style={styles.button} onPress={this.getSms.bind(this)}>
        <Text>Мсж шинэчлэх</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={this.sendSMSFunction.bind(this)}>
        <Text>Мсж илгээх</Text>
      </TouchableOpacity>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    padding: 10,
    borderWidth: .5,
    borderColor: '#bbb',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }

});

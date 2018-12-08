import React from 'react';
import {View, Text, Image, TouchableHighlight} from 'react-native';

class Item extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fav: this.props.item.fav
        }
        
    }

    render(){

        const {item:{id, phone, msg, state} }= this.props;
        
        return(
        <View style={{justifyContent:"space-between", flexDirection:"row", backgroundColor:"gray"}}>
                <Text style={{padding: 5}} >{id}</Text>     
                <Text style={{padding: 5}} >{phone}</Text>     
                <Text style={{padding: 5}}>{msg}</Text>     
                <Text style={{padding: 5}}>{parseInt(state)?"илгээсэн": "илгээгээгүй"}</Text>        
        </View>
        )
    }
}
export default Item;
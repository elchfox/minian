import React, {useEffect} from "react";
import {Text, View,StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import { COLORS, SIZES } from "../constants";

var s = require('../style')

const Room = ({item})=> {
     let navigation =  useNavigation()
      let distance = item.distance >= 1000 ? (item.distance / 1000).toFixed(1) + " km" : item.distance.toFixed(0) + " m"
      return (
        <TouchableOpacity 
        onPress={()=> navigation.navigate("Room",{id:item._id})}
        style={[s.rowSpaceBetween,s.boxShadowC,{
         overflow:'hidden',
          borderRadius:10,backgroundColor:COLORS.primary2,marginVertical:5}]}>
            <View style={[{padding:8,flex:0.8}]}>
              <Text style={{color:COLORS.white,fontSize:12}}>{item.address}</Text>
          </View>
          <View style={[{flex:0.2,backgroundColor:COLORS.primary}]}>
          <View style={[s.rowSpaceBetween,s.centerRow,{paddingHorizontal:10}]}>
              <Text style={{fontSize:12,color:COLORS.secondary}}>{distance}</Text>
              <Icon name={"location-arrow"} size={SIZES.h5} color={COLORS.primary2}/>
            </View>
            <View style={{backgroundColor:COLORS.primary2,width:"100%",height:0.5}}/>
            <View style={[s.rowSpaceBetween,s.centerRow,{paddingHorizontal:10}]}>
              <Text style={{fontSize:12,color:COLORS.secondary}}>{item.joinedCount}</Text>
              <Icon name={"users"} size={SIZES.h5} color={COLORS.primary2}/>
            </View>
          </View>
        </TouchableOpacity>
      );

  }
  

export default Room


const styles = StyleSheet.create({
  timeStyle:{
    fontSize:14,
    alignSelf:'flex-end',
    marginLeft:5,
    color:COLORS.darkgray

  }
  });
  


  
import React, {useEffect} from "react";
import {Text, View,StyleSheet} from 'react-native';


import { COLORS, SIZES } from "../constants";

var s = require('../style')
var moment = require('moment')

const Message = ({ item})=> {
  let checkOwner = item.userId === global.userId
  let colorText = !checkOwner ? COLORS.primary : COLORS.secondary
  let colorBG = checkOwner ? COLORS.primary : COLORS.secondary
      let stylesWapper = {    padding:8,
      alignSelf: !checkOwner  ? 'flex-end': 'flex-start' ,
      borderRadius:8,backgroundColor: colorBG,marginVertical:5}

      return (
        <View style={[s.boxShadowC,stylesWapper]}>
              <Text >{item.firstName}</Text>
              <View style={{flexDirection:'row'}}>
                <Text style={{color:colorText,fontSize:18,maxWidth:"80%"}}>{item.message}</Text>
                <Text style={styles.timeStyle}>{moment(item.timestamp).format("HH:mm")}</Text>
              </View>
        </View>
      );

  }
  

export default Message


const styles = StyleSheet.create({
  timeStyle:{
    fontSize:14,alignSelf:'flex-end',marginLeft:5,color:COLORS.darkgray

  }
  });
  


  
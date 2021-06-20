import React, {useEffect} from "react";
import {Text, View,StyleSheet} from 'react-native';


import { COLORS, SIZES } from "../constants";

var s = require('../style')
var moment = require('moment')

const Participant = ({ item})=> {
        let r = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))
      let stylesWapper = {
        
        borderColor:"white", borderWidth:0.5,
        width:20,height:20,borderRadius:20,marginRight:5,backgroundColor:`rgb(${r},${b},${g})`}

      return (
        <View style={[{padding:5}]}>
          <View style={[s.center,stylesWapper]}>
            <Text style={{fontSize:12,color:hsp > 127.5 ? "white" : "black"}}>{item.fullName[0].toUpperCase()}</Text>
          </View>
        </View>
      );

  }
  

export default Participant


const styles = StyleSheet.create({
  timeStyle:{
    fontSize:14,alignSelf:'flex-end',marginLeft:5,color:COLORS.darkgray

  }
  });
  


  
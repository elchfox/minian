import React, {useEffect} from "react";
import {Text, TouchableOpacity,StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';

import { COLORS, SIZES } from "../constants";

var s = require('../style')

const IconBtn = ({ name,icon, onPress})=> {


//icons of (nav & phone & link) inside of list items
      return (
      <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.FeedBackBtn}>
        <Icon name={icon} size={SIZES.body3} color={COLORS.primary} style={{marginRight:SIZES.padding2}}/>
        <Text style={[{fontSize:SIZES.body3,color:COLORS.primary}]}>{name}</Text>
      </TouchableOpacity>
      );

  }
IconBtn.prototypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
   
}
  
IconBtn.defaultProps = {
    name:"Name"    
};
export default IconBtn


const styles = StyleSheet.create({

    FeedBackBtn:{
      flex: 1,
      flexDirection: "row",
      alignItems:'center',
      justifyContent:'center',
      padding:SIZES.padding
      
    }
  });
  


  
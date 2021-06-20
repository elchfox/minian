
import React , {useState,useEffect,useRef} from "react";
import {View,TouchableOpacity, Text,FlatList} from 'react-native';

import { useObserver,observer } from "mobx-react-lite";
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS, SIZES, STYLE_DIR} from "../constants"

import GeneralStore  from "../stores/GeneralStore";
import GeoLocation from "../methods/GeoLocation";
import { toJS } from "mobx";
import General from "../methods/General";
import Room from "../components/Room";
// import Tabs from "../Tabs/TabsStack";

const general =  GeneralStore;
var s = require('../style')

 const HomeScreen = observer(({navigation,route })=> {


      useEffect(() => {
        GeneralStore.startRooms()
      }, []);

    
      
      return (
     <View style={[s.wapperHomePage,{padding:15}]}>
            <TouchableOpacity onPress={()=> GeneralStore.createRoom()} style={{backgroundColor:COLORS.primary,borderRadius:10,padding:10}}>
              <Text style={{color:"white"}}>Create New Minian +</Text>
            </TouchableOpacity>
            <FlatList data={GeneralStore.minians} 
                  renderItem={({item})=> <Room item={item}/>}
                  keyExtractor={(item, index) => index.toString()} /> 
        </View> 
      );
    })
  


export default HomeScreen
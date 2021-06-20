
import React , {useState,useEffect,useRef} from "react";
import {View,TouchableOpacity, Text,FlatList,TextInput,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useObserver,observer } from "mobx-react-lite";
// import Icon from 'react-native-vector-icons/FontAwesome5';
import  {socket}  from "socket.io-client";
import {COLORS, SIZES, STYLE_DIR} from "../constants"
import GeneralStore  from "../stores/GeneralStore";
import GeoLocation from "../methods/GeoLocation";
import { toJS } from "mobx";
import General from "../methods/General";
import { useSocket } from '../contexts/SocketProvider';

import Message from "../components/Message";
import Participant from "../components/Participant";
// import Tabs from "../Tabs/TabsStack";

const general =  GeneralStore;
var s = require('../style')
var moment = require('moment')

 const RoomScreen = observer(({navigation,route })=> {

    const socket = useSocket()
    const [message, setMessage] = useState(null)
      useEffect(() => {
        let id = route.params.id
            GeneralStore.getByRoomId(id)
            GeneralStore.getMessages(id)
            socket.on('sendMassage', (data)=> {
              console.log(data)
              GeneralStore.messages = [data,...GeneralStore.messages]
              setMessage(null)
            })
  
            socket.emit('join', {roomId:route.params.id})
              return ()=>{
                socket.off('join')
                socket.off('sendMassage')
              }

      }, []);

      const Join = ()=>{
         
          socket.emit('join', {roomId:route.params.id})
          socket.on('join', (data)=> {
            GeneralStore.room = [...GeneralStore.room,data]
            GeneralStore.joined = true
          })
        }
      
      const creatNew = ()=>{
         
          socket.emit('sendMassage', {roomId:route.params.id,message})
    
        }
      
      return (
     <View style={[s.wapperHomePage]}>
       <View style={[{flexDirection:'row',backgroundColor:COLORS.primary}]}>
          <FlatList data={GeneralStore.room} 
            horizontal 
            renderItem={({item})=> <Participant item={item}/>}/>
            <View style={[s.row,s.center,{flex:0.2,backgroundColor:COLORS.primary2,
              borderTopLeftRadius:20,borderBottomLeftRadius:20}]}>
              <Text style={{color:COLORS.primary}}>{GeneralStore.joinedCount}</Text>
              <Icon name={"users"} size={SIZES.h5} color={COLORS.primary}/>
            </View>
        </View>
        <FlatList data={GeneralStore.messages} inverted 
        style={{paddingHorizontal:15,marginBottom:45}} 
        renderItem={({item})=> <Message item={item}/>}
                  keyExtractor={(item, index) => index.toString()}
                  /> 
                  {GeneralStore.joined  ? 
                  <View  style={[styles.boxBottom,s.rowSpaceBetween, s.centerRow,{ 
                    paddingHorizontal:10, backgroundColor:COLORS.secondary}]}>
                    <TextInput placeholder="Message..."  value={message}
                    style={{flex:0.9}}
                    onChangeText={(text)=> setMessage(text)}/>
                    <TouchableOpacity disabled={message === null || message.length === 0 }
                    style={{borderRadius:50,flex:0.1}}
                    onPress={()=> creatNew()}>
            <Icon  name="send" color={message ? COLORS.primary : COLORS.darkgray} style={{textAlign:'center'}} size={24}/>
          </TouchableOpacity>
                  </View>
                  :
          <TouchableOpacity 
          onPress={()=> Join()}
          style={[styles.boxBottom,{padding:10}]}>
            <Text style={{textAlign:"center",color:"white"}}>Join</Text>
          </TouchableOpacity>}
        </View> 
      );
    })
  


export default RoomScreen

const styles = StyleSheet.create({
  boxBottom:{position:"absolute",
  bottom:0,right:0,left:0,
  
  backgroundColor:COLORS.primary}
})
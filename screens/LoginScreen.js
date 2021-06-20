
import React , {useState,useEffect,useRef} from "react";
import {View,TouchableOpacity, Text,StyleSheet,TextInput} from 'react-native';

import { useObserver,observer } from "mobx-react-lite";
// import Icon from 'react-native-vector-icons/FontAwesome5';
import  io  from "socket.io-client";



import {COLORS, SIZES, STYLE_DIR} from "../constants"
import GeneralStore  from "../stores/GeneralStore";
import GeoLocation from "../methods/GeoLocation";
import { toJS } from "mobx";
import Auth from "../methods/Auth";
// import Tabs from "../Tabs/TabsStack";
let emailCheck = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const general =  GeneralStore;
var s = require('../style')
const initUser = {email:null,password:null}
 const LoginScreen = observer(({navigation,route })=> {

    const [user,setUser] = useState(initUser)
    const [errorMessage,setErrorMessage] = useState(null)

      useEffect(() => {
        GeneralStore.geoLocation()
        socket = io(global.baseUrl);
       
        socket.on('createNew', (error) => {
         console.log(error)
        });

      }, []);

      const creatNew = async ()=>{
         
          socket.emit('createNew', {location:GeneralStore.location});

        }
      const onChangeText = (name,text) =>{
        setUser({
          ...user,
          [name]:text
        })
      }
      const onSubmit = async () =>{
        Object.keys(user).map((item)=>{
          if(user[item].length === 0){
            setErrorMessage(`The ${item} can not be empty`);
            return;
          }
        
        })
        if(!errorMessage){
            let res = await Auth.Signin(user)
          if(!res.error){
          navigation.navigate("Home")        
        }}
      }
      return (
        <View style={[s.column,s.center,{flex:1,padding:15}]}>
           <TextInput style={styles.input} placeholder="email" onChangeText={(text)=> onChangeText('email',text)}/>
           <TextInput style={styles.input} placeholder="password" onChangeText={(text)=> onChangeText('password',text)}/>
           <TouchableOpacity onPress={()=>onSubmit()}>
             <Text>Login</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> navigation.navigate("Register")      }>
             <Text>si</Text>
           </TouchableOpacity>
           {errorMessage !== null && <Text>{errorMessage}</Text>}
        </View> 
      );
    })
  


export default LoginScreen

const styles = StyleSheet.create({
  btn: {
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',backgroundColor:'#eee',width: '50%',  height:40,borderRadius:SIZES.radius
},
btnType:{
  width:  (SIZES.width / 5) - 15,
  height:(SIZES.width / 5) - 15,
  borderRadius:SIZES.radius,
  justifyContent:'center',
  alignItems:'center',
  marginBottom:5,
  borderColor:COLORS.primary,
  borderWidth:0.4

},
errorStyle:{margin:5,alignSelf:'center', color:COLORS.danger, textAlign:'center',borderRadius:5,padding:2,
backgroundColor:"#ffd4d4"},
input:{
  borderRadius:SIZES.radius,
  height:40,
  width:"100%",
  paddingHorizontal:5,
  marginBottom:SIZES.padding,
  backgroundColor:COLORS.colorBGsec
}
})
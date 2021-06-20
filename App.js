import React ,{useEffect,useState} from 'react';

import {useObserver, observer} from "mobx-react-lite";
import { I18nManager, StatusBar} from 'react-native';

import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from "react-native-splash-screen";
import { SocketProvider } from './contexts/SocketProvider';

import StoreProvider, { GeneralStore } from "./stores";
import {Home, Login, Register, Room} from './screens'
import { COLORS } from './constants';
import Auth from './methods/Auth';

const Stack = createStackNavigator();

const App =  observer(()=>  {
  const [Screen, setScreen] = useState(null)
  const [UserId, setUserId] = useState(null)
  useEffect(async () => {
    await Auth.getStorage()
    if(global.userId  === null){
       setScreen("Login")
    }else{
      setScreen("Home")
    setUserId(global.userId)
    GeneralStore.startSocket()
    }

   }, []);

  return (
      <StoreProvider>
        <SafeAreaProvider>
          <StatusBar backgroundColor={COLORS.primary} />
          <SafeAreaView style={{ backgroundColor: COLORS.primary}}/>
          <NavigationContainer >
              <Stack.Navigator
                  screenOptions={{headerShown: false}}
                  initialRouteName={Screen}>
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="Register" component={Register} />
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Room" component={Room} />
              </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </StoreProvider> 
  );
});




export default App;

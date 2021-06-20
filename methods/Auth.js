import {toJS} from "mobx"
import Fetch from "./Fetch"
import AsyncStorage from "@react-native-async-storage/async-storage";

class Auth {


  
  async Signup(data) {
    let res = await Fetch.PostFetch(`/user/signup`,data)
    this.setStorage(res)
    return res
  }
  async Signin(data) {
    let res = await Fetch.PostFetch(`/user/signin`,data)
    console.log(res)
    this.setStorage(res)
    return res
  }
  async setStorage(data) {
    AsyncStorage.setItem("accessToken", data.token);
    AsyncStorage.setItem("userId", data.userId);
    AsyncStorage.setItem("firstName", data.firstName);
    AsyncStorage.setItem("lastName", data.lastName);
    AsyncStorage.setItem("fullName", data.fullName);
    AsyncStorage.setItem("email", data.email);
    this.getStorage()

  }
  async clear() {
    AsyncStorage.clear();

  }
  async getStorage() {
    let accessToken = await AsyncStorage.getItem("accessToken");
    let userId = await AsyncStorage.getItem("userId");
    let firstName = await AsyncStorage.getItem("firstName");
    let lastName = await AsyncStorage.getItem("lastName");
    let fullName = await AsyncStorage.getItem("fullName");
    let email = await AsyncStorage.getItem("email");
 
      global.accessToken = accessToken;
      global.userId = userId;
      global.firstName = firstName;
      global.lastName = lastName;
      global.fullName = fullName;
      global.email = email;
      console.log(  global.accessToken,
        global.userId)
      return global.userId !== null
  }
}

export default new Auth();
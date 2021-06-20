import Geolocation from '@react-native-community/geolocation';
import { Platform } from 'react-native';
// Geocoder.init("AIzaSyCMTwbZqKP95-z4nMU9NmRcjoQXCxebW-0",{language : "he"}); // use a valid API key

class GeoLocation {
  // get Current Location

  currentLocation = async () => {
    const data = await new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
     
        position =>  resolve(position),
        error =>   resolve(error) ,
        
        { enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 10000
        },

        // Platform.OS === "android" ? {} :  { enableHighAccuracy: true, timeout: 5000 },
      );
  });
  return data;

}
}


export default new GeoLocation();
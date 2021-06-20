import ImageResizer from "react-native-image-resizer";
import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import {  Image,NativeEventEmitter } from "react-native";
import Fetch from "../modules/Fetch";



// import Share from 'react-native-share';


class Helpers {
  rotatePicture(deviceOrientation) {
    if (deviceOrientation === 1) {
      return 0;
    } else if (deviceOrientation === 2) {
      return 180;
    } else if (deviceOrientation === 3) {
      return -90;
    } else if (deviceOrientation === 4) {
      return 90;
    }
    return 0;
  }

 
  async resize(width, height) {
    if (width > 480) {
      let Relate = height / width;
      let heightNew = Relate * width;
      let widthNew = width;

      return { width: widthNew, height: heightNew };
    } else {
      return { width: width, height: height };
    }
  }



  async uploadFileCloud(file) {

    let width = file.width !== undefined ? file.width : file.size.width;
    let height = file.height !== undefined ? file.height : file.size.height;
    let resizeRsult = await this.resize(width, height);
    

      let typeFile = file.type !== "image" && file.type !== null ? file.type : "image/jpeg";
      let type = typeFile.split("/").pop();
      let rotation =
        file.deviceOrientation !== undefined ? file.deviceOrientation : 0;
      type = type === "data" ? "jpeg" : type;

     let response = await ImageResizer.createResizedImage(
        file.uri,
        resizeRsult.width,
        resizeRsult.height,
        type.toUpperCase(),
        50,
        rotation)
        let fileSend = {
          uri: response.uri,
          name: response.name,
          type: "image/png"
        };
        let api_key = "439342527122145";
        let cloud = "dxxfpdolf";
        var formdata = new FormData();

        formdata.append("file", fileSend);
        formdata.append("cloud_name", cloud);
        formdata.append("api_key", api_key);
        formdata.append("upload_preset", "jwg48qab");
        
        let upload_url = "https://api.cloudinary.com/v1_1/" + cloud + "/image/upload";
       let res = await fetch(upload_url,{
          method:"POST",
          body:formdata

        })
        const json = await res.json()
        // let json = await  Fetch.PostFetchFile(upload_url,formdata)


          return json.secure_url;

  }



  muilt = async ()=> {
    
    const results = await DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.images],
    });
    let images = []
    for (const res of results) {

      let size = await new Promise(async (resolve, reject) => await Image.getSize(res.uri, (width, height) => {
        let sizeWidth = { width, height }
        resolve(sizeWidth)
      }))
        console.log(res);
      
      let item = {
       ...res,
        width: size.width, height: size.height
      }
      images.push(item)
    }
    return images
  }
  launchImageLibrarys = async () => {
    let options = {
      title: 'Select Image',
      allowsEditing: false,
      quality:0.9,
      noData: true,
      maxWidth:1200,
      maxHeight:1200,
      mediaType: "photo",
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
          skipBackup: true,
          cameraRoll: false
      },
    };
    return new Promise((resolve, reject) => { launchImageLibrary(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response',response);
        resolve(source)
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        // this.uploadFileCloud(response)
     
      }
    })})

  }
  
  

}

export default new Helpers();

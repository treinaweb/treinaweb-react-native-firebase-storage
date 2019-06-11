import {CameraRoll} from 'react-native';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import fs from 'react-native-fs';

const firebaseConfig = {
    apiKey: "AIzaSyDeHYbNJmSnA5fYdwDTQmKA_6GnouEXSIE",
    authDomain: "my-pictures-aafef.firebaseapp.com",
    databaseURL: "https://my-pictures-aafef.firebaseio.com",
    projectId: "my-pictures-aafef",
    storageBucket: "my-pictures-aafef.appspot.com",
    messagingSenderId: "271193187377",
    appId: "1:271193187377:web:9620c609f53083bf"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage(),
  storageRef = storage.ref('/');


export const FirebaseStorage = {
    async listAll(currentStorageRef = storageRef){
        const result = await currentStorageRef.listAll(),
            directoryList = result.prefixes,
            imageUrlList = await Promise.all(result.items.map(item => item.getDownloadURL())),
            imageList = result.items.map((item, index) => Object.assign(item, {uri: imageUrlList[index]}));

        return {imageList, directoryList, currentDirectory: currentStorageRef};
    },
    async downloadImage(imageRef){
        const fileName = `${fs.DocumentDirectoryPath}/${imageRef.name}`
        result = fs.downloadFile({
            fromUrl: imageRef.uri,
            toFile: fileName
        });
        await result.promise;
        await CameraRoll.saveToCameraRoll(`file://${fileName}`, 'photo');
        return fileName;
    },
    async uploadImage(currentStorageRef = storageRef){
        return new Promise((resolve, reject) => {
            ImagePicker.showImagePicker({
                title: 'Select a picture'
            }, async (response) => {
                if(response.uri){
                    const blob = await (await fetch('file://'+response.path)).blob();
                    currentStorageRef.child(response.fileName).put(blob, {contentType: response.type})
                    resolve(currentStorageRef);
                }else{
                    reject();
                }
            })
        })
    },
    async removeImage(imageRef){
        return imageRef.delete();
    }
}
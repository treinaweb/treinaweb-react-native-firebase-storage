import firebase from 'firebase';

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
    async removeImage(imageRef){
        return imageRef.delete();
    }
}
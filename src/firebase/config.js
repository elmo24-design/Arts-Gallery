import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
   apiKey: "AIzaSyAdoJ_SKqLK4lDXfpVvEEgOQaBgO_VxMbc",
   authDomain: "blogs-be62e.firebaseapp.com",
   databaseURL: "https://blogs-be62e.firebaseio.com",
   projectId: "blogs-be62e",
   storageBucket: "blogs-be62e.appspot.com",
   messagingSenderId: "950478078569",
   appId: "1:950478078569:web:75b884109246931a7798f8",
   measurementId: "G-SYY5T2M0S9"
 };

 firebase.initializeApp(firebaseConfig)

 const projectAuth = firebase.auth()
 const projectFirestore = firebase.firestore() //set up connection
 const projectStorage = firebase.storage()
 const timestamp = firebase.firestore.FieldValue.serverTimestamp

 export { projectAuth, projectFirestore, projectStorage, timestamp }

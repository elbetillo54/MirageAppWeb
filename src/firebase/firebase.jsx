import firebaseConfig from './config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(`Creado exitosamente`);
  
  const db = firebase.firestore();
  const storage = firebase.storage();
 
  export default {
    firebase,
    db,
    storage
}
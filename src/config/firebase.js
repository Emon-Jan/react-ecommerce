import firebase from "firebase/app";
import "firebase/storage";

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const MESSEGE_SENDER_ID = process.env.REACT_APP_MESSEGING_SENDER_ID;
const MEASUREMENT_ID = process.env.REACT_APP_MEASUREMENT_ID;
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: API_KEY,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${PROJECT_ID}.firebaseio.com`,
  projectId: PROJECT_ID,
  storageBucket: `${PROJECT_ID}.appspot.com`,
  messagingSenderId: MESSEGE_SENDER_ID,
  appId: `1:${MESSEGE_SENDER_ID}:web:9e5f8993b812be977bff54`,
  measurementId: MEASUREMENT_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { firebase, storage as default };

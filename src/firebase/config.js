import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBDcmbutzwPZOYjwPEOFewscp01jAvVnFE",
  authDomain: "usefully-7ba92.firebaseapp.com",
  projectId: "usefully-7ba92",
  storageBucket: "usefully-7ba92.appspot.com",
  messagingSenderId: "261724414959",
  appId: "1:261724414959:web:e335aaa3acdc5b6fb88c1a",
  measurementId: "G-7YF3BF8CGJ"
};

export const Firebase = firebase.initializeApp(firebaseConfig)//named export
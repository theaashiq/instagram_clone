import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
//import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCVKjSuKxiiucM6xeMON0SYukvvsc18-uw",
    authDomain: "instagram-clone-b4fc1.firebaseapp.com",
    projectId: "instagram-clone-b4fc1",
    storageBucket: "instagram-clone-b4fc1.appspot.com",
    messagingSenderId: "796816498756",
    appId: "1:796816498756:web:bb62023690dbe288e95c11",
    measurementId: "G-KS58ES7FNY"
  };

const app = firebase.initializeApp(firebaseConfig)
export const auth = app.auth()
export const db = getFirestore()

export default app
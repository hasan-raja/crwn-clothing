import firebase from 'firebase/app'; 

import 'firebase/firestore';    //for db
import 'firebase/auth'; //authentication

const config={
    apiKey: "AIzaSyC7iHrmj5CNtEus8E3rQ0dIkUO1Jfwi23w",
    authDomain: "crown-db-52eab.firebaseapp.com",
    databaseURL: "https://crown-db-52eab.firebaseio.com",
    projectId: "crown-db-52eab",
    storageBucket: "crown-db-52eab.appspot.com",
    messagingSenderId: "657884749385",
    appId: "1:657884749385:web:ce25206edb914be645a998",
    measurementId: "G-4KBJ72DH19"
  };

firebase.initializeApp(config); //initialising

export const auth= firebase.auth();
export const firestore = firebase.firestore();

const provider =new firebase.auth.GoogleAuthProvider(); //access to authentication lib
provider.setCustomParameters({prompt:'select_account'});    //custom pop parameter
export const signInWithGoogle=()=>auth.signInWithPopup(provider);

export default firebase;
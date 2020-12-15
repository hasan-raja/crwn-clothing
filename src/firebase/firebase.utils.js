import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//import 'firebase/database';


const config = {
  apiKey: "AIzaSyA6NpmhInXCJbO0pAeV4S-T2dhnDYQNokw",
    authDomain: "crwn-db-1053d.firebaseapp.com",
    databaseURL: "https://crwn-db-1053d.firebaseio.com",
    projectId: "crwn-db-1053d",
    storageBucket: "crwn-db-1053d.appspot.com",
    messagingSenderId: "745287621652",
    appId: "1:745287621652:web:1552c93de25c81e072db01",
    measurementId: "G-DECY8HMJXL"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


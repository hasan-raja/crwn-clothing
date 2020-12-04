import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';


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

export const createUserProfileDocument = async (userAuth,additionalData) => {
  console.log(additionalData);
  console.log(userAuth);
  if (!userAuth) return;

  //const userRef2 = firestore.doc(`users/${userAuth.uid}`);

  const userRef2= firebase.database().ref(`users/${userAuth.uid}`);
  //console.log(userRef2)
  
  const snapShot = await userRef2.get();
  //console.log(snapShot);
  if (snapShot.exists) {

      const {displayName,email} =userAuth
      // var displayName;
      // const email=userAuth;
      
      // userAuth.displayName!==null?  displayName= userAuth :displayName=additionalData ;
      // console.log(displayName,email);
      //not to use new Date()
      const createdAt= Date();
      /* if(displayName!==null){ */
      try {
        await userRef2.set({
          displayName,
          email,
          createdAt,   
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
  return userRef2;
};


export const auth = firebase.auth();
export const firestore = firebase.firestore();
// const ref=firestore.collection('users');
// console.log(ref);
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCcq9Kh19lS1xHx5JWkFWVULu9rJrS4ckU",
  authDomain: "crwn-db-515b1.firebaseapp.com",
  projectId: "crwn-db-515b1",
  storageBucket: "crwn-db-515b1.appspot.com",
  messagingSenderId: "78816694063",
  appId: "1:78816694063:web:fe2d414da3b0f63f645bda",
  measurementId: "G-JENRDFML47"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  console.log(additionalData);
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
console.log(snapShot);
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    //console.log(displayName);
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
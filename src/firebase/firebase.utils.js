import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyClqsnuEl4ch1hqEdVifEEzQh_eyteNoFQ",
    authDomain: "e-commerse-b9a04.firebaseapp.com",
    databaseURL: "https://e-commerse-b9a04.firebaseio.com",
    projectId: "e-commerse-b9a04",
    storageBucket: "e-commerse-b9a04.appspot.com",
    messagingSenderId: "681778983680",
    appId: "1:681778983680:web:8e85ef7649462493a639e5"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get()
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createAt = new Date();
  
      try {
        await userRef.set({
          displayName,
          email,
          createAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message)
      }
    }
    return userRef;
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
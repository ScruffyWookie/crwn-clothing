import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC5KYp025CfZUbiFg60Xpa-y8QcHFP7sIY',
  authDomain: 'crwn-clothing-db-4d48b.firebaseapp.com',
  projectId: 'crwn-clothing-db-4d48b',
  storageBucket: 'crwn-clothing-db-4d48b.appspot.com',
  messagingSenderId: '1005405753642',
  appId: '1:1005405753642:web:1037701370098a8a344e53',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

const userSnapshot = await getDoc(userDocRef);
console.log(userSnapshot);
console.log(userSnapshot.exists());

if(!userSnapshot.exists()) {
  const {displayName, email} = userAuth;
  const createdAt = new Date();

  try {
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt
    });
  }
  catch (error) {
      console.log('error creating the user', error.message)
  }
}


return userDocRef;
//if user data exists

// create / set the document with the data from userauth in my collection

//return userdocref
};
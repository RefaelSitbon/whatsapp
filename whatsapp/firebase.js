// import firebase from 'firebase/app';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import mongoose from 'mongoose';


const firebaseConfig = {
    apiKey: "AIzaSyD9BmC5oYlcmpWar308pS5GVLwrESznQXQ",
    authDomain: "whatsapp-bd5dc.firebaseapp.com",
    projectId: "whatsapp-bd5dc",
    storageBucket: "whatsapp-bd5dc.appspot.com",
    messagingSenderId: "523912150721",
    appId: "1:523912150721:web:51496b4a5a5bb831d21e40",
    measurementId: "G-ZQ5YEDS6HT" 
  };

  const app = initializeApp(firebaseConfig);
  // console.log(app.options + " app !!!!")
  // const auth = firebaseApp;
  // console.log(auth)
  const db = getFirestore();
  const mdb = mongoose;
  // console.log(db.app.options + " db !!!!")
  const auth = getAuth(app);
  // console.log(auth.config.authDomain + " auth !!!!")
  console.log(GoogleAuthProvider.credential.name + " provider @@@@")
  const provider = new GoogleAuthProvider;
  console.log(provider + " provider !!!!")

  // signInWithRedirect(auth, provider);

  // signInWithPopup(auth, provider)
  // .then((result) => {
  //   console.log(" HEREEEEEEEE")
  //   // This gives you a Google Access Token. You can use it to access the Google API.
  //   const credential = GoogleAuthProvider.credentialFromResult(result);
  //   const token = credential.accessToken;
  //   console.log(token + " token !!!!")
  //   // The signed-in user info.
  //   const user = result.user;
  //   // ...
  // }).catch((error) => {
  //   console.log(error + " error !!!");
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.customData;
  //   // The AuthCredential type that was used.
  //   const credential = GoogleAuthProvider.credentialFromError(error);
  //   // ...
  // });

  // export default { app, auth, db, provider };
  // const snapshot = getDocs(collection('cities'));

  // firebaseApp.automaticDataCollectionEnabled(auth, user => { console.log(user); });

  // Initialize Firebase
  // const app = !firebase.app.length ? 
  // firebase.initializeApp(firebaseConfig) :
  // firebase.app();

  // const db = app.firestore();
  // const auth = app.auth();
  // const provider = new firebase.auth.GoogleAuthProvider();

  // export { db, auth, provider }
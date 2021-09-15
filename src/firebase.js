import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyDX-1iSQ0xZknAWyGhd8tqHwgQgDLjVUfE",
  authDomain: "shopify-challenge-7c1c3.firebaseapp.com",
  projectId: "shopify-challenge-7c1c3",
  storageBucket: "shopify-challenge-7c1c3.appspot.com",
  messagingSenderId: "422214555493",
  appId: "1:422214555493:web:77181f049ccc5cc38ef38c"
};

  firebase.initializeApp(firebaseConfig);

// this exports the CONFIGURED version of firebase
export default firebase;
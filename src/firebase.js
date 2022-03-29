import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBNUXI4_MXqARQ8sEgwHFmttEdQA0SRd6c",
    authDomain: "ecommerce-clone-f50b0.firebaseapp.com",
    databaseURL: "https://ecommerce-clone-f50b0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ecommerce-clone-f50b0",
    storageBucket: "ecommerce-clone-f50b0.appspot.com",
    messagingSenderId: "259309844843",
    appId: "1:259309844843:web:ff12b7ffcd0fcd6b78342e",
    measurementId: "G-TEMSFGMN2R"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
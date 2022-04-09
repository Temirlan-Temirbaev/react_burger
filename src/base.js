import firebase from "firebase/app";
import reBase from "re-base";
import 'firebase/database'
import 'firebase/auth'
/* apiKey: "AIzaSyD22aiyH0D7faHnPDCs4ZUZKHBir53hAFs",
  authDomain: "very-hot-burgers-6a6f2.firebaseapp.com",
  databaseURL: "https://very-hot-burgers-6a6f2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "very-hot-burgers-6a6f2",
  storageBucket: "very-hot-burgers-6a6f2.appspot.com",
  messagingSenderId: "1079862328937",
  appId: "1:1079862328937:web:b1bf50725ee36b6d382cf8" */
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD22aiyH0D7faHnPDCs4ZUZKHBir53hAFs",
    authDomain: "very-hot-burgers-6a6f2.firebaseapp.com",
    databaseURL: "https://very-hot-burgers-6a6f2-default-rtdb.europe-west1.firebasedatabase.app",
})

const base = reBase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
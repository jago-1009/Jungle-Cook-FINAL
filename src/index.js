import { initializeApp } from "firebase/app";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getFirestore, collection, getDoc, getDocs } from "firebase/firestore";

const firebaseApp = initializeApp({

apiKey: "AIzaSyDUql_SIOlDML1Z6z8hbgR2j46m2fyfGIs",
  authDomain: "n315-jacogarw.firebaseapp.com",
  projectId: "n315-jacogarw",
  storageBucket: "n315-jacogarw.appspot.com",
  messagingSenderId: "1084176107346",
  appId: "1:1084176107346:web:e4f354a5916e1f100a1c8b",
  measurementId: "G-F367M6XX1Y"
});

const auth = getAuth(firebaseApp);

const db = getFirestore(firebaseApp);

const students = collection(db, "Students");

const snapshot = await getDocs(students);

// detect auth state

onAuthStateChanged(auth, (user) => {

if (user != null) {

console.log("logged in");

} else {

console.log("No user");

}

});

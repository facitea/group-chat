// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getDatabase } from 'firebase/database';

// const firebaseConfig = {
//     apiKey: "AIzaSyB1Fd38qIsmqBUeulQUnFgJ278AolldSg8",
//     authDomain: "group-23d70.firebaseapp.com",
//     projectId: "group-23d70",
//     storageBucket: "group-23d70.appspot.com",
//     messagingSenderId: "62733091868",
//     appId: "1:62733091868:web:baa9572500d5ed65570bd9",
//     measurementId: "G-9DYEPWFS53"
// };

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
// const database = getDatabase(app);

// export { auth, database };

// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB1Fd38qIsmqBUeulQUnFgJ278AolldSg8",
    authDomain: "group-23d70.firebaseapp.com",
    projectId: "group-23d70",
    storageBucket: "group-23d70.appspot.com",
    messagingSenderId: "62733091868",
    appId: "1:62733091868:web:baa9572500d5ed65570bd9",
    measurementId: "G-9DYEPWFS53"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    const userRef = ref(database, `users/${user.uid}`);
    set(userRef, {
      email: user.email,
      displayName: user.displayName
    });
  }
});

export { auth, database };

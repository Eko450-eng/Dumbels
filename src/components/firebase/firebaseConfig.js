import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBMTaOBCVzpxqlXgcXSZeDHAoFxXYBHQk8",
  authDomain: "dcifinalproject.firebaseapp.com",
  databaseURL: "https://dcifinalproject-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dcifinalproject",
  storageBucket: "dcifinalproject.appspot.com",
  messagingSenderId: "103514347185",
  appId: "1:103514347185:web:5ec45c548f56185d51490"
});

const db = getFirestore(firebaseApp)


export default db

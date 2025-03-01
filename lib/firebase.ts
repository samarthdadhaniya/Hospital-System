// firebase.ts
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDvgZbe9OMEFyI6xTwnTYk0LL8ARvIcw9M",
    authDomain: "dr-ai-e5e2e.firebaseapp.com",
    databaseURL: "https://dr-ai-e5e2e-default-rtdb.firebaseio.com",
    projectId: "dr-ai-e5e2e",
    storageBucket: "dr-ai-e5e2e.firebasestorage.app",
    messagingSenderId: "466945137344",
    appId: "1:466945137344:web:bb81133fc8402f8c832b25",
    measurementId: "G-PPG4NHSVLZ"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
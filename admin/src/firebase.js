// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0IPEhYW8sMmfvfQ-CG4fN2LVkjErQGAw",
    authDomain: "double-biceps.firebaseapp.com",
    projectId: "double-biceps",
    storageBucket: "double-biceps.appspot.com",
    messagingSenderId: "666705874079",
    appId: "1:666705874079:web:b42c9c925f695355f726aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATFBIl9hnDCPEs6uBMx76aWCdegg8cnZ8",
    authDomain: "chat-quiz-441d9.firebaseapp.com",
    projectId: "chat-quiz-441d9",
    storageBucket: "chat-quiz-441d9.appspot.com",
    messagingSenderId: "839357361392",
    appId: "1:839357361392:web:43cd3ac2782d889114e635"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
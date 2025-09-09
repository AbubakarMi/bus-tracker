
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  "projectId": "swiftroute-2v48m",
  "appId": "1:944756104886:web:a44ea90b20183fa8955017",
  "storageBucket": "swiftroute-2v48m.firebasestorage.app",
  "apiKey": "AIzaSyDk_bJyCgWdYAH-v50oMzIEZR-YTQO_5mc",
  "authDomain": "swiftroute-2v48m.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "944756104886"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}


export { app };

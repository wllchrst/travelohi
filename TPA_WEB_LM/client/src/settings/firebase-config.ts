import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA9iBcuf922gB50ZozbgywjnybWz3Y0mn8",
    authDomain: "travelohi-72fda.firebaseapp.com",
    projectId: "travelohi-72fda",
    storageBucket: "travelohi-72fda.appspot.com",
    messagingSenderId: "934800282942",
    appId: "1:934800282942:web:ca7d71d1c9079e155fc86f",
    measurementId: "G-BLCJRRYHN3"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export { app, storage }

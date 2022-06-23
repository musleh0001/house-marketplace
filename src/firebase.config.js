import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAxHsCUnfTOUXPduZdG7rXsIWXZvVshqm0",
	authDomain: "house-marketplace-app-62632.firebaseapp.com",
	projectId: "house-marketplace-app-62632",
	storageBucket: "house-marketplace-app-62632.appspot.com",
	messagingSenderId: "317133819345",
	appId: "1:317133819345:web:89bb4f73db53f31bc624f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: "AIzaSyAvMBno53aMf98NU7-OsHBvBz-1W0piXIA",
	authDomain: "qolda-828bb.firebaseapp.com",
	projectId: "qolda-828bb",
	storageBucket: "qolda-828bb.firebasestorage.app",
	messagingSenderId: "79120898542",
	appId: "1:79120898542:web:080fd18e0b1e36a3db56ff",
	measurementId: "G-41LC9K057H"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 

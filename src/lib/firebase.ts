import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: "AIzaSyBQrM_HYqEBDugfph7Kqxl6EMLEuUg0p50",
	authDomain: "tennis-51e17.firebaseapp.com",
	projectId: "tennis-51e17",
	storageBucket: "tennis-51e17.firebasestorage.app",
	messagingSenderId: "967579262668",
	appId: "1:967579262668:web:2657d1f5b99f7b3c2eec69"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: process.env.REACT_APPI_KEY,
	authDomain: process.env.REACT_AUTH_DOMAIN,
	projectId: process.env.REACT_PROJECT_ID,
	storageBucket: process.env.REACT_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_MESSAGING,
	appId: process.env.REACT_APP_ID,
};

const app = initializeApp(firebaseConfig);

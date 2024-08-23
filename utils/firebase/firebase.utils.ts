import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: 'graphiql-app-843bc.appspot.com',
  messagingSenderId: '725794309496',
  appId: '1:725794309496:web:a2cc27439a1669e1cdf48d',
};

export const firebaseApp = initializeApp(firebaseConfig);

import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: 'graphiql-app-843bc.appspot.com',
  messagingSenderId: '725794309496',
  appId: '1:725794309496:web:a2cc27439a1669e1cdf48d',
};

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth: User | null,
  additionalInformation: Record<string, unknown> = {}
) => {
  if (!userAuth) {
    return;
  }

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName: displayName || 'No display name',
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {}
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
  displayName: string
): Promise<UserCredential | undefined> => {
  if (!email || !password) {
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName });

    return userCredential;
  } catch (error) {
    if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
      toast.error('Email is already in use!');
    } else {
      toast.error('Something went wrong!');
    }
    return undefined;
  }
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential | undefined> => {
  if (!email || !password) {
    return;
  }
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error.message === 'Firebase: Error (auth/invalid-credential).') {
      toast.error('Invalid email or password!');
    } else {
      toast.error('Something went wrong!');
    }
  }
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: (user: User | null) => void) => onAuthStateChanged(auth, callback);

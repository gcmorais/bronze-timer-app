/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDAGH-KuainpPzTEv8qIaa7lmKd-_DsFCw',
  authDomain: 'firebelaebronze.firebaseapp.com',
  projectId: 'firebelaebronze',
  storageBucket: 'firebelaebronze.appspot.com',
  messagingSenderId: '127880012172',
  appId: '1:127880012172:web:0745d347923d6ffe6336a9',
};

const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const auth = getAuth(app);

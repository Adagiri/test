import * as firebase from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDTuSWxTolB6DotW7ER0TjEqPnQUrNqEiM',
  authDomain: 'adagiri-test.firebaseapp.com',
  projectId: 'adagiri-test',
  storageBucket: 'adagiri-test.appspot.com',
  messagingSenderId: '1028694713485',
  appId: '1:1028694713485:web:2b48755cfc68263db1aec4',
  measurementId: 'G-FZY5TH3GWY',
};

export const initializeFirebase = () => {
  if (!firebase.getApps().length) {
    firebase.initializeApp(firebaseConfig);
  }
};

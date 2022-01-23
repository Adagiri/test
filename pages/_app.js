import { useEffect } from 'react';
import { initializeFirebase } from '../firebase';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';

import '../styles/globals.css';
import { initializeNotification, watchNotification } from '../utils';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initializeFirebase();
    initializeNotification();

    if (Notification.permission === 'granted') watchNotification();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;

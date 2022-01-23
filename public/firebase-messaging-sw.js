importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js'
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDTuSWxTolB6DotW7ER0TjEqPnQUrNqEiM',
  authDomain: 'adagiri-test.firebaseapp.com',
  projectId: 'adagiri-test',
  storageBucket: 'adagiri-test.appspot.com',
  messagingSenderId: '1028694713485',
  appId: '1:1028694713485:web:2b48755cfc68263db1aec4',
  measurementId: 'G-FZY5TH3GWY',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );

  const notification = JSON.parse(payload.data.notification);

  console.log(notification)
  // Customize notification here
  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});;
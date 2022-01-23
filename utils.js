import { getMessaging, getToken, onMessage } from 'firebase/messaging';

export const initializeNotification = () => {
  if (
    'Notification' in window &&
    (Notification.permission === 'default' ||
      Notification.permission === 'granted')
  ) {
    const messaging = getMessaging();

    getToken(messaging, {
      vapidKey:
        'BMfWwOCYhSUNFLSzGkiOnOkstgC6P1CNq-4oix7EJ522FFpOUXxt2DJX1SJMYtOrDyrQ558_wa5fwOXyv1UuiAE',
    }).then((currentToken) => {
      if (currentToken) {
        // Api to receive notification Token here
        // alert(currentToken);
        console.log(currentToken);
      } else {
        // Show permission request UI
        console.log(
          'No registration token available. Request permission to generate one.'
        );
        // ...
      }
    });
  }
};

export const watchNotification = () => {
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    const notification = JSON.parse(payload.data.notification);
    console.log(notification);
    // Customize notification here

    new Notification(notification.title, {
      body: notification.body,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg',
    });
  });
};

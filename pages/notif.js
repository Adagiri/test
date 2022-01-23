import { useEffect } from 'react';

import dynamic from 'next/dynamic';

const NotificationComp = dynamic(() => import('../components/Notif'), {
  ssr: false,
});

export default function NotificationPage() {
  return <NotificationComp />;
}

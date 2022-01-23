import { useRef, useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import axios from 'axios';

import { io } from 'socket.io-client';

const API_URL = 'http://localhost:9000';
const SOCKET_URL = 'ws://localhost:9000';

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState('');
  const [assignment, setAssignment] = useState({});

  const socket = useRef();

  useEffect(() => {
    socket.current = io(SOCKET_URL);
    socket.current.emit('addUser', {
      id: '61d9bc607bd538a6db19faab',
      userType: 'Tutor',
    });

    socket.current.on('newNotification', (data) => {
      console.log(data);
    });
  }, []);

  useEffect(() => {
    socket.current.emit('assignmentCreated', assignment);
  }, [assignment]);

  return (
    <div className={styles.container}>
      <button
        onClick={() =>
          setAssignment({
            assignmentId: '0303929439',
            requestType: 'Assignment',
            subject: 'Mathematics',
          })
        }
      >
        Send Message
      </button>
    </div>
  );
}

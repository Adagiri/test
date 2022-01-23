import { useRef, useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import axios from 'axios';

import { io } from 'socket.io-client';

const API_URL = 'http://localhost:9000';
const AUTH_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDVjNjNhYWRkNjNkMzVjNzhlM2QxNSIsInVzZXJUeXBlIjoiQ2xpZW50IiwidXNlcklkIjoiMjYwMzE3MTU2MzI2IiwiaWF0IjoxNjQxMzk5ODc2LCJleHAiOjE2NDM5OTE4NzZ9.LAcH6plzQRHXiYEAgTPSYm7rUKptbeXQzDSevBz6Qsc';

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState('');
  const [assignment, setAssignment] = useState({});

  const socket = useRef();

  useEffect(() => {
    socket.current = io('ws://localhost:9000');
    socket.current.emit('addUser', {
      id: '61e93abcfd309276a0f39047',
      userType: 'Client',
    });
  }, []);

  useEffect(() => {
    socket.current.emit('assignmentCreated', assignment);
  }, [assignment]);

  const submit = async () => {
    if (!file) {
      alert('Please pick a file');
      return;
    }

    setLoading('...Fetching signed url');

    try {
      // Get the presigned url
      const urlResponse = await axios({
        url: API_URL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: AUTH_TOKEN,
        },
        data: {
          contentType: file.type,
          purpose: 'assignment-request',
        },
      });

      console.log(urlResponse);

      setLoading('...Uploading file to s3 bucket');

      const imageUrl = urlResponse.data.data.url;
      const signedUrl = urlResponse.data.data.signedUrl;

      // Upload the file to the signed url
      await axios.put(signedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      setLoading('');
      alert('File successfully uploaded');

      // Next step - Submit the form to the backend with the photo filed set to **imageUrl** variable above
    } catch (error) {
      console.log(error);
      setLoading('');
      alert('Failed to upload file');
    }
  };

  return (
    <div className={styles.container}>
      <input type='file' onChange={(e) => setFile(e.target.files[0])} />

      <div style={{ margin: '30px', background: 'cyan', padding: '10px' }}>
        {loading ? (
          <p>{loading}</p>
        ) : (
          <button onClick={() => submit()}>
            Get signed url & submit file to s3
          </button>
        )}
      </div>

      <button
        onClick={() =>
          setAssignment({
            assignmentId: '0303929439',
            requestType: 'Assignment',
            subject: 'Mathematics',
          })
        }
      >
        Create Assignment
      </button>
    </div>
  );
}

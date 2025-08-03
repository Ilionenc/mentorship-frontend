import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';




const MentorSessionsPage = () => {
  const [sessions, setSessions] = useState([]);
   const { mentorId } = useParams();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get(`/sessions/dashboard/${mentorId}`);
        setSessions(res.data);
      } catch (err) {
        console.error('Error fetching sessions:', err);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📘 Mentor Sessions</h2>

      {sessions.length === 0 ? (
        <p>No sessions found.</p>
      ) : (
        <ul>
          
          {sessions.map((session: any) => (
            
            <li key={session.id} style={{ marginBottom: '12px' }}>
              <strong>Mentee:</strong> {session.mentee_name} ({session.mentee_email})<br />
              <strong>Date:</strong> {session.session_date} <br />
              <strong>Time:</strong> {session.time} <br />
               <strong>Duration:</strong> 2hrs<br />
              <strong>Topic:</strong> {session.topic} <br />
              

              <strong>Status:</strong>{' '}
              <span
                style={{
                  color:
                    session.status === 'completed'
                      ? 'green'
                      : session.status === 'cancelled'
                      ? 'red'
                      : 'blue',
                }}
              >
                {session.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MentorSessionsPage;
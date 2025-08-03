import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const SessionDashboardPage: React.FC = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { menteeId } = useParams();
  

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get(`/sessions/dashboard/${menteeId}`);
        setSessions(res.data);
      } catch (err: any) {
        console.error('❌ Failed to fetch sessions:', err.response?.data || err.message);
        setMessage('❌ Failed to load sessions');
      }
    };

    fetchSessions();
  }, []);

  const filteredSessions = sessions.filter(
    session => filter === 'all' || session.status.toLowerCase() === filter
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>📅 My Sessions</h2>

      <br />
      <button onClick={() => navigate(-1)}>⬅️ Go Back</button>

      <br />
      <br />

      {message && <p style={{ color: 'red' }}>{message}</p>}

      <div style={{ marginBottom: '20px' }}>
        <label>Filter Sessions: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="accepted">Scheduled</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {filteredSessions.length === 0 ? (
        <p>No sessions match the selected filter.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredSessions.map(session => (
            <li
              key={session.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '12px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <strong>Topic:{session.topic}</strong><br />
              <span style={{
                backgroundColor: session.status === 'accepted' ? 'green'
                  : session.status === 'cancelled' ? 'red'
                  : session.status === 'pending' ? 'gray'
                  : 'blue',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '8px',
                fontSize: '12px'
              }}>
                {session.status}
              </span>
              <p style={{ margin: '6px 0' }}>
                Date: {session.date} | Time: {session.time}
              </p>
              <p style={{ margin: '6px 0' }}>
                Mentor: {session.mentor_name} ({session.mentor_email})<br />
                Mentee: {session.mentee_name} 
              </p>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SessionDashboardPage;


/*
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const SessionDashboardPage: React.FC = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [message, setMessage] = useState('');

  // ✅ Fetch sessions from backend
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get('/sessions/dashboard');
        setSessions(res.data);
      } catch (err: any) {
        console.error('❌ Failed to fetch sessions:', err.message);
        setMessage('❌ Failed to load sessions');
      }
    };

    fetchSessions();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📅 My Sessions</h2>

      {message && <p>{message}</p>}

      <div style={{ marginBottom: '20px' }}>
        <label>Filter Sessions: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="scheduled">Scheduled</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <ul>
        {sessions
          .filter(session =>
            filter === 'all' || session.status.toLowerCase() === filter
          )
          .map(session => (
            <li key={session.id} style={{ marginBottom: '10px' }}>
              <strong>{session.topic}</strong> —{' '}
              <span style={{
                backgroundColor:
                  session.status === 'scheduled' ? 'green' :
                  session.status === 'cancelled' ? 'red' :
                  'gray',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '8px',
                fontSize: '12px'
              }}>
                {session.status}
              </span>{' '}
              <br />
              <small>
                Date: {session.date} | Time: {session.time}<br />
                Mentor: {session.mentor_name} | Mentee: {session.mentee_name}
              </small>
            </li>
          ))}
      </ul>
      */

      {/* Show if no sessions match the filter */} 
      
      
/*      {sessions.filter(session =>
        filter === 'all' || session.status.toLowerCase() === filter
      ).length === 0 && <p>No sessions match the selected filter.</p>}
    </div>
  );
};

export default SessionDashboardPage;
*/


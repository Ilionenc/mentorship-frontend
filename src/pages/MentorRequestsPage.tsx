import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const MentorRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchIncoming = async () => {
      try {
        const res = await axios.get('/requests/incoming');
        setRequests(res.data);
      } catch (err: any) {
        setMessage('❌ Failed to load incoming requests');
      }
    };





    
    fetchIncoming();
  }, []);

  const handleRespond = async (id: number, action: 'accepted' | 'rejected') => {
    try {
      await axios.put(`/requests/${id}/respond`, { status: action });
      setMessage(`✅ Request ${action}`);
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: action } : r))
      );
    } catch (err: any) {
      setMessage('❌ Failed to respond');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📥 Incoming Mentorship Requests</h2>
      {message && <p>{message}</p>}

      {requests.length === 0 ? (
        <p>No requests received yet.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '12px',
              borderRadius: '8px',
            }}
          >
            <p><strong>Mentee:</strong> {req.mentee_name} ({req.mentee_email})</p>
            <p><strong>Status:</strong> {req.status}</p>
            {req.status === 'pending' && (
              <div>
                <button onClick={() => handleRespond(req.id, 'accepted')}>✅ Accept</button>{' '}
                <button onClick={() => handleRespond(req.id, 'rejected')}>❌ Reject</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MentorRequestsPage;

/*

const respondToRequest = async (requestId: number, status: string) => {
  try {
    await axios.patch(`/requests/${requestId}/respond`, { status });
    alert(`Request ${status}`);
    fetchRequests(); // re-fetch updated list
  } catch (err: any) {
    console.error('Response failed:', err);
    alert('Failed to respond');
  }
};

*/
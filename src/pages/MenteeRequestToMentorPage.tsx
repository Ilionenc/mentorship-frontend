import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

interface MentorshipRequest {
  id: number;
  mentee_name: string;
  date: string;
  time: string;
  status: string;
  topic: string;
}
 const MenteeRequestToMentorPage: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchIncoming = async () => {
      try {
        const res = await axios.get('/requests/me2');
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
    <div style={{ padding: 20 }}>
      <h2>📩 Incoming Mentorship Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        requests.map((req) => (
          <div key={req.id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
            <p><strong>Mentee:</strong> {req.mentee_name}</p>
            <p><strong>Date:</strong> {req.date}</p>
            <p><strong>Time:</strong> {req.time}</p>
            <p><strong>Skills:</strong> {req.topic || 'N/A'}</p>
            <button onClick={() => handleRespond(req.id, 'accepted')}>✅ Accept</button>
            <button onClick={() => handleRespond(req.id, 'rejected')} style={{ marginLeft: 10 }}>❌ Reject</button>
          </div>
        ))
      )}
    </div>
  );
};

export default MenteeRequestToMentorPage;
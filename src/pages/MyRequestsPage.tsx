import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const MyRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  // ✅ Fetch sent requests on load
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('/requests/me');
        setRequests(res.data);
      } catch (err: any) {
        console.error('❌ Error loading requests:', err.message);
        setMessage('❌ Failed to load your requests');
      }
    };

    fetchRequests();
  }, []);

  // ✅ Handle cancel
  const handleCancel = async (id: number) => {
    const confirm = window.confirm('Are you sure you want to cancel this request?');
    if (!confirm) return;

    try {
      await axios.delete(`/requests/${id}/cancel`);
      setMessage('✅ Request canceled');
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      console.error('❌ Cancel error:', err.response?.data || err.message);
      setMessage('❌ Failed to cancel request');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📩 My Mentorship Requests</h2>

      {message && <p>{message}</p>}

      {requests.length === 0 ? (
        <p>You haven't sent any requests yet.</p>
      ) : (
        requests.map((req) => (
          <div
            key={req.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }}
          >
            <p><strong>Mentor:</strong> {req.mentor_name} ({req.mentor_email})</p>
            <p>
              <strong>Status:</strong>{' '}
              <span
                style={{
                  color:
                    req.status === 'accepted'
                      ? 'green'
                      : req.status === 'rejected'
                      ? 'red'
                      : 'gray',
                  fontWeight: 'bold',
                }}
              >
                {req.status}
              </span>
            </p>
            <p><small>Sent on: {new Date(req.created_at).toLocaleString()}</small></p>

            {/* ✅ Show Cancel Button if still pending */}
            {req.status === 'pending' && (
              <button
                onClick={() => handleCancel(req.id)}
                style={{
                  backgroundColor: 'crimson',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '8px'
                }}
              >
                Cancel Request
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyRequestsPage;
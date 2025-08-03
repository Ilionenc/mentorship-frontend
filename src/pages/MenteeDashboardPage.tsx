import React from 'react';
import { useNavigate } from 'react-router-dom';

const MenteeDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h2>👩‍🎓 Mentee Dashboard</h2>
      <p>Welcome to Mentee Dashboard! What would you like to do?</p>
      <br />
      <button onClick={() => navigate(-1)}>⬅️ Go Back</button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <button onClick={() => navigate('/discover')} style={{ padding: '10px' }}>
          📅 Book  Session/s
        </button>

        <button onClick={() => navigate('/my-requests')} style={{ padding: '10px' }}>
          ❌ Cancel Pending Request/s
        </button>

        <button onClick={() => navigate('/mentee/sessions')} style={{ padding: '10px' }}>
          ✅ View All My Sessions
        </button>
      </div>
    </div>
  );
};

export default MenteeDashboardPage;
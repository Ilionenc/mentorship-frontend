import React from 'react';
import { useNavigate } from 'react-router-dom';

const MentorDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h2>👋 Welcome Mentor!</h2>
      <p>Please choose an option:</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px', margin: '0 auto' }}>
        <button onClick={() => navigate('/availability/mentorId')}>
          ➕ Add Availability
        </button>

        <button onClick={() => navigate('/requests/incoming')}>
          📩 Accept/Reject Mentee Requests
        </button>

        <button onClick={() => navigate('/MentorSessions')}>
          📅 View All My Sessions
        </button>
      </div>
    </div>
  );
};

export default MentorDashboardPage;
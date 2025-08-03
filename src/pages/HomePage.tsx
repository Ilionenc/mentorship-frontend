// src/pages/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to the Mentorship App 💡</h1>
      <p>
        This platform connects <strong>Mentors</strong> and <strong>Mentees</strong> in various skills
        like Software Development, UI/UX, Data Analysis, Cybersecurity, Graphics, and more.
      </p>
      <p>
        🚀 Mentees can explore mentors based on their skills, book sessions, and request mentorship. <br />
        🧠 Mentors can set availability, respond to requests, and guide mentees. <br />
        🔐 Admins manage users and matches.
      </p>

      <button
        onClick={() => navigate('/login')}
        style={{
          marginTop: '2rem',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Continue to Login →
      </button>
    </div>
  );
};

export default HomePage;
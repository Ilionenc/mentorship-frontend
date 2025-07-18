import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserRolePage: React.FC = () => {
  const navigate = useNavigate();

  // Retrieve user info from localStorage or context
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    // Redirect based on role
    switch (user.role) {
      case 'admin':
        navigate('/admin');
        break;
      case 'mentor':
        navigate('/availability/mentorId');
        break;
      case 'mentee':
       //discover
       navigate('/discover');
      // navigate('/mentors/availability');
        break;
      default:
        navigate('/');
    }
  }, [navigate, token, user]);

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h2>Welcome!</h2>
      {user && (
        <>
          <p>User ID: <strong>{user.id}</strong></p>
          <p>Role: <strong>{user.role}</strong></p>
          <p>Redirecting you to your dashboard...</p>
        </>
      )}
    </div>
  );
};

export default UserRolePage;
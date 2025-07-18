import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#333',
      color: '#fff'
    }}>
      <h3>🌟 Mentorship App</h3>

      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>

        {role === 'admin' && (
          <>
            <Link to="/admin" style={{ color: '#fff' }}>Admin</Link>
            <Link to="/admin/sessions" style={{ color: '#fff' }}>Sessions</Link>
          </>
        )}

        {role === 'mentor' && (
          <>
            <Link to="/dashboard" style={{ color: '#fff' }}>Dashboard</Link>
            <Link to="/availability" style={{ color: '#fff' }}>Availability</Link>
            <Link to="/requests" style={{ color: '#fff' }}>Requests</Link>
            <Link to="/sessions" style={{ color: '#fff' }}>Sessions</Link>
          </>
        )}

        {role === 'mentee' && (
          <>
            <Link to="/mentors" style={{ color: '#fff' }}>Mentors</Link>
            <Link to="/my-requests" style={{ color: '#fff' }}>Requests</Link>
            <Link to="/my-sessions" style={{ color: '#fff' }}>Sessions</Link>
          </>
        )}

        <button onClick={handleLogout} style={{
          backgroundColor: 'red',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          padding: '6px 12px',
          cursor: 'pointer'
        }}>
          🚪 Sign Out
        </button>
        
      </div>
    </nav>
  );
};

export default Navbar;


 //<a href="/home">Home</a> |{' '}
  //    <button onClick={handleSignOut}>Sign Out</button>
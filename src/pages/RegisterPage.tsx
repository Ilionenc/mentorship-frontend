import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('/auth/register', form);
      setMessage('✅ Registered successfully!');
      console.log('Registered:', res.data);

      // Redirect to login after 1 second
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err: any) {
      setMessage('❌ Registration failed: ' + (err.response?.data?.error || 'Server error'));
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '50px' }}>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label><br />
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        /><br /><br />

        <label>Password:</label><br />
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        /><br /><br />

        <button type="submit">Register</button>
        
      </form>
      

      {message && (
        <p style={{ marginTop: '10px', color: message.startsWith('✅') ? 'green' : 'red' }}>
          {message}
        </p>
      )}

      <p style={{ marginTop: '10px' }}>
        Already have an account? <a href="/">Login</a>
        Create Profile <a href="/ProfileFormPage">Create Profile</a>
      </p>
    </div>
  );
};

export default RegisterPage;
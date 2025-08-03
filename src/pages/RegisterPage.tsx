// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return setMessage('❌ Passwords do not match');
    }

    try {
      const res = await axios.post('/auth/register', {
        email: form.email,
        password: form.password,
      });
      setMessage('✅ Registration successful! Redirecting...');
      
//const handleClick = () => {
  alert('Login to Complete your registration');
    navigate(`/login`);
  


      

      
      //setTimeout(() => navigate('/'), 1500);
    } catch (err: any) {
      console.error(err);
      setMessage('❌ Registration failed: ' + (err.response?.data?.error || 'Server error'));
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label><br />
        <input type="email" name="email" value={form.email} onChange={handleChange} required /><br /><br />

        <label>Password:</label><br />
        <input type="password" name="password" value={form.password} onChange={handleChange} required /><br /><br />

        <label>Confirm Password:</label><br />
        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required /><br /><br />

        <button type="submit">Register</button>
      </form>

      <p>{message}</p>
       <br />
      <button onClick={() => navigate(-1)}>⬅️ Go Back</button>
    </div>
  );
};

export default RegisterPage;

/*

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
     // setMessage('✅ Registered successfully!');
     // console.log('Registered:', res.data);

       
     // setTimeout(() => {
    //    navigate('/ProfileFormPage');
      //}, 1000);
    
 alert('✅ Registered Successfully, to continue, login to complete your profile!');
   setTimeout(() => {
       navigate('/loginReg');
      }, 1000);
          } catch (err) {
            console.error('❌ Registration failed:', err);
            alert('❌ Registration failed.');
          }
        }



    
      // Redirect to ProfilePage to enter your data after 1 second
     // setTimeout(() => {
      //  navigate('/login');
     // }, 1000);
  //  } catch (err: any) {
  //    setMessage('❌ Registration failed: ' + (err.response?.data?.error || 'Server error'));
  //  }
 // };

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
*/
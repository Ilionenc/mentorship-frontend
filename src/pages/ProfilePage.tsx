import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from '../api/axios';

type Profile = {
  name: string;
  email: string;
  bio: string;
  skills: string;
  goals: string;
};

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    email: '',
    bio: '',
    skills: '',
    goals: '',
  });

  const [message, setMessage] = useState('');

  // ✅ Fetch profile on page load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/profile/me');
        setProfile(res.data);
      } catch (err: any) {
        console.error('Failed to fetch profile:', err);
        setMessage('❌ Failed to load profile.');
      }
    };

    fetchProfile();
  }, []);

  // ✅ Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // ✅ Submit updated profile
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put('/profile/me', profile);
      setProfile(res.data);
      setMessage('✅ Profile updated successfully!');
    } catch (err: any) {
      console.error('Failed to update profile:', err);
      setMessage('❌ Update failed.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2>👤 My Profile</h2>
      {message && <p style={{ color: message.startsWith('✅') ? 'green' : 'red' }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label><br />
          <input type="text" name="name" value={profile.name} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label><br />
          <input type="text" name="email" value={profile.email} disabled />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Bio:</label><br />
          <textarea name="bio" value={profile.bio} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Skills:</label><br />
          <textarea name="skills" value={profile.skills} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Goals:</label><br />
          <textarea name="goals" value={profile.goals} onChange={handleChange} />
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
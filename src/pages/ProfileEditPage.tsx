import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';

const skillsList = [
  'Graphics Designing',
  'UI/UX',
  'Marketing',
  'Software Development',
  'Gaming Development',
  'Gen AI',
  'Data Analysis',
  'Cybersecurity',
  'Virtual Assistant',
  'Natural Programming Language',
  'Python',
  'JavaScript',
  'TypeScript',
];

const ProfileFormPage: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    role: '',
    bio: '',
    goals: '',
    skills: [] as string[],
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setForm((prev) => {
      const updatedSkills = checked
        ? [...prev.skills, value]
        : prev.skills.filter((skill) => skill !== value);
      return { ...prev, skills: updatedSkills };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.put('/profile/me', {
        ...form,
        skills: form.skills,
      });

      setMessage('✅ Profile updated successfully!');

      // Role-based redirect
      if (res.data.role === 'Admin') {
        navigate('/admin');
      } else if (res.data.role === 'Mentor') {
        navigate('/availability/mentorId');
      } else {
        navigate('/mentors');
      }
    } catch (err: any) {
      setMessage('❌ Update failed: ' + (err.response?.data?.error || 'Server error'));
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <h2>Complete Your Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label><br />
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        /><br /><br />

        <label>Role:</label><br />
        <select name="role" value={form.role} onChange={handleChange} required>
          <option value="">-- Select Role --</option>
          <option value="Admin">Admin</option>
          <option value="Mentor">Mentor</option>
          <option value="Mentee">Mentee</option>
        </select><br /><br />

        <label>Short Bio:</label><br />
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          rows={3}
          required
        /><br /><br />

        <label>Your Goals:</label><br />
        <textarea
          name="goals"
          value={form.goals}
          onChange={handleChange}
          rows={3}
        /><br /><br />

        <label>Select Skills:</label><br />
        {skillsList.map((skill) => (
          <div key={skill}>
            <input
              type="checkbox"
              value={skill}
              checked={form.skills.includes(skill)}
              onChange={handleCheckboxChange}
            />
            <label>{skill}</label>
          </div>
        ))}

        <br />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileFormPage;
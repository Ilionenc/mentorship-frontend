import React, { useState, useEffect } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const ProfileFormPage: React.FC = () => {
  const navigate = useNavigate();
 const [form, setForm] = useState({
  name: '',
  role: '',
  bio: '',
  skills: [] as string[],  // updated to array
  goals: ''
});
  const [message, setMessage] = useState('');

  const skillOptions = [
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
  'TypeScript'
];

  // Optional: Pre-fill if user already has data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/profile/me');
        setForm({
          name: res.data.name || '',
          role: res.data.role || '',
          bio: res.data.bio || '',
          skills: (res.data.skills || []).join(', '),
          goals: res.data.goals || '',
        });
      } catch {
        // no existing profile — keep form empty
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
/*
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = form.skills.split(',').map(skill => skill.trim());

    try {

      
     await axios.put('/profile/me', { ...form, skills: skillsArray });
      setMessage('✅ Profile updated successfully!');
      console.log ('Profile respnse:', res.)
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err: any) {
      setMessage('❌ Failed to update profile');
    }
  };
*/

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await axios.put('/profile/me', {
      ...form,
      skills: form.skills // ✅ Multi-select skills array
    });
    localStorage.setItem('userRole', res.data.role);


    setMessage('✅ Profile saved successfully!');
    console.log('Profile response:', res.data);

    // Redirect to role-based page after update
    if (res.data.role === 'Admin') {
     // navigate('/admin/users');
      navigate('/admin');
    } else if (res.data.role === 'Mentor') {
     // navigate('/availability');
      navigate('/availability/mentorI');
    } else if (res.data.role === 'Mentee'){
      //navigate('/mentors');
       navigate('/mentees');
    } else {
       navigate('/');
    }

  } catch (err: any) {
    setMessage('❌ Failed to save profile: ' + (err.response?.data?.error || 'Server error'));
  }
};






const handleSkillsChange = (skill: string) => {
  setForm((prevForm) => {
    const alreadySelected = prevForm.skills.includes(skill);
    const updatedSkills = alreadySelected
      ? prevForm.skills.filter(s => s !== skill)
      : [...prevForm.skills, skill];

    return { ...prevForm, skills: updatedSkills };
  });
};




  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label><br />
        <input name="name" value={form.name} onChange={handleChange} required /><br /><br />

        <label>Role:</label><br />
        <select name="role" value={form.role} onChange={handleChange} required>
          <option value="">--Select Role--</option>
          <option value="admin">Admin</option>
          <option value="mentee">Mentee</option>
          <option value="mentor">Mentor</option>
        </select><br /><br />

        <label>Bio:</label><br />
        <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} /><br /><br />

       <div>
  <label>Select Skills:</label><br />
  {skillOptions.map(skill => (
    <label key={skill} style={{ display: 'block' }}>
      <input
        type="checkbox"
        value={skill}
        checked={form.skills.includes(skill)}
        onChange={() => handleSkillsChange(skill)}
      />
      {skill}
    </label>
  ))}
</div>

        <label>Goals:</label><br />
        <input name="goals" value={form.goals} onChange={handleChange} /><br /><br />

        <button type="submit">Save Profile</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ProfileFormPage;
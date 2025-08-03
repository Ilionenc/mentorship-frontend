import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';

const ProfileCompletionPage = () => {
  const navigate = useNavigate();

interface ProfileFormData {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  goals: string;
}

const [form, setForm] = useState<ProfileFormData>({
  name: '',
  role: '',
  bio: '',
  skills: [],
  goals: '',
});





/*
  const [form, setForm] = useState({
    name: '',
    role: '',
    bio: '',
    skills: [],
    goals: ''
  });

  */
  const [showPrompt, setShowPrompt] = useState(false);

  const skillsList = [
    'Graphics Designing', 'UI/UX', 'Marketing', 'Software Development',
    'Gaming Development', 'Gen AI', 'Data Analysis', 'Cybersecurity',
    'Virtual Assistant', 'Natural Programming Language', 'Python',
    'JavaScript', 'TypeScript'
  ];

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  if (name === 'skills') {
    const selectElement = e.target as HTMLSelectElement;
    const selected: string[] = [];
    for (let i = 0; i < selectElement.options.length; i++) {
      if (selectElement.options[i].selected) {
        selected.push(selectElement.options[i].value);
      }
    }
    setForm({ ...form, skills: selected }); // ✅ This will now work
  } else {
    setForm({ ...form, [name]: value });
  }
};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put('/profile/me', form);
      setShowPrompt(true); // ✅ Show the post-save prompt
 //setMessage('✅ Registration successful! Redirecting...');
      
//const handleClick = () => {
  alert('Profile saved successfully');
    navigate(`/`);
  

        


    } catch (err) {
      alert('❌ Failed to save profile');
    }
  };

  const handleContinue = async () => {
    const res = await axios.get('/profile/me');
    const { role } = res.data;
    if (role === 'admin') navigate('/admin');
    else if (role === 'mentor') navigate('/availability/mentorId');
    else navigate('/mentors');
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>👤 Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={handleChange} required /><br /><br />
        <select name="role" onChange={handleChange} required>
          <option value="">-- Select Role --</option>
          <option value="admin">Admin</option>
          <option value="mentor">Mentor</option>
          <option value="mentee">Mentee</option>
        </select><br /><br />
        <textarea name="bio" placeholder="Short Bio" onChange={handleChange} required /><br /><br />
        <label>Skills (Select multiple):</label><br />
        <select name="skills" multiple onChange={handleChange}>
          {skillsList.map((skill) => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select><br /><br />
        <textarea name="goals" placeholder="Your Goals" onChange={handleChange} required /><br /><br />
        <button type="submit">✅ Save Profile</button>
         
        
     </form>

      {/* ✅ Prompt after saving */}
      {showPrompt && (
        <div style={{ marginTop: 20, padding: 10, border: '1px solid #ccc' }}>
          <p>🎉 Your profile has been saved. What would you like to do?</p>
          <button onClick={handleContinue}>➡️ Continue</button>&nbsp;
          <button onClick={handleSignOut}>🚪 Sign Out</button>
            
        </div>
       
      )}
    </div>
  );
};

export default ProfileCompletionPage;
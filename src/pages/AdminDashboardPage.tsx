// src/pages/AdminDashboardPage.tsx
import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const AdminDashboardPage: React.FC = () => {
  const [mentors, setMentors] = useState<any[]>([]);
  const [mentees, setMentees] = useState<any[]>([]);
  const [availability, setAvailability] = useState<any[]>([]);
  const [skillFilter, setSkillFilter] = useState('');
  const [uniqueSkills, setUniqueSkills] = useState<string[]>([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [selectedMentee, setSelectedMentee] = useState('');

   const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mentorRes, menteeRes, availRes] = await Promise.all([
          axios.get('/admin/mentors'),
          axios.get('/admin/mentees'),
          axios.get('/admin/availability'),
        ]);

        setMentors(mentorRes.data);
        setMentees(menteeRes.data);
        setAvailability(availRes.data);

        // Extract unique skills
        const allSkills = [
          ...mentorRes.data.flatMap((m: any) => m.skills || []),
          ...menteeRes.data.flatMap((m: any) => m.skills || [])
        ];
        const skillsSet = Array.from(new Set(allSkills)).sort();
        setUniqueSkills(skillsSet);

      } catch (err) {
        console.error('❌ Failed to fetch admin data:', err);
      }
    };
    fetchData();
  }, []);

  const filteredMentors = mentors.filter((m) =>
    skillFilter ? m.skills?.includes(skillFilter) : true
  );

  const filteredMentees = mentees.filter((m) =>
    skillFilter ? m.skills?.includes(skillFilter) : true
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>🛠 Admin Dashboard</h2>

      <label>Filter by Skill:</label><br />
      <select value={skillFilter} onChange={(e) => setSkillFilter(e.target.value)}>
        <option value="">-- All Skills --</option>
        {uniqueSkills.map((skill) => (
          <option key={skill} value={skill}>{skill}</option>
        ))}
      </select><br /><br />

      <h3>🧑‍🏫 Mentors</h3>
      <ul>
        {filteredMentors.map((m) => (
          <li key={m.id}>
            {m.name} - {m.email} ({m.skills?.join(', ')})
          </li>
        ))}
      </ul>

      <h3>📅 Mentor Availability</h3>
      <ul>
        {availability
          .filter((a) => !skillFilter || mentors.find((m) => m.id === a.mentor_id)?.skills?.includes(skillFilter))
          .map((a) => (
            <li key={a.id}>
              Mentor ID: {a.mentor_id} - {a.available_date} at {a.available_time}
            </li>
          ))}
      </ul>

      <h3>🧑‍🎓 Mentees</h3>
      <ul>
        {filteredMentees.map((m) => (
          <li key={m.id}>
            {m.name} - {m.email} ({m.skills?.join(', ')})
          </li>
        ))}
      </ul>

      <h3>🔗 Match Mentor with Mentee</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await axios.post('/admin/match', {
              mentor_id: selectedMentor,
              mentee_id: selectedMentee,
            });
            alert('✅ Match created!');
          } catch (err) {
            console.error('❌ Failed to match:', err);
            alert('❌ Match failed. Check console.');
          }
        }}
      >
        <label>Select Mentor:</label><br />
        <select value={selectedMentor} onChange={(e) => setSelectedMentor(e.target.value)} required>
          <option value="">-- Choose Mentor --</option>
          {mentors.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select><br /><br />

        <label>Select Mentee:</label><br />
        <select value={selectedMentee} onChange={(e) => setSelectedMentee(e.target.value)} required>
          <option value="">-- Choose Mentee --</option>
          {mentees.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select><br /><br />

        <button type="submit">🔗 Match</button>
      </form>
    </div>
  );
};

export default AdminDashboardPage;


/*
// src/pages/AdminDashboardPage.tsx
import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

const AdminDashboardPage: React.FC = () => {
  const [mentors, setMentors] = useState<any[]>([]);
  const [mentees, setMentees] = useState<any[]>([]);
  const [availability, setAvailability] = useState<any[]>([]);
  const [skillFilter, setSkillFilter] = useState('');
  const [selectedMentor, setSelectedMentor] = useState('');
  const [selectedMentee, setSelectedMentee] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mentorRes, menteeRes, availRes] = await Promise.all([
          axios.get('/admin/mentors'),
          axios.get('/admin/mentees'),
          axios.get('/admin/availability'),
        ]);
        setMentors(mentorRes.data);
        setMentees(menteeRes.data);
        setAvailability(availRes.data);
      } catch (err) {
        console.error('❌ Failed to fetch admin data:', err);
      }
    };
    fetchData();
  }, []);

  const filteredMentors = mentors.filter((m) =>
    skillFilter ? m.skills?.includes(skillFilter) : true
  );

  const filteredMentees = mentees.filter((m) =>
    skillFilter ? m.skills?.includes(skillFilter) : true
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>🛠 Admin Dashboard</h2>

      <label>Filter by Skill:</label><br />
      <input
        type="text"
        value={skillFilter}
        onChange={(e) => setSkillFilter(e.target.value)}
        placeholder="Enter skill"
      /><br /><br />

      <h3>🧑‍🏫 Mentors</h3>
      <ul>
        {filteredMentors.map((m) => (
          <li key={m.id}>
            {m.name} - {m.email} ({m.skills?.join(', ')})
          </li>
        ))}
      </ul>

      <h3>📅 Mentor Availability</h3>
      <ul>
        {availability
          .filter((a) => !skillFilter || mentors.find((m) => m.id === a.mentor_id)?.skills?.includes(skillFilter))
          .map((a) => (
            <li key={a.id}>
              Mentor ID: {a.mentor_id} - {a.available_date} at {a.available_time}
            </li>
          ))}
      </ul>

      <h3>🧑‍🎓 Mentees</h3>
      <ul>
        {filteredMentees.map((m) => (
          <li key={m.id}>
            {m.name} - {m.email} ({m.skills?.join(', ')})
          </li>
        ))}
      </ul>

      <h3>🔗 Match Mentor with Mentee</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await axios.post('/admin/match', {
              mentor_id: selectedMentor,
              mentee_id: selectedMentee,
            });
            alert('✅ Match created!');
          } catch (err) {
            console.error('❌ Failed to match:', err);
            alert('❌ Match failed. Check console.');
          }
        }}
      >
        <label>Select Mentor:</label><br />
        <select value={selectedMentor} onChange={(e) => setSelectedMentor(e.target.value)} required>
          <option value="">-- Choose Mentor --</option>
          {mentors.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select><br /><br />

        <label>Select Mentee:</label><br />
        <select value={selectedMentee} onChange={(e) => setSelectedMentee(e.target.value)} required>
          <option value="">-- Choose Mentee --</option>
          {mentees.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select><br /><br />

        <button type="submit">🔗 Match</button>
      </form>
    </div>
  );
};

export default AdminDashboardPage;

*/





/*
import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';




interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  skills?: string[]; // ✅ add this if skills may be missing
}



interface Mentee {
  id: number;
  name: string;
  email: string;
  role: string;
  skills?: string[]; 
}


interface Mentor {
  id: number;
  name: string;
  email: string;
  role: string;
  skills?: string[]; 
}


interface Availability {
  id: number;
  mentor_id: number;
  name: string;
  skills?: string[]; 

  available_date: string;
  available_time: string;
  
}


const AdminDashboardPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [skillFilter, setSkillFilter] = useState('');




  const skillsList = [
    'Graphics Designing', 'UI/UX', 'Marketing', 'Software Development',
    'Gaming Development', 'Gen AI', 'Data Analysis',
    'Cybersecurity', 'Virtual Assistant',
    'Natural Programming Language', 'Python', 'JavaScript', 'TypeScript'
  ];

  useEffect(() => {
    fetchData();
  }, [skillFilter]);

  const fetchData = async () => {
    try {
      const usersRes = await axios.get('/admin/users');
      const mentorsRes = await axios.get('/admin/mentors');
      const menteesRes = await axios.get('/admin/mentees');
      const availabilityRes = await axios.get('/admin/availability');
      setUsers(usersRes.data);
      setMentors(mentorsRes.data);
      setMentees(menteesRes.data);
      setAvailability(availabilityRes.data);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    }
  };

  const filteredMentors = mentors.filter((m) =>
    skillFilter ? m.skills?.includes(skillFilter) : true
  );
  const filteredMentees = mentees.filter((m) =>
    skillFilter ? m.skills?.includes(skillFilter) : true
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>🛠️ Admin Dashboard</h2>

      <div style={{ margin: '20px 0' }}>
        <label>Filter by Skill: </label>
        <select value={skillFilter} onChange={(e) => setSkillFilter(e.target.value)}>
          <option value="">All</option>
          {skillsList.map((skill) => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
      </div>

      <h3>👩‍🏫 Mentors</h3>
      <ul>
        {filteredMentors.map((m) => (
          <li key={m.id}>{m.name} - {m.skills?.join(', ')}</li>
        ))}
      </ul>

      <h3>👨‍🎓 Mentees</h3>
      <ul>
        {filteredMentees.map((m) => (
          <li key={m.id}>{m.name} - {m.skills?.join(', ')}</li>
        ))}
      </ul>

      <h3>📅 Mentor Availability</h3>
      <ul>
        {availability.map((slot, index) => (
          <li key={index}>
            Mentor ID {slot.mentor_id} - {slot.available_date} at {slot.available_time}
          </li>
        ))}
      </ul>
      
    </div>

    
  );
};

export default AdminDashboardPage;
*/
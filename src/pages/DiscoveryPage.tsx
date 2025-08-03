import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DiscoveryPage: React.FC = () => {
  const [mentors, setMentors] = useState<any[]>([]);
  const [selectedSkill, setSelectedSkill] = useState('');
   const navigate = useNavigate();


/*
const handleClick = () => {
  alert('Redirecting to Booksession page');
    navigate(`/book/:mentorId`);
  };
  */
// const goToAvailability = (mentorId: number) => {

  const handleBookSession = (mentorId: number) => {
     alert('Redirecting to Booksession page');
    navigate(`/book/${mentorId}`);
  };


  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await axios.get(`/mentors${selectedSkill ? '?skill=' + selectedSkill : ''}`);
        setMentors(res.data);
      } catch (err) {
        console.error('Failed to fetch mentors:', err);
      }
    };
    fetchMentors();
  }, [selectedSkill]);

  return (
    <div>
      <h2>🎓 Discover Mentors by Skill</h2>
 <br />
      <button onClick={() => navigate(-1)}>⬅️ Go Back</button>
      <br />
      <br />
      <label>Select Skill:</label>
      <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
        <option value="">-- All Skills --</option>
        <option value="Graphics Designing">Graphics Designing</option>
        <option value="UI/UX">UI/UX</option>
        <option value="Marketing">Marketing</option>
        <option value="Software Development">Software Development</option>
        <option value="Gaming Development">Gaming Development</option>
        <option value="Gen AI">Gen AI</option>
        <option value="Data Analysis">Data Analysis</option>
        <option value="Cybersecurity">Cybersecurity</option>
        <option value="Virtual Assistant">Virtual Assistant</option>
        <option value="Natural Programming Language">Natural Programming Language</option>
        <option value="Python">Python</option>
        <option value="JavaScript">JavaScript</option>
        <option value="TypeScript">TypeScript</option>
      </select>

      <br /><br />

      {mentors.map((mentor) => (
        <div key={mentor.id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
          <h4>{mentor.name}</h4>
          <p>Email: {mentor.email}</p>
          <p>Skills: {mentor.skills.join(', ')}</p>
         
        <button onClick={() => handleBookSession(mentor.id)}>📅 Book  a Session</button>
        </div>
      ))}

        <br />
      <button onClick={() => navigate(-1)}>⬅️ Go Back</button>
    </div>
  );
};

export default DiscoveryPage;



//<Link to="/my-requests"></Link>

/*
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

interface Mentor {
  id: number;
  name: string;
  email: string;
  bio?: string;
  skills?: string;
  goals?: string;
}

const DiscoveryPage = () => {
  return <div>Discovery Page</div>;

  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchMentors = async (searchQuery = '') => {
    try {
      const res = await axios.get(`/mentors/discover?search=${searchQuery}`);
      setMentors(res.data);
    } catch (err: any) {
      setError('Failed to load mentors');
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMentors(search);
  };

  const handleRequest = async (mentorId: number) => {
    try {
      await axios.post('/requests', { mentor_id: mentorId });
      alert('Request sent!');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Request failed');
    }
  };

  return (
    <div>
      <h2>Mentor Discovery</h2>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search mentors..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {mentors.length === 0 && <p>No mentors found.</p>}

      <ul>
        {mentors.map(mentor => (
          <li key={mentor.id} style={{ borderBottom: '1px solid #ccc', margin: '10px 0' }}>
            <h4>{mentor.name}</h4>
            <p><strong>Email:</strong> {mentor.email}</p>
            <p><strong>Bio:</strong> {mentor.bio || 'N/A'}</p>
            <p><strong>Skills:</strong> {mentor.skills || 'N/A'}</p>
            <button onClick={() => handleRequest(mentor.id)}>Request Mentorship</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiscoveryPage;
*/
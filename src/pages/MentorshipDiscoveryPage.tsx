import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'

interface Mentor {
  id: number;
  name: string;
  email: string;
  skills: string[];
}

const MentorshipDiscoveryPage: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await axios.get('/mentors');
        setMentors(res.data);
      } catch (err) {
        console.error('Failed to load mentors:', err);
      }
    };
    fetchMentors();
  }, []);

 // const goToAvailability = (mentorId: number) => {
  const handleBookSession = (mentorId: number) => {
    navigate(`/book/${mentorId}`);
  };

  return (
    <div>
      <h2>🔍 Discover Mentors</h2>
      {mentors.length === 0 ? (
        <p>No mentors available.</p>
      ) : (
        mentors.map((mentor) => (
          <div
            key={mentor.id}
            style={{
              border: '1px solid #ccc',
              padding: 10,
              marginBottom: 10,
              borderRadius: 6,
            }}
          >
            <h4>{mentor.name}</h4>
            <p>{mentor.email}</p>
            <p>Skills: {mentor.skills?.join(', ')}</p>
            <button onClick={() => handleBookSession(mentor.id)}>📅 Book Session</button>
          </div>
        ))
      )}
    </div>
  );
};

export default MentorshipDiscoveryPage;



//<Link to="/my-requests">📅 Book Session</Link>
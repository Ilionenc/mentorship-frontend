import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const ViewMentorAvailability: React.FC = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentorId, setSelectedMentorId] = useState('');
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState('');

  const fetchMentors = async () => {
    const res = await axios.get('/mentors'); // ⬅️ already built
    setMentors(res.data);
  };

  const fetchSlots = async (mentorId: string) => {
    try {
      const res = await axios.get(`/availability/${mentorId}`);
      setSlots(res.data);
    } catch (err) {
      setSlots([]);
    }
  };

  const sendRequest = async (mentor_id: number, date: string, time: string) => {
    console.log('Triggered sendRequest with', mentor_id, date, time);
  try {
    await axios.post('/requests', {
      mentor_id,
      requested_date: date,
      requested_time: time,
    });

    setMessage('✅ Mentorship request sent!');

    // Remove the slot from the list
    setSlots((prev) =>
      prev.filter(
        (slot: any) =>
          !(slot.mentor_id === mentor_id &&
            slot.available_date === date &&
            slot.available_time === time)
      )
    );
  } catch (err: any) {
    console.error('Request failed:',err.response?.date || err.message);
    setMessage('❌ Error: ' + (err.response?.data?.error || 'Unknown error'));
  }
};

  useEffect(() => {
    fetchMentors();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📅 View Mentor Availability</h2>
      {message && <p>{message}</p>}

      <label>Select a Mentor:</label><br />
      <select value={selectedMentorId} onChange={(e) => {
        setSelectedMentorId(e.target.value);
        fetchSlots(e.target.value);
      }}>
        <option value="">-- Choose a mentor --</option>
        {mentors.map((m: any) => (
          <option key={m.id} value={m.id}>{m.name} ({m.email})</option>
        ))}
      </select>

      {slots.length > 0 && (
        <>
          <h3>🕒 Available Slots</h3>
          <ul>
            {slots.map((slot: any) => (
              <li key={slot.id}>
                {slot.available_date} at {slot.available_time}{' '}
                <button onClick={() =>
               // console.log ('Button clicked');
                  sendRequest(slot.mentor_id, slot.available_date, slot.available_time)
                }>
                  Request Mentorship
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ViewMentorAvailability;
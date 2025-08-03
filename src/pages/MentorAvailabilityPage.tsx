import React, { useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const MentorAvailabilityFormPage: React.FC = () => {
  const [available_date, setDate] = useState('');
  const [available_time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('/availability', { available_date, available_time });
      setMessage('✅ Availability added successfully!');
      setDate('');
      setTime('');
    } catch (err: any) {
      console.error('Error:', err);
      setMessage('❌ Failed to add availability');
    }
  };

  return (
    <div>
      <h2>➕ Add Availability</h2>
      {message && <p>{message}</p>}

        <br />
      <button onClick={() => navigate(-1)}>⬅️ Go Back</button>

      <br />
       <br />

      <form onSubmit={handleSubmit}>
        <label>Date:</label><br />
        <input type="date" value={available_date} onChange={(e) => setDate(e.target.value)} required /><br /><br />

        <label>Time:</label><br />
        <input type="time" value={available_time} onChange={(e) => setTime(e.target.value)} required /><br /><br />

        <button type="submit">Submit</button>
      </form>

      <br />
      <button onClick={() => navigate('/')}>🏠 Go Home</button>
    </div>
  );
};

export default MentorAvailabilityFormPage;



/*
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosInstance';

interface Availability {
  id: number;
  available_date: string;
  available_time: string;
  mentor_id: number;
}



const MentorAvailabilityPage: React.FC = () => {
  const { mentorId } = useParams<{ mentorId: string }>();
  const [slots, setSlots] = useState<Availability[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await axios.get(`/availability/${mentorId}`);
        setSlots(res.data);
      } catch (err) {
        console.error('Failed to load availability:', err);
      }
    };

    fetchAvailability();
  }, [mentorId]);

  const requestBooking = async (slot: Availability) => {
    try {
      await axios.post('/sessions', {
        mentor_id: slot.mentor_id,
        date: slot.available_date,
        time: slot.available_time,
        topic: 'Mentorship Session',
      });

      setMessage('✅ Session booked successfully!');
      // Optionally remove the booked slot from the list
      setSlots(slots.filter((s) => s.id !== slot.id));
    } catch (err) {
      console.error('Booking failed:', err);
      setMessage('❌ Booking failed');
    }
  };

  return (
    <div>
      <h2>🗓️ Mentor Availability</h2>
      {message && <p>{message}</p>}
      {slots.length === 0 ? (
        <p>No available slots.</p>
      ) : (
        slots.map((slot) => (
          <div key={slot.id} style={{ border: '1px solid #ccc', marginBottom: 10, padding: 10 }}>
            <p><strong>Date:</strong> {slot.available_date}</p>
            <p><strong>Time:</strong> {slot.available_time}</p>
            <button onClick={() => requestBooking(slot)}>📩 Request Booking</button>
          </div>
        ))
      )}
    </div>
  );
};

export default MentorAvailabilityPage;
*/
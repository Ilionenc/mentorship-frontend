import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';

interface Slot {
  id: number;
  available_date: string;
  available_time: string;
}

const BookSessionPage: React.FC = () => {
  const { mentorId } = useParams(); // from URL: /book/:mentorId
  const navigate = useNavigate();

  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [topic, setTopic] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSlots = async () => {
      try {
       const res = await axios.get(`/discover`);
        //const res = await axios.get(`/availability/${mentorId}`);
        console.log('Available Slots:', slots);

        setSlots(res.data);
      } catch (err) {
        console.error('❌ Failed to load slots:', err);
        setError('Failed to load availability.');
      }
    };

    if (mentorId) {
      fetchSlots();
    }
  }, [mentorId]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedSlot = slots.find(s => s.id === parseInt(selectedSlotId));
    if (!selectedSlot) {
      setError('❌ Please select a valid slot');
      return;
    }

    try {
      await axios.post('/sessions', {
        mentor_id: mentorId,
        date: selectedSlot.available_date,
        time: selectedSlot.available_time,
        topic,
      });

      alert('✅ Session booked successfully!');
      navigate('/my-sessions');
    } catch (err: any) {
      console.error('❌ Booking error:', err.message);
      setError(err.response?.data?.error || 'Booking failed');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📆 Book a Session with Mentor</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleBooking}>
        
        <label>Select Slot:</label><br />
        <select
          value={selectedSlotId}
          onChange={(e) => setSelectedSlotId(e.target.value)}
          required
        >
          <option value="">-- Choose a time slot --</option>
          {slots.map((slot) => (
            <option key={slot.id} value={slot.id}>
              {slot.available_date}{slot.available_time ?'at ${slot.available_time}':'(no time)'}
            </option>
          ))}
        </select><br /><br />

        <button type="submit">✅ Book Session</button>
      </form>
    </div>
  );
};

export default BookSessionPage;

/*
import React, { useState } from 'react';
import axios from '../api/axios';
import { useEffect } from 'react';

const BookSessionPage: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [mentorId, setMentorId] = useState('');
  const [message, setMessage] = useState('');
  const [mentors, setMentors] = useState<any[]>([]);
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState('');

  




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

useEffect(() => {
  const fetchSlots = async () => {
    if (!mentorId) return;
    const res = await axios.get(`/availability/${mentorId}`);
    setSlots(res.data);
  };

  fetchSlots();
}, [mentorId]);


 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // ✅ prevent form from refreshing the page

  try {
    const selectedSlot = slots.find(s => s.id === parseInt(selectedSlotId));

    if (!selectedSlot) {
      setMessage('❌ Please select a valid slot');
      return;
    }

    await axios.post('/sessions', {
      mentor_id: mentorId,
      date: selectedSlot.available_date,
      time: selectedSlot.available_time,
      topic,
    });

    setMessage('✅ Session booked successfully!');
    setTopic('');
    setSelectedSlotId('');
    setMentorId('');
    setSlots([]);
  } catch (err: any) {
    console.error('❌ Booking error:', err.message);
    setMessage('❌ Failed to book session');
  }
};
  

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2>📅 Book a Session</h2>
      {message && <p style={{ color: message.startsWith('✅') ? 'green' : 'red' }}>{message}</p>}

      <form onSubmit={handleSubmit}>
  <label>Topic:</label><br />
  <input
    type="text"
    value={topic}
    onChange={(e) => setTopic(e.target.value)}
    required
  /><br /><br />

  <label>Date:</label><br />
  <input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    min={new Date().toISOString().split('T')[0]}
    required
  /><br /><br />

  <label>Time:</label><br />
  <input
    type="time"
    value={time}
    onChange={(e) => setTime(e.target.value)}
    required
  /><br /><br />

  {/* ✅ Add mentor dropdown right here 
  <label>Select Mentor:</label><br />
  <select
    value={mentorId}
    onChange={(e) => setMentorId(e.target.value)}
    required
  >
    <option value="">-- Choose a mentor --</option>
    {mentors.map((mentor) => (
      <option key={mentor.id} value={mentor.id}>
        {mentor.name} ({mentor.email})
      </option>
    ))}
  </select><br /><br />


{slots.length > 0 && (
  <>
    <label>Select Available Slot:</label><br />
    <select
      value={selectedSlotId}
      onChange={(e) => setSelectedSlotId(e.target.value)}
      required
    >
      <option value="">-- Select a time slot --</option>
      {slots.map((slot) => (
        <option key={slot.id} value={slot.id}>
          {slot.available_date} at {slot.available_time}
        </option>
      ))}
    </select><br /><br />
  </>
)}





  <button type="submit">Book Session</button>
</form>




    </div>
  );
};

export default BookSessionPage;
*/
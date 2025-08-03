import React, { useEffect, useState } from 'react';
import axios from 'axios';

type slot = {
  id: number;
  available_date: string;
  available_time: string;
};



const MergeMentorMenteePage = () => {
  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [slots, setSlots] = useState<slot[]>([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [selectedMentee, setSelectedMentee] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [topic, setTopic] = useState('');

  useEffect(() => {
    axios.get('/adminRoutes/mentors').then((res) => setMentors(res.data));
    axios.get('/adminRoutes/mentees').then((res) => setMentees(res.data));
  }, []);

  useEffect(() => {
    if (selectedMentor) {
      axios
        .get(`/adminRoutes/availability/${selectedMentor}`)
        .then((res) => setSlots(res.data))
        .catch((err) => {
          console.error('❌ Error loading slots:', err);
          setSlots([]);
        });
    }
  }, [selectedMentor]);

  useEffect(() => {
    if (selectedMentee) {
      axios
        .get(`/adminRoutes/mentee/${selectedMentee}/skills`)
        .then((res) => {
          setTopic(res.data.skills || '');
        })
        .catch((err) => {
          console.error('❌ Failed to load mentee skills:', err);
          setTopic('');
        });
    }
  }, [selectedMentee]);

  const handleMerge = async (e: React.FormEvent) => {
    e.preventDefault();
    const slot = slots.find((s) => s.id === parseInt(selectedSlot));
    if (!slot) return alert('⚠️ Please select a valid slot');

    try {
      await axios.post('/sessions', {
        mentor_id: selectedMentor,
        mentee_id: selectedMentee,
        date: slot.available_date,
        time: slot.available_time,
        topic,
      });

      await axios.delete(`/adminRoutes/availability/${selectedMentor}/${slot.id}`);
      alert('✅ Match merged and session created!');
    } catch (err) {
      console.error('❌ Merge failed:', err);
      alert('❌ Merge failed');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔗 Merge Mentor and Mentee</h2>

      <form onSubmit={handleMerge}>
        <label>Mentor:</label><br />
        <select value={selectedMentor} onChange={(e) => setSelectedMentor(e.target.value)} required>
          <option value="">-- Select Mentor --</option>
          {mentors.map((m: any) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select><br /><br />

        <label>Mentee:</label><br />
        <select value={selectedMentee} onChange={(e) => setSelectedMentee(e.target.value)} required>
          <option value="">-- Select Mentee --</option>
          {mentees.map((m: any) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select><br /><br />

        <label>Mentor’s Available Slots:</label><br />
        <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} required>
          <option value="">-- Select Slot --</option>
          {slots.map((s: any) => (
            <option key={s.id} value={s.id}>
              {s.available_date} at {s.available_time}
            </option>
          ))}
        </select><br /><br />

        <p><strong>🧠 Topic:</strong> {topic}</p>

        <button type="submit">🔗 Merge</button>
      </form>
    </div>
  );
};

export default MergeMentorMenteePage;
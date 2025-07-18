import React from 'react';
import logo from './logo.svg';
import './App.css';
import BookSessionPage from './pages/BookSessionPage';
import SessionDashboardPage from './pages/SessionDashboardPage';


/** 
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
  */



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage'; // placeholder
import DiscoveryPage from './pages/DiscoveryPage'; // placeholder
import MentorshipDiscoveryPage from './pages/MentorshipDiscoveryPage'; // placeholder
import MentorAvailabilityPage from './pages/MentorAvailabilityPage';
import MyRequestsPage from './pages/MyRequestsPage';
import MentorRequestsPage from './pages/MentorRequestsPage';
import RegisterPage from './pages/RegisterPage';
import ViewMentorAvailability from './pages/ViewMentorAvailability';
import ProfileFormPage from './pages/ProfileFormPage'; 
import ProfileEditPage from './pages/ProfileEditPage'; 
import UserRolePage from './pages/UserRolePage'; 
import Navbar from './components/Navbar'; 
import AdminDashboardPage from './pages/AdminDashboardPage'; 

/*
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/discover" element={<DiscoveryPage />} />
        <Route path="/booksession" element={<BookSessionPage/>} />
        <Route path="/sessions" element={<SessionDashboardPage/>} />
        <Route path="/availabilty" element={<MentorAvailabilityPage/>} />
      </Routes>
    </Router>
  );
}
*/
const App: React.FC = () => {
  const isAuthenticated = !localStorage.getItem('token');
  return (
    <Router>
      {/* Show Navbar only if logged in*/}
      <Navbar />
      <div style={{padding: '20px'}}>
      <Routes>
        
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/discover" element={<DiscoveryPage />} />
        <Route path="/book/:mentorId" element={<BookSessionPage/>} />
        <Route path="/sessions/dashboard" element={<SessionDashboardPage/>} />
        <Route path="/availability/mentorId" element={<MentorAvailabilityPage/>} />
        <Route path="/mentors" element={<MentorshipDiscoveryPage/>} />
        <Route path="/my-requests" element={<MyRequestsPage/>} />
        <Route path="/requests/incoming" element={<MentorRequestsPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/mentors/availability" element={<ViewMentorAvailability/>} />
        <Route path="/ProfileFormPage" element={<ProfileFormPage/>} />
        <Route path="/profile/edit" element={<ProfileFormPage/>} />
        <Route path="/UserRolePage" element={<UserRolePage/>} />
        <Route path="/admin" element={<AdminDashboardPage/>} />
       

   

           
      </Routes>
      </div>
    </Router>
  );
}

export default App;

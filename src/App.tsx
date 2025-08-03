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
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LoginRegPage from './pages/LoginRegPage';
import ProfilePage from './pages/ProfilePage'; // placeholder
import DiscoveryPage from './pages/DiscoveryPage'; // placeholder
import MentorshipDiscoveryPage from './pages/MentorshipDiscoveryPage'; // placeholder
import MentorAvailabilityPage from './pages/MentorAvailabilityPage';
import MyRequestsPage from './pages/MyRequestsPage';
import MentorRequestsPage from './pages/MentorRequestsPage';
import RegisterPage from './pages/RegisterPage';
import ViewMentorAvailability from './pages/ViewMentorAvailability';
import ProfileFormPage from './pages/ProfileFormPage'; // Registers for new users
import ProfileEditPage from './pages/ProfileEditPage'; 
import UserRolePage from './pages/UserRolePage'; 
import Navbar from './components/Navbar'; 
import AdminDashboardPage from './pages/AdminDashboardPage'; 
import ProfileCompletionPage from './pages/ProfileCompletionPage'; // placeholder
import MenteeDashboardPage from './pages/MenteeDashboardPage';
import MentorDashboardPage from './pages/MentorDashboardPage';
import MentorSessionsPage from './pages/MentorSessionsPage';
import MenteeSessionsPage from './pages/SessionDashboardPage';
import MenteeRequestToMentorPage from './pages/MenteeRequestToMentorPage';
import MergeMentorMenteePage from './pages/MergeMentorMenteePage';
       




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
        
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/loginReg" element={<LoginRegPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/discover" element={<DiscoveryPage />} />
        <Route path="/book/:mentorId" element={<BookSessionPage/>} />
        <Route path="/mentee/sessions" element={<MenteeSessionsPage/>} />
        <Route path="/availability/mentorId" element={<MentorAvailabilityPage/>} />
        <Route path="/mentors" element={<MentorshipDiscoveryPage/>} />
        <Route path="/my-requests" element={<MyRequestsPage/>} />
        <Route path="/requests/incoming" element={<MentorRequestsPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/mentors/availability" element={<ViewMentorAvailability/>} />
        <Route path="/ProfileFormPage" element={<ProfileFormPage/>} /> {/* Register new user*/}
        <Route path="/profile/edit" element={<ProfileFormPage/>} />
        <Route path="/UserRolePage" element={<UserRolePage/>} />
        <Route path="/admin" element={<AdminDashboardPage/>} />
        <Route path="/menteeDashboard" element={<MenteeDashboardPage/>} />
        <Route path="/profile/edit" element={<ProfileCompletionPage/>} />
        <Route path="/mentorDashboard" element={<MentorDashboardPage/>} />
        <Route path="/MentorSessions" element={<MentorSessionsPage/>} />
        <Route path="/MenteeRequestToMentor" element={<MenteeRequestToMentorPage/>} />
        <Route path="/MergeMentorMenteePage" element={<MergeMentorMenteePage/>} />

 
   

           
      </Routes>
      </div>
    </Router>
  );
}

export default App;

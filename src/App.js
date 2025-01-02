import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CalendarComponent from './components/Calender';
import SummaryPage from './components/Summary';


const App = () => {
  console.log("process.env",process.env)
  return (
    <Router>
      <div style={{ padding: '16px' }}>
        <nav style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <Link to="/" style={{ color: '#1d4ed8', textDecoration: 'none' }}>
            Calendar
          </Link>
          <Link to="/summary" style={{ color: '#1d4ed8', textDecoration: 'none' }}>
            Summary
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<CalendarComponent />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

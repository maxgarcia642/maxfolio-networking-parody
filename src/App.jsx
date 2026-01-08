import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../app/page.jsx';
import CreateProfile from '../app/create/page.jsx';
import Explore from '../app/explore/page.jsx';
import Profile from '../app/p/[username]/page.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateProfile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/p/:username" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

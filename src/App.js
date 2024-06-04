// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Auth from './components/Auth';
import ChatRoom from './components/ChatRoom';
import Friends from './components/Friends';

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <div>
        {user ? (
          <Routes>
            <Route path="/chat/:chatRoomId" element={<ChatRoom />} />
            <Route path="/" element={<Friends />} />
          </Routes>
        ) : (
          <Auth />
        )}
      </div>
    </Router>
  );
};

export default App;

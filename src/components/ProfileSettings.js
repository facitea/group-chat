import React, { useState } from 'react';
import { auth, database } from '../firebase';
import { ref, update } from 'firebase/database';

const ProfileSettings = () => {
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser.uid;
    const updates = {};

    if (displayName) {
      updates[`users/${userId}/displayName`] = displayName;
    }

    if (statusMessage) {
      updates[`users/${userId}/statusMessage`] = statusMessage;
    }

    await update(ref(database), updates);

    if (password) {
      auth.currentUser.updatePassword(password).catch(error => {
        console.error('Error updating password:', error);
      });
    }

    setDisplayName('');
    setPassword('');
    setStatusMessage('');
  };

  return (
    <div style={{ margin: '20px 0' }}>
      {/* <h2>프로필 설정</h2>
      <form onSubmit={handleUpdateProfile}>
        <div>
          <label>Display Name:</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Status Message:</label>
          <input
            type="text"
            value={statusMessage}
            onChange={(e) => setStatusMessage(e.target.value)}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form> */}
    </div>
  );
};

export default ProfileSettings;

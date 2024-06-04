// import React, { useState, useEffect } from 'react';
// import { auth, database } from '../firebase';
// import { ref, set, onValue, query, orderByChild, equalTo } from 'firebase/database';
// import { useNavigate } from 'react-router-dom';
// import ProfileSettings from './ProfileSettings';

// const Friends = () => {
//   const [friendEmail, setFriendEmail] = useState('');
//   const [friendRequests, setFriendRequests] = useState([]);
//   const [friends, setFriends] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userId = auth.currentUser.uid;
//     const requestsRef = ref(database, `users/${userId}/friendRequests`);
//     const friendsRef = ref(database, `users/${userId}/friends`);

//     onValue(requestsRef, (snapshot) => {
//       const data = snapshot.val();
//       const requests = data ? Object.keys(data) : [];
//       setFriendRequests(requests);
//     });

//     onValue(friendsRef, (snapshot) => {
//       const data = snapshot.val();
//       const friendList = data ? Object.keys(data) : [];
//       setFriends(friendList);
//     });
//   }, []);

//   const handleSendFriendRequest = async () => {
//     const userId = auth.currentUser.uid;

//     const userQuery = query(ref(database, 'users'), orderByChild('email'), equalTo(friendEmail));
//     onValue(userQuery, (snapshot) => {
//       let friendFound = false;
//       snapshot.forEach((userSnapshot) => {
//         const userData = userSnapshot.val();
//         const friendId = userSnapshot.key;
//         if (userData.email === friendEmail) {
//           friendFound = true;
//           const friendRequestRef = ref(database, `users/${friendId}/friendRequests/${userId}`);
//           set(friendRequestRef, true)
//             .then(() => console.log('Friend request sent to:', friendId))
//             .catch((error) => console.error('Error sending friend request:', error));
//         }
//       });
//       if (!friendFound) {
//         console.error('User with email', friendEmail, 'not found.');
//       }
//     }, {
//       onlyOnce: true // Ensure this runs only once
//     });
//   };

//   const handleAcceptFriendRequest = async (friendId) => {
//     const userId = auth.currentUser.uid;
//     const userFriendRef = ref(database, `users/${userId}/friends/${friendId}`);
//     const friendUserRef = ref(database, `users/${friendId}/friends/${userId}`);
    
//     await set(userFriendRef, true);
//     await set(friendUserRef, true);

//     const friendRequestRef = ref(database, `users/${userId}/friendRequests/${friendId}`);
//     await set(friendRequestRef, null);
//   };

//   const getChatRoomId = (userId, friendId) => {
//     return userId < friendId ? `${userId}_${friendId}` : `${friendId}_${userId}`;
//   };

//   const handleChat = (friendId) => {
//     const userId = auth.currentUser.uid;
//     const chatRoomId = getChatRoomId(userId, friendId);
//     navigate(`/chat/${chatRoomId}`);
//   };

//   return (
//     <div>
//       <h2>Friend Requests</h2>
//       <ul>
//         {friendRequests.map((request) => (
//           <li key={request}>
//             {request}
//             <button onClick={() => handleAcceptFriendRequest(request)}>Accept</button>
//           </li>
//         ))}
//       </ul>
//       <h2>Friends</h2>
//       <ul>
//         {friends.map((friend) => (
//           <li key={friend}>
//             {friend}
//             <button onClick={() => handleChat(friend)}>Chat</button>
//           </li>
//         ))}
//       </ul>
//       <input
//         type="email"
//         placeholder="Friend's Email"
//         value={friendEmail}
//         onChange={(e) => setFriendEmail(e.target.value)}
//       />
//       <button onClick={handleSendFriendRequest}>Send Friend Request</button>
      
//       <ProfileSettings />
//     </div>
//   );
// };

// export default Friends;


// import React, { useState, useEffect } from 'react';
// import { auth, database } from '../firebase';
// import { ref, set, onValue, query, orderByChild, equalTo } from 'firebase/database';
// import { useNavigate } from 'react-router-dom';
// import ProfileSettings from './ProfileSettings';

// const Friends = () => {
//   const [friendEmail, setFriendEmail] = useState('');
//   const [friendRequests, setFriendRequests] = useState([]);
//   const [friends, setFriends] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userId = auth.currentUser.uid;
//     const requestsRef = ref(database, `users/${userId}/friendRequests`);
//     const friendsRef = ref(database, `users/${userId}/friends`);

//     onValue(requestsRef, (snapshot) => {
//       const data = snapshot.val();
//       const requests = data ? Object.keys(data) : [];
//       setFriendRequests(requests);
//     });

//     onValue(friendsRef, (snapshot) => {
//       const data = snapshot.val();
//       const friendList = data ? Object.keys(data) : [];
//       setFriends(friendList);
//     });
//   }, []);

//   const handleSendFriendRequest = async () => {
//     const userId = auth.currentUser.uid;

//     const userQuery = query(ref(database, 'users'), orderByChild('email'), equalTo(friendEmail));
//     onValue(userQuery, (snapshot) => {
//       let friendFound = false;
//       snapshot.forEach((userSnapshot) => {
//         const userData = userSnapshot.val();
//         const friendId = userSnapshot.key;
//         if (userData.email === friendEmail) {
//           friendFound = true;
//           const friendRequestRef = ref(database, `users/${friendId}/friendRequests/${userId}`);
//           set(friendRequestRef, true)
//             .then(() => console.log('Friend request sent to:', friendId))
//             .catch((error) => console.error('Error sending friend request:', error));
//         }
//       });
//       if (!friendFound) {
//         console.error('User with email', friendEmail, 'not found.');
//       }
//     }, {
//       onlyOnce: true // Ensure this runs only once
//     });
//   };

//   const handleAcceptFriendRequest = async (friendId) => {
//     const userId = auth.currentUser.uid;
//     const userFriendRef = ref(database, `users/${userId}/friends/${friendId}`);
//     const friendUserRef = ref(database, `users/${friendId}/friends/${userId}`);
    
//     await set(userFriendRef, true);
//     await set(friendUserRef, true);

//     const friendRequestRef = ref(database, `users/${userId}/friendRequests/${friendId}`);
//     await set(friendRequestRef, null);
//   };

//   const getChatRoomId = (userId, friendId) => {
//     return userId < friendId ? `${userId}_${friendId}` : `${friendId}_${userId}`;
//   };

//   const handleChat = (friendId) => {
//     const userId = auth.currentUser.uid;
//     const chatRoomId = getChatRoomId(userId, friendId);
//     navigate(`/chat/${chatRoomId}`);
//   };

//   return (
//     <div>
//       <h2>Friend Requests</h2>
//       <ul>
//         {friendRequests.map((request) => (
//           <li key={request}>
//             {request}
//             <button onClick={() => handleAcceptFriendRequest(request)}>Accept</button>
//           </li>
//         ))}
//       </ul>
//       <h2>Friends</h2>
//       <ul>
//         {friends.map((friend) => (
//           <li key={friend}>
//             {friend}
//             <button onClick={() => handleChat(friend)}>Chat</button>
//           </li>
//         ))}
//       </ul>
//       <input
//         type="email"
//         placeholder="Friend's Email"
//         value={friendEmail}
//         onChange={(e) => setFriendEmail(e.target.value)}
//       />
//       <button onClick={handleSendFriendRequest}>Send Friend Request</button>
      
//       <ProfileSettings />
//     </div>
//   );
// };

// export default Friends;

import React, { useState, useEffect } from 'react';
import { auth, database } from '../firebase';
import { ref, set, onValue, query, orderByChild, equalTo, serverTimestamp } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import ProfileSettings from './ProfileSettings';

const Friends = () => {
  const [friendEmail, setFriendEmail] = useState('');
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const requestsRef = ref(database, `users/${userId}/friendRequests`);
    const friendsRef = ref(database, `users/${userId}/friends`);

    const unsubscribeRequests = onValue(requestsRef, (snapshot) => {
      const data = snapshot.val();
      const requests = data ? Object.keys(data) : [];
      setFriendRequests(requests);
    });

    const unsubscribeFriends = onValue(friendsRef, (snapshot) => {
      const data = snapshot.val();
      const friendList = data ? Object.keys(data) : [];
      setFriends(friendList);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribeRequests();
      unsubscribeFriends();
    };
  }, []);

  const handleSendFriendRequest = async () => {
    const userId = auth.currentUser.uid;

    const userQuery = query(ref(database, 'users'), orderByChild('email'), equalTo(friendEmail));
    onValue(userQuery, (snapshot) => {
      let friendFound = false;
      snapshot.forEach((userSnapshot) => {
        const userData = userSnapshot.val();
        const friendId = userSnapshot.key;
        if (userData.email === friendEmail) {
          friendFound = true;
          const friendRequestRef = ref(database, `users/${friendId}/friendRequests/${userId}`);
          set(friendRequestRef, true)
            .then(() => console.log('Friend request sent to:', friendId))
            .catch((error) => console.error('Error sending friend request:', error));
        }
      });
      if (!friendFound) {
        console.error('User with email', friendEmail, 'not found.');
      }
    }, {
      onlyOnce: true // Ensure this runs only once
    });
  };

  const handleAcceptFriendRequest = async (friendId) => {
    const userId = auth.currentUser.uid;
    const userFriendRef = ref(database, `users/${userId}/friends/${friendId}`);
    const friendUserRef = ref(database, `users/${friendId}/friends/${userId}`);

    try {
      // 양쪽 모두 친구로 추가
      await set(userFriendRef, { addedAt: serverTimestamp() });
      await set(friendUserRef, { addedAt: serverTimestamp() });

      // 친구 요청에서 제거
      const friendRequestRef = ref(database, `users/${userId}/friendRequests/${friendId}`);
      await set(friendRequestRef, null);
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const getChatRoomId = (userId, friendId) => {
    return userId < friendId ? `${userId}_${friendId}` : `${friendId}_${userId}`;
  };

  const handleChat = (friendId) => {
    const userId = auth.currentUser.uid;
    const chatRoomId = getChatRoomId(userId, friendId);
    navigate(`/chat/${chatRoomId}`);
  };

  return (
    <div>
      <h2>Friend Requests</h2>
      <ul>
        {friendRequests.map((request) => (
          <li key={request}>
            {request}
            <button onClick={() => handleAcceptFriendRequest(request)}>Accept</button>
          </li>
        ))}
      </ul>
      <h2>Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend}>
            {friend}
            <button onClick={() => handleChat(friend)}>Chat</button>
          </li>
        ))}
      </ul>
      <input
        type="email"
        placeholder="Friend's Email"
        value={friendEmail}
        onChange={(e) => setFriendEmail(e.target.value)}
      />
      <button onClick={handleSendFriendRequest}>Send Friend Request</button>
      
      <ProfileSettings />
    </div>
  );
};

export default Friends;



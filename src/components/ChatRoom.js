// // src/components/ChatRoom.js
// import React, { useEffect, useState } from 'react';
// import { auth, database } from '../firebase';
// import { ref, onValue, push, serverTimestamp } from 'firebase/database';
// import { useParams } from 'react-router-dom';

// const ChatRoom = () => {
//   const { chatRoomId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     const messagesRef = ref(database, `chatRooms/${chatRoomId}/messages`);

//     const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
//       const data = snapshot.val();
//       const messagesData = data ? Object.keys(data).map(key => ({
//         id: key,
//         ...data[key]
//       })) : [];
//       setMessages(messagesData);
//     });

//     return () => unsubscribeMessages();
//   }, [chatRoomId]);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     const { uid } = auth.currentUser;
//     await push(ref(database, `chatRooms/${chatRoomId}/messages`), {
//       text: newMessage,
//       uid,
//       createdAt: serverTimestamp(),
//     });
//     setNewMessage('');
//   };

//   return (
//     <div>
//       <div>
//         {messages.map(msg => (
//           <div key={msg.id}>
//             <p>{msg.text}</p>
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSendMessage}>
//         <input
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Say something..."
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default ChatRoom;

// import React, { useEffect, useState, useRef } from 'react';
// import { auth, database } from '../firebase';
// import { ref, onValue, push, serverTimestamp } from 'firebase/database';
// import { useParams, useNavigate } from 'react-router-dom';

// const ChatRoom = () => {
//   const { chatRoomId } = useParams();
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [chatPartner, setChatPartner] = useState('');
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     const userId = auth.currentUser.uid;
//     const chatPartnerId = chatRoomId.replace(userId, '').replace('_', '');

//     const chatPartnerRef = ref(database, `users/${chatPartnerId}/displayName`);
//     onValue(chatPartnerRef, (snapshot) => {
//       const data = snapshot.val();
//       setChatPartner(data || 'Unknown');
//     });

//     const messagesRef = ref(database, `chatRooms/${chatRoomId}/messages`);
//     const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
//       const data = snapshot.val();
//       const messagesData = data ? Object.keys(data).map(key => ({
//         id: key,
//         ...data[key]
//       })) : [];
//       setMessages(messagesData);
//       scrollToBottom();
//     });

//     return () => unsubscribeMessages();
//   }, [chatRoomId]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     const { uid, displayName } = auth.currentUser;
//     await push(ref(database, `chatRooms/${chatRoomId}/messages`), {
//       text: newMessage,
//       uid,
//       displayName,
//       createdAt: serverTimestamp(),
//     });
//     setNewMessage('');
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const formatTimestamp = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleString();
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//       <div style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#f1f1f1', borderBottom: '1px solid #ddd' }}>
//         <button onClick={() => navigate(-1)}>Back</button>
//         <h2 style={{ margin: '0 10px' }}>{chatPartner}</h2>
//       </div>
//       <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
//         {messages.map(msg => (
//           <div key={msg.id} style={{ display: 'flex', justifyContent: msg.uid === auth.currentUser.uid ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
//             <div style={{ maxWidth: '60%', padding: '10px', borderRadius: '10px', backgroundColor: msg.uid === auth.currentUser.uid ? '#e1ffc7' : '#f1f1f1', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)', border: msg.uid !== auth.currentUser.uid ? '1px solid #ddd' : 'none' }}>
//               <p><strong>{msg.displayName}</strong></p>
//               <p>{msg.text}</p>
//               {msg.createdAt && <p style={{ fontSize: '0.8em', color: '#888' }}>{formatTimestamp(msg.createdAt)}</p>}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <form onSubmit={handleSendMessage} style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ddd' }}>
//         <input
//           style={{ flex: 1, marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Say something..."
//         />
//         <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#28a745', color: '#fff' }}>Send</button>
//       </form>
//     </div>
//   );
// };

// export default ChatRoom;



import React, { useEffect, useState, useRef } from 'react';
import { auth, database } from '../firebase';
import { ref, onValue, push, serverTimestamp } from 'firebase/database';
import { useParams, useNavigate } from 'react-router-dom';

const ChatRoom = () => {
  const { chatRoomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatPartner, setChatPartner] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const chatPartnerId = chatRoomId.replace(userId, '').replace('_', '');

    const chatPartnerRef = ref(database, `users/${chatPartnerId}/displayName`);
    onValue(chatPartnerRef, (snapshot) => {
      const data = snapshot.val();
      setChatPartner(data || 'Unknown');
    });

    const messagesRef = ref(database, `chatRooms/${chatRoomId}/messages`);
    const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messagesData = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })) : [];
      setMessages(messagesData);
      scrollToBottom();
    });

    return () => unsubscribeMessages();
  }, [chatRoomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const { uid, displayName } = auth.currentUser;
    await push(ref(database, `chatRooms/${chatRoomId}/messages`), {
      text: newMessage,
      uid,
      displayName,
      createdAt: serverTimestamp(),
    });
    setNewMessage('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#f1f1f1', borderBottom: '1px solid #ddd' }}>
        <button onClick={() => navigate(-1)}>Back</button>
        <h2 style={{ margin: '0 10px' }}>{chatPartner}</h2>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', justifyContent: msg.uid === auth.currentUser.uid ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
            <div style={{ textAlign: 'left', marginBottom: '5px', fontSize: '0.8em', color: '#555' }}>
              <strong>{msg.displayName}</strong>
            </div>
            <div style={{ maxWidth: '60%', padding: '10px', borderRadius: '10px', backgroundColor: msg.uid === auth.currentUser.uid ? '#e1ffc7' : '#f1f1f1', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)', border: msg.uid !== auth.currentUser.uid ? '1px solid #ddd' : 'none' }}>
              <p>{msg.text}</p>
              {msg.createdAt && <p style={{ fontSize: '0.8em', color: '#888' }}>{formatTimestamp(msg.createdAt)}</p>}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ddd' }}>
        <input
          style={{ flex: 1, marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Say something..."
        />
        <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#28a745', color: '#fff' }}>Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;

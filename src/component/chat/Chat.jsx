import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

const Chat = ({ userId, receiverId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

useEffect(() => {
    socket.emit('joinRoom', receiverId);

     socket.on('receiveMessage', (chatMessage) => {
      setMessages((prevMessages) => [...prevMessages, chatMessage]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [receiverId]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    socket.emit('sendMessage', {
      sender: userId,
      receiver: receiverId,
      message
    });

    setMessage('');
  };

  return (
    <div>
      <div id="chat-messages">
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.sender}: {msg.message}
          </div>
        ))}
      </div>
      <form id="chat-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          id="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;

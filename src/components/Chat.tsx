import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import { RootState } from '../store';

interface Message {
  sender: string;
  content: string;
  timestamp: Date;
}

interface ChatProps {
  recipientId: string;
}

const Chat: React.FC<ChatProps> = ({ recipientId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user && user._id) {
      socketRef.current = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
        query: { userId: user._id },
      });

      socketRef.current.on('message', (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [user]);

  const sendMessage = () => {
    if (inputMessage.trim() && socketRef.current && user) {
      const message: Message = {
        sender: user._id,
        content: inputMessage,
        timestamp: new Date(),
      };
      socketRef.current.emit('sendMessage', { recipientId, message });
      setMessages((prevMessages) => [...prevMessages, message]);
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-96 bg-white rounded-lg shadow-md">
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              message.sender === user?._id ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            }`}
          >
            <p>{message.content}</p>
            <p className="text-xs text-gray-500">
              {new Date(message.timestamp).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
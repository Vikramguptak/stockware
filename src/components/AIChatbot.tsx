import React, { useState } from 'react';
import { classifyCustomerIntent } from '../services/api';

const AIChatbot: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput('');

    try {
      const intent = await classifyCustomerIntent(input);
      let response = '';

      switch (intent) {
        case 'booking':
          response = "Certainly! I can help you book a warehouse. Could you please provide more details about your storage needs, such as the size of space you're looking for and the duration of storage?";
          break;
        case 'pricing':
          response = "Our pricing varies depending on the size of the space and duration of storage. Could you give me more specifics about your needs so I can provide an accurate quote?";
          break;
        case 'availability':
          response = "I'd be happy to check availability for you. Could you please specify the location and dates you're interested in?";
          break;
        default:
          response = "I'm not sure I understand. Could you please rephrase your question or provide more details?";
      }

      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    } catch (error) {
      console.error('Error classifying intent:', error);
      setMessages(prev => [...prev, { text: "I'm sorry, I'm having trouble understanding right now. Could you try again?", sender: 'bot' }]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">AI Chatbot</h2>
      <div className="h-64 overflow-y-auto mb-4 p-4 border border-gray-200 rounded">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l"
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r">Send</button>
      </form>
    </div>
  );
};

export default AIChatbot;
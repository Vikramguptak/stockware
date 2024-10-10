import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getWarehouseDetails, createReview } from '../services/api';
import BookingForm from '../components/BookingForm';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import Chat from '../components/Chat';
import { RootState } from '../store';

const WarehouseDetailsPage: React.FC = () => {
  // ... (previous code)

  const [showChat, setShowChat] = useState(false);

  // ... (rest of the component code)

  return (
    <div className="container mx-auto px-4 py-16">
      {/* ... (previous JSX) */}
      
      {user && warehouse && (
        <div className="mt-8">
          <button
            onClick={() => setShowChat(!showChat)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            {showChat ? 'Hide Chat' : 'Chat with Vendor'}
          </button>
          {showChat && <Chat recipientId={warehouse.vendor} />}
        </div>
      )}
      
      {/* ... (rest of the JSX) */}
    </div>
  );
};

export default WarehouseDetailsPage;
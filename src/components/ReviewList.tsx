import React from 'react';
import { Star } from 'lucide-react';

interface Review {
  _id: string;
  user: {
    name: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review._id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center mb-2">
            <div className="flex mr-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <Star
                  key={value}
                  className={`w-5 h-5 ${
                    value <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold">{review.user.name}</span>
          </div>
          <p className="text-gray-600 mb-2">{review.comment}</p>
          <p className="text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
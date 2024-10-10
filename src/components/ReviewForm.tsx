import React from 'react';
import { useForm } from 'react-hook-form';
import { yup } from '@hookform/resolvers/yup';
import { Star } from 'lucide-react';

const reviewSchema = yup.object().shape({
  rating: yup.number().required().min(1).max(5),
  comment: yup.string().required().min(10).max(500),
});

interface ReviewFormProps {
  warehouseId: string;
  onSubmit: (data: any) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ warehouseId, onSubmit }) => {
  const { register, handleSubmit, errors, watch } = useForm({
    validationSchema: reviewSchema,
  });

  const rating = watch('rating', 0);

  const handleFormSubmit = (data) => {
    onSubmit({ ...data, warehouseId });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block mb-2">Rating</label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value} className="cursor-pointer">
              <input
                type="radio"
                value={value}
                {...register('rating')}
                className="sr-only"
              />
              <Star
                className={`w-8 h-8 ${
                  value <= rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            </label>
          ))}
        </div>
        {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
      </div>
      <div>
        <label htmlFor="comment" className="block mb-2">Comment</label>
        <textarea
          id="comment"
          {...register('comment')}
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
        ></textarea>
        {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
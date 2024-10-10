import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  spaceType: yup.string().required('Space type is required'),
  size: yup.number().positive('Size must be positive').required('Size is required'),
  location: yup.string().required('Location is required'),
  description: yup.string().required('Description is required'),
});

const ListYourSpacePage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // Here you would typically send this data to your backend
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">List Your Space</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Name</label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2">Phone</label>
          <input
            type="tel"
            id="phone"
            {...register('phone')}
            className="w-full p-2 border rounded"
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="spaceType" className="block mb-2">Space Type</label>
          <select
            id="spaceType"
            {...register('spaceType')}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a space type</option>
            <option value="warehouse">Warehouse</option>
            <option value="self-storage">Self Storage</option>
            <option value="parking">Parking</option>
          </select>
          {errors.spaceType && <p className="text-red-500">{errors.spaceType.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="size" className="block mb-2">Size (sq ft)</label>
          <input
            type="number"
            id="size"
            {...register('size')}
            className="w-full p-2 border rounded"
          />
          {errors.size && <p className="text-red-500">{errors.size.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block mb-2">Location</label>
          <input
            type="text"
            id="location"
            {...register('location')}
            className="w-full p-2 border rounded"
          />
          {errors.location && <p className="text-red-500">{errors.location.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">Description</label>
          <textarea
            id="description"
            {...register('description')}
            className="w-full p-2 border rounded"
            rows={4}
          ></textarea>
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default ListYourSpacePage;
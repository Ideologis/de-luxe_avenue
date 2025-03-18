"use client";
import React from 'react';
import { useAppSelector } from '../store/hook';

const LoadingOverlay: React.FC = () => {
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center transition-transform transform hover:scale-105">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-xl font-semibold text-gray-800">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
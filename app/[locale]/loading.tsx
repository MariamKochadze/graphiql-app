import React from 'react';
import LoadingSpinner from '../../components/Loader/LoadingSpinner';

const Loading: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <LoadingSpinner />
    </div>
  );
};

export default Loading;

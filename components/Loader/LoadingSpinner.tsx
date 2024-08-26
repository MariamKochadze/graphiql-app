import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500"
        style={{
          width: '40px',
          height: '40px',
        }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;

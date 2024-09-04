import React from 'react';
import { PulseLoader } from 'react-spinners';

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <PulseLoader color="#36d7b7" />
  </div>
);

export default LoadingSpinner;

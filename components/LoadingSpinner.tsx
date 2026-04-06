
import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-primary"></div>
       <div className="absolute flex justify-center items-center">
            <LogoIcon className="h-16 w-16" />
        </div>
    </div>
  );
};

export default LoadingSpinner;

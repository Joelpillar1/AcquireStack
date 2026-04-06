
import React from 'react';

const StartupCardSkeleton: React.FC = () => {
  return (
    <div className="bg-base-200 rounded-2xl border border-base-300 overflow-hidden">
      <div className="p-6 space-y-4 animate-pulse">
        <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-lg bg-base-300 flex-shrink-0"></div>
                <div className="space-y-2">
                     <div className="h-4 bg-base-300 rounded w-32"></div>
                     <div className="h-3 bg-base-300 rounded w-48"></div>
                </div>
            </div>
            <div className="h-5 w-5 bg-base-300 rounded-full"></div>
        </div>
        
        <div className="flex items-center space-x-2">
            <div className="h-6 w-20 bg-base-300 rounded-md"></div>
        </div>

        <div className="pt-2 space-y-2">
            <div>
                 <div className="h-3 bg-base-300 rounded w-24 mb-1"></div>
                 <div className="h-7 bg-base-300 rounded w-40"></div>
            </div>
        </div>
      </div>
      <div className="px-6 py-4 border-t border-base-300 bg-base-100/50 flex justify-between items-center">
        <div className="flex text-xs space-x-4 animate-pulse">
            <div className="h-4 bg-base-300 rounded w-24"></div>
            <div className="h-4 bg-base-300 rounded w-24"></div>
        </div>
        <div className="h-5 w-5 bg-base-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default StartupCardSkeleton;

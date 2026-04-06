
import React from 'react';
import type { StartupListing } from '../types';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { LogoIcon } from './icons/LogoIcon';

interface StartupCardProps {
  listing: StartupListing;
  onViewDetails: (listing: StartupListing) => void;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
}

const StartupCard: React.FC<StartupCardProps> = ({ listing, onViewDetails }) => {
  const isVerified = listing.mrrVerified || listing.usersVerified;

  return (
    <div 
      onClick={() => onViewDetails(listing)}
      className="bg-base-200 rounded-2xl border border-base-300 overflow-hidden cursor-pointer group transition-all duration-300 hover:border-brand-primary hover:shadow-2xl hover:shadow-brand-primary/10"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
                <LogoIcon className="h-12 w-12 rounded-lg flex-shrink-0" />
                <div>
                     <h3 className="text-lg font-bold font-serif text-content-100">{listing.name}</h3>
                     <p className="text-sm text-content-200">{listing.tagline}</p>
                     <p className="text-xs text-content-200 mt-1">by <span className="font-medium text-content-100">{listing.founder.name}</span></p>
                </div>
            </div>
            {isVerified && (
                <div className="flex items-center space-x-1 text-brand-primary" title="Contains verified metrics">
                    <CheckCircleIcon className="h-5 w-5" />
                </div>
            )}
        </div>
        
        <div className="flex items-center space-x-2">
            <span className="text-xs font-medium bg-brand-primary/10 text-brand-primary px-2 py-1 rounded-md">{listing.category}</span>
        </div>

        <div className="pt-2 space-y-2">
            <div>
                 <p className="text-xs text-content-200">Asking Price</p>
                 <p className="text-2xl font-bold text-content-100">{formatCurrency(listing.price)}</p>
            </div>
        </div>
      </div>
      <div className="px-6 py-4 border-t border-base-300 bg-base-100/50 flex justify-between items-center">
        <div className="flex text-xs space-x-4">
            <div>
                <span className="text-content-200">MRR: </span>
                <span className="font-medium text-content-100">{formatCurrency(listing.mrr)}</span>
            </div>
             <div>
                <span className="text-content-200">Users: </span>
                <span className="font-medium text-content-100">{listing.users.toLocaleString()}</span>
            </div>
        </div>
        <ArrowRightIcon className="h-5 w-5 text-content-200 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-primary"/>
      </div>
    </div>
  );
};

export default StartupCard;

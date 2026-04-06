
import React from 'react';
import type { StartupListing } from '../types';
import { LogoIcon } from './icons/LogoIcon';

interface SponsoredCardProps {
  listing: StartupListing;
  onViewDetails: (listing: StartupListing) => void;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
}

const SponsoredCard: React.FC<SponsoredCardProps> = ({ listing, onViewDetails }) => {
  return (
    <div
      onClick={() => onViewDetails(listing)}
      className="h-20 bg-base-200/90 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between space-x-4 cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg"
    >
      <div className="flex items-center space-x-4 overflow-hidden">
        <div className="flex-shrink-0">
          <LogoIcon className="h-12 w-12 rounded-lg" />
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-bold text-content-100 truncate">{listing.name}</p>
          <p className="text-xs text-content-200 truncate">by {listing.founder.name}</p>
        </div>
      </div>
      <div className="flex-shrink-0 text-right">
          <p className="text-sm font-bold text-brand-primary">{formatCurrency(listing.mrr)}</p>
          <p className="text-xs text-content-200">MRR</p>
      </div>
    </div>
  );
};

export default SponsoredCard;

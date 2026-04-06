
import React from 'react';
import type { StartupListing } from '../types';
import { LogoIcon } from './icons/LogoIcon';

interface SpotlightCardProps {
  listing: StartupListing;
  onViewDetails: (listing: StartupListing) => void;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ listing, onViewDetails }) => {
  return (
    <div
      onClick={() => onViewDetails(listing)}
      className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors hover:bg-base-100/80"
    >
      <div className="flex items-center space-x-4 overflow-hidden">
        <LogoIcon className="h-10 w-10 rounded-lg flex-shrink-0" />
        <div className="overflow-hidden">
          <p className="font-semibold text-content-100 text-sm truncate">{listing.name}</p>
          <p className="text-xs text-content-200 truncate">{listing.tagline}</p>
        </div>
      </div>
      <div className="text-right flex-shrink-0 ml-4">
        <p className="font-semibold text-content-100 text-sm">{formatCurrency(listing.mrr)}</p>
        <p className="text-xs text-content-200">MRR</p>
      </div>
    </div>
  );
};

export default SpotlightCard;

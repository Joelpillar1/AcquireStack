
import React from 'react';
import type { StartupListing } from '../types';
import { LogoIcon } from './icons/LogoIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
}

interface RelatedListingCardProps {
  listing: StartupListing;
  onViewDetails: (listing: StartupListing) => void;
}

const RelatedListingCard: React.FC<RelatedListingCardProps> = ({ listing, onViewDetails }) => {
  return (
    <div
      onClick={() => onViewDetails(listing)}
      className="bg-base-200 p-4 rounded-xl border border-base-300 cursor-pointer group transition-all duration-300 hover:border-brand-primary hover:shadow-lg hover:bg-base-100/50"
    >
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4 overflow-hidden">
          <LogoIcon className="h-10 w-10 rounded-lg flex-shrink-0" />
          <div className="overflow-hidden">
            <p className="font-semibold text-content-100 truncate">{listing.name}</p>
            <p className="text-sm text-content-200 truncate">by {listing.founder.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-content-200">Price</p>
            <p className="font-bold text-content-100">{formatCurrency(listing.price)}</p>
          </div>
          <ArrowRightIcon className="h-5 w-5 text-content-200 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-primary"/>
        </div>
      </div>
    </div>
  );
};

export default RelatedListingCard;

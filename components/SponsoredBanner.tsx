
import React from 'react';
import type { StartupListing } from '../types';
import SponsoredCard from './SponsoredCard';

interface SponsoredBannerProps {
  listings: StartupListing[];
  onViewDetails: (listing: StartupListing) => void;
}

const SponsoredBanner: React.FC<SponsoredBannerProps> = ({ listings, onViewDetails }) => {
  // Duplicate the listings to create a seamless loop
  const extendedListings = [...listings, ...listings];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-28 bg-details-bg border-t border-details-content-200/20 z-40 overflow-hidden group flex items-center">
      <div className="flex animate-infinite-scroll group-hover:paused">
        {extendedListings.map((listing, index) => (
          <div key={`${listing.id}-${index}`} className="flex-shrink-0 mx-3" style={{ width: '280px' }}>
            <SponsoredCard listing={listing} onViewDetails={onViewDetails} />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
        .group-hover\\:paused:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default SponsoredBanner;

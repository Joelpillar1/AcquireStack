
import React, { useState, useMemo } from 'react';
import type { StartupListing } from '../types';
import StartupCard from './StartupCard';
import Filters from './Filters';
import SponsoredBanner from './SponsoredBanner';
import StartupCardSkeleton from './StartupCardSkeleton';
import SpotlightCard from './SpotlightCard';

interface ListingsPageProps {
  listings: StartupListing[];
  sponsoredListings: StartupListing[];
  onViewDetails: (listing: StartupListing) => void;
  isLoading: boolean;
}

const ListingsPage: React.FC<ListingsPageProps> = ({ listings, sponsoredListings, onViewDetails, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default');

  const filterCategories = ['All', 'SaaS', 'AI', 'E-commerce', 'Fintech', 'HealthTech', 'EdTech', 'Creator Economy', 'Developer Tools', 'Gaming', 'GreenTech'];

  const recentListings = useMemo(() => {
    // New listings are prepended, so the start of the array is the most recent.
    return listings.slice(0, 5);
  }, [listings]);

  const filteredAndSortedListings = useMemo(() => {
    let result = listings;

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter(listing => listing.category === activeCategory);
    }

    // Search filter
    if (searchTerm.trim() !== '') {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      result = result.filter(listing =>
        listing.name.toLowerCase().includes(lowercasedSearchTerm) ||
        listing.tagline.toLowerCase().includes(lowercasedSearchTerm)
      );
    }

    // Sorting
    const sortedResult = [...result]; // Create a copy to avoid mutating the original array
    switch (sortOption) {
      case 'price-desc':
        sortedResult.sort((a, b) => b.price - a.price);
        break;
      case 'price-asc':
        sortedResult.sort((a, b) => a.price - b.price);
        break;
      case 'mrr-desc':
        sortedResult.sort((a, b) => b.mrr - a.mrr);
        break;
      case 'users-desc':
        sortedResult.sort((a, b) => b.users - b.users);
        break;
      default:
        break;
    }

    return sortedResult;
  }, [listings, searchTerm, activeCategory, sortOption]);

  return (
    <div className="space-y-12 pb-28">
      <div className="text-center">
        <h1 className="text-5xl font-bold font-serif text-content-100 tracking-tight">Marketplace</h1>
        <p className="mt-2 text-lg text-content-200">Discover your next profitable venture.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <Filters 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            sortOption={sortOption}
            onSortChange={setSortOption}
            categories={filterCategories}
          />
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array(6).fill(0).map((_, index) => (
                <StartupCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredAndSortedListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredAndSortedListings.map(listing => (
                <StartupCard key={listing.id} listing={listing} onViewDetails={onViewDetails} />
              ))}
            </div>
          ) : (
            <p className="text-center text-content-200 py-16">No listings match your criteria.</p>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1 lg:sticky top-28 self-start hidden lg:block">
            <div className="bg-base-200 p-6 rounded-2xl border border-base-300 space-y-6">
                <div>
                    <h3 className="text-lg font-bold font-serif text-content-100">Recent Listings</h3>
                    <p className="text-sm text-content-200">The latest startups added to the marketplace.</p>
                </div>

                {isLoading ? (
                    <div className="space-y-3 animate-pulse">
                        {Array(5).fill(0).map((_, i) => (
                           <div key={i} className="flex items-center space-x-3">
                               <div className="h-10 w-10 bg-base-300 rounded-lg"></div>
                               <div className="space-y-1.5 flex-1">
                                   <div className="h-3 bg-base-300 rounded w-3/4"></div>
                                   <div className="h-2 bg-base-300 rounded w-1/2"></div>
                               </div>
                           </div>
                        ))}
                    </div>
                ) : recentListings.length > 0 ? (
                    <div className="space-y-3">
                        {recentListings.map(listing => (
                            <SpotlightCard key={listing.id} listing={listing} onViewDetails={onViewDetails} />
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-content-200 text-center py-8">No recent listings found.</p>
                )}
            </div>
        </aside>
      </div>

      {sponsoredListings.length > 0 && (
        <SponsoredBanner listings={sponsoredListings} onViewDetails={onViewDetails} />
      )}
    </div>
  );
};

export default ListingsPage;

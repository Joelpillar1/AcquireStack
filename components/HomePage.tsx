
import React from 'react';
import type { StartupListing } from '../types';
import { Page } from '../types';
import StartupCard from './StartupCard';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import StartupCardSkeleton from './StartupCardSkeleton';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onViewDetails: (listing: StartupListing) => void;
  featuredListings: StartupListing[];
  isLoading: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onViewDetails, featuredListings, isLoading }) => {
  return (
    <div className="space-y-24">
      <div className="relative text-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          <ul className="circles">
            <li></li>
            <li className="shape-ring"></li>
            <li></li>
            <li></li>
            <li></li>
            <li className="shape-ring"></li>
            <li></li>
            <li className="shape-ring"></li>
            <li></li>
            <li></li>
            <li className="shape-ring"></li>
            <li></li>
            <li></li>
            <li className="shape-ring"></li>
            <li></li>
          </ul>
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-base-100 via-base-100/90 to-base-100"></div>

        <div className="relative z-10">
          <h1 
            className="text-6xl md:text-8xl font-bold font-serif text-content-100 tracking-tighter leading-tight animate-fade-in-up"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            The Future of Acquisition.
          </h1>
          <p 
            className="mt-6 max-w-2xl mx-auto text-lg text-content-200 animate-fade-in-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            A curated marketplace for the best bootstrapped startups, side-projects, and SaaS businesses.
          </p>
          <div 
            className="mt-10 animate-fade-in-up"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            <button
              onClick={() => onNavigate(Page.Listings)}
              className="flex items-center space-x-2 bg-brand-primary text-white px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-transform hover:scale-105 text-lg mx-auto"
            >
              <span>Explore Marketplace</span>
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-4xl font-bold font-serif text-content-100 text-center mb-12 tracking-tight">Featured Ventures</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array(3).fill(0).map((_, index) => <StartupCardSkeleton key={index} />)
          ) : (
            featuredListings.map(listing => (
              <StartupCard key={listing.id} listing={listing} onViewDetails={onViewDetails} />
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
          opacity: 0; 
        }
        
        .circles{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }

        .circles li{
            position: absolute;
            display: block;
            list-style: none;
            width: 20px;
            height: 20px;
            background: rgba(253, 92, 11, 0.15);
            animation: animate-shapes 25s linear infinite;
            bottom: -150px;
        }
        
        .circles li.shape-ring {
            background: transparent;
            border: 2px solid rgba(253, 92, 11, 0.15);
        }

        .circles li:nth-child(1){ left: 25%; width: 80px; height: 80px; animation-delay: 0s; }
        .circles li:nth-child(2){ left: 10%; width: 20px; height: 20px; animation-delay: 2s; animation-duration: 12s; }
        .circles li:nth-child(3){ left: 70%; width: 20px; height: 20px; animation-delay: 4s; }
        .circles li:nth-child(4){ left: 40%; width: 60px; height: 80px; animation-delay: 0s; animation-duration: 18s; }
        .circles li:nth-child(5){ left: 65%; width: 20px; height: 20px; animation-delay: 0s; }
        .circles li:nth-child(6){ left: 75%; width: 110px; height: 110px; animation-delay: 3s; }
        .circles li:nth-child(7){ left: 35%; width: 150px; height: 100px; animation-delay: 7s; }
        .circles li:nth-child(8){ left: 50%; width: 25px; height: 25px; animation-delay: 15s; animation-duration: 45s; }
        .circles li:nth-child(9){ left: 20%; width: 15px; height: 15px; animation-delay: 2s; animation-duration: 35s; }
        .circles li:nth-child(10){ left: 85%; width: 150px; height: 150px; animation-delay: 0s; animation-duration: 11s; }
        .circles li:nth-child(11){ left: 15%; width: 40px; height: 40px; animation-delay: 5s; animation-duration: 22s; }
        .circles li:nth-child(12){ left: 55%; width: 20px; height: 30px; animation-delay: 8s; animation-duration: 25s; }
        .circles li:nth-child(13){ left: 80%; width: 50px; height: 50px; animation-delay: 12s; animation-duration: 15s; }
        .circles li:nth-child(14){ left: 5%; width: 100px; height: 100px; animation-delay: 1s; animation-duration: 20s; }
        .circles li:nth-child(15){ left: 90%; width: 30px; height: 30px; animation-delay: 6s; animation-duration: 30s; }


        @keyframes animate-shapes {
            0%{
                transform: translateY(0) rotate(0deg);
                opacity: 1;
                border-radius: 0;
            }
            100%{
                transform: translateY(-1000px) rotate(720deg);
                opacity: 0;
                border-radius: 50%;
            }
        }
      `}</style>
    </div>
  );
};

export default HomePage;

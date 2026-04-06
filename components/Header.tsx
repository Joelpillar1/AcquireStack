
import React, { useState } from 'react';
import { Page, User } from '../types';
import { LogoIcon } from './icons/LogoIcon';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, user, onLogin, onLogout }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="bg-base-100/80 backdrop-blur-sm sticky top-0 z-50 border-b border-base-300">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <button onClick={() => onNavigate(Page.Home)} className="flex items-center space-x-3 group">
              <LogoIcon className="h-8 w-8" />
              <span className="text-2xl font-bold font-serif text-content-100 tracking-tighter group-hover:text-brand-primary transition-colors">
                AcquireStack
              </span>
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate(Page.Listings)}
              className="text-content-200 hover:text-content-100 text-sm font-medium transition-colors"
            >
              Marketplace
            </button>
            <button
              onClick={() => onNavigate(Page.ListStartup)}
              className="text-content-200 hover:text-content-100 text-sm font-medium transition-colors"
            >
              Sell Your Startup
            </button>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="h-8 w-8 rounded-full border border-base-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-sm font-medium text-content-100 hidden lg:block">{user.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-base-200 rounded-xl shadow-lg border border-base-300 py-2 z-50">
                    <div className="px-4 py-2 border-b border-base-300 mb-1">
                      <p className="text-xs text-content-200 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-base-100 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

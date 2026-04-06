
import React, { useState, useEffect, useCallback } from 'react';
import type { StartupListing, User } from './types';
import { Page } from './types';
import { generateStartupListings, generateSponsoredListings } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ListingsPage from './components/ListingsPage';
import ListingDetail from './components/ListingDetail';
import ListStartupForm from './components/ListStartupForm';
import OfferModal from './components/OfferModal';
import LoginModal from './components/LoginModal';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [listings, setListings] = useState<StartupListing[]>([]);
  const [sponsoredListings, setSponsoredListings] = useState<StartupListing[]>([]);
  const [selectedListing, setSelectedListing] = useState<StartupListing | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // State for the offer modal
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [offeringForListing, setOfferingForListing] = useState<StartupListing | null>(null);

  // State for the login modal
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingListing, setPendingListing] = useState<StartupListing | null>(null);
  const [hasSkippedLogin, setHasSkippedLogin] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      setUser(data.user);
    } catch (e) {
      console.error('Failed to fetch user:', e);
    }
  }, []);

  const fetchListings = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const minLoadingPromise = new Promise(resolve => setTimeout(resolve, 1500));

    const dataPromise = (async () => {
      try {
        // Make API calls sequentially to avoid rate limiting
        const generatedListings = await generateStartupListings(50);
        setListings(generatedListings);
        
        const generatedSponsored = await generateSponsoredListings(6);
        setSponsoredListings(generatedSponsored);
      } catch (e: any) {
        console.error(e);
        // Provide a more specific error message for quota issues
        const errorMessage = (e?.message?.toLowerCase().includes('quota') || e?.message?.toLowerCase().includes('resource_exhausted'))
          ? 'Failed to generate listings due to API rate limits. Please check your plan and billing details, or try again later.'
          : 'Failed to generate startup listings. Please check your API key and try again.';
        setError(errorMessage);
      }
    })();

    await Promise.all([dataPromise, minLoadingPromise]);
    
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchListings();
    fetchUser();

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        fetchUser();
        setIsLoginModalOpen(false);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [fetchListings, fetchUser]);

  useEffect(() => {
    if (user && pendingListing) {
      handleViewDetails(pendingListing);
      setPendingListing(null);
    }
  }, [user, pendingListing]);

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/auth/google/url');
      const { url } = await response.json();
      window.open(url, 'google_oauth', 'width=500,height=600');
    } catch (e) {
      console.error('Failed to initiate login:', e);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      handleNavigate(Page.Home);
    } catch (e) {
      console.error('Failed to logout:', e);
    }
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setSelectedListing(null);
    window.scrollTo(0, 0);
  };

  const handleViewDetails = (listing: StartupListing) => {
    if (!user && !hasSkippedLogin) {
      setPendingListing(listing);
      setIsLoginModalOpen(true);
      return;
    }
    setSelectedListing(listing);
    setCurrentPage(Page.Details);
    window.scrollTo(0, 0);
  };

  const handleSkipLogin = () => {
    setHasSkippedLogin(true);
    setIsLoginModalOpen(false);
    if (pendingListing) {
      setSelectedListing(pendingListing);
      setCurrentPage(Page.Details);
      setPendingListing(null);
      window.scrollTo(0, 0);
    }
  };

  const handleAddListing = (newListing: Omit<StartupListing, 'id'>) => {
    const listingWithId = { ...newListing, id: Date.now().toString() };
    setListings(prev => [listingWithId, ...prev]);
  };

  // Handlers for the offer modal
  const handleOpenOfferModal = (listing: StartupListing) => {
    setOfferingForListing(listing);
    setIsOfferModalOpen(true);
  };

  const handleCloseOfferModal = () => {
    setIsOfferModalOpen(false);
    setOfferingForListing(null);
  };

  const handleSendOffer = (offerData: { amount: number; name: string; email: string; message: string }) => {
    console.log('Offer Sent:', {
      listingId: offeringForListing?.id,
      listingName: offeringForListing?.name,
      ...offerData,
    });
    // In a real app, this would send data to a backend.
    // The modal will show a success message after this function is called.
  };


  const renderContent = () => {
    if (error) {
        return <div className="text-center py-20 text-red-600 font-medium">{error}</div>;
    }

    switch (currentPage) {
      case Page.Home:
        return <HomePage onNavigate={handleNavigate} featuredListings={listings.slice(0, 3)} onViewDetails={handleViewDetails} isLoading={isLoading} />;
      case Page.Listings:
        return <ListingsPage listings={listings} sponsoredListings={sponsoredListings} onViewDetails={handleViewDetails} isLoading={isLoading} />;
      case Page.Details:
        return selectedListing ? <ListingDetail listing={selectedListing} listings={listings} onBack={() => handleNavigate(Page.Listings)} onMakeOffer={handleOpenOfferModal} onViewDetails={handleViewDetails} /> : <ListingsPage listings={listings} sponsoredListings={sponsoredListings} onViewDetails={handleViewDetails} isLoading={isLoading} />;
      case Page.ListStartup:
        return <ListStartupForm onAddListing={handleAddListing} onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} featuredListings={listings.slice(0, 3)} onViewDetails={handleViewDetails} isLoading={isLoading} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header 
        onNavigate={handleNavigate} 
        user={user} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
      <Footer />
      {isOfferModalOpen && (
        <OfferModal 
            listing={offeringForListing}
            onClose={handleCloseOfferModal}
            onSubmit={handleSendOffer}
        />
      )}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        onSkip={handleSkipLogin}
      />
    </div>
  );
};

export default App;

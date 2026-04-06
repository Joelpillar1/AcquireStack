
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-base-100 border-t border-base-300">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-content-100 font-serif font-bold text-xl tracking-tighter">
            AcquireStack
          </div>
          <div className="text-content-200 text-xs font-bold uppercase tracking-widest opacity-60">
            &copy; {new Date().getFullYear()} AcquireStack. Designed for the bold.
          </div>
          <div className="flex space-x-8 text-xs font-bold uppercase tracking-widest text-content-200">
            <a href="#" className="hover:text-content-100 transition-colors">Privacy</a>
            <a href="#" className="hover:text-content-100 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

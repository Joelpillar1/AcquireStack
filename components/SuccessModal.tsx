
import React from 'react';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XIcon } from './icons/XIcon';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingName: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, listingName }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-content-100/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300"
        onClick={onClose}
    >
      <div 
        className="bg-base-200 rounded-2xl shadow-2xl w-full max-w-md relative border border-base-300 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        style={{ animationFillMode: 'forwards' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-content-200 hover:text-content-100 transition-colors">
            <XIcon className="w-6 h-6" />
        </button>

        <div className="p-8 text-center">
             <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircleIcon className="w-12 h-12 text-green-600"/>
                </div>
             </div>
             <h2 className="text-2xl font-bold font-serif text-content-100">Submission Received!</h2>
             <p className="text-content-200 mt-2 max-w-sm mx-auto">
                Congratulations! Your startup, <span className="font-semibold text-content-100">{listingName}</span>, has been successfully submitted and is now under review. We'll notify you once it's approved and live on the marketplace.
             </p>
             <div className="mt-8">
                 <button onClick={onClose} className="w-full px-8 py-3 rounded-full text-md font-semibold bg-brand-primary text-white hover:opacity-90 transition-opacity">
                    Explore Marketplace
                </button>
             </div>
        </div>
      </div>
       <style>{`
        @keyframes fade-in-scale {
            from {
                transform: scale(0.95);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
        .animate-fade-in-scale {
            animation: fade-in-scale 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SuccessModal;

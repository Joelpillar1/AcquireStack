
import React, { useState, useEffect } from 'react';
import type { StartupListing } from '../types';
import { XIcon } from './icons/XIcon';
import { LogoIcon } from './icons/LogoIcon';

interface OfferModalProps {
  listing: StartupListing | null;
  onClose: () => void;
  onSubmit: (offerData: { amount: number; name: string; email: string; message: string }) => void;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
}

const OfferModal: React.FC<OfferModalProps> = ({ listing, onClose, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({ amount: '', name: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (listing) {
      setAmount(listing.price.toString());
      setIsSubmitted(false); // Reset submission state when a new listing is passed
    }
  }, [listing]);

  if (!listing) return null;

  const validate = () => {
    const newErrors = { amount: '', name: '', email: '' };
    let isValid = true;

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Please enter a valid, positive offer amount.';
      isValid = false;
    }
    if (!name.trim()) {
      newErrors.name = 'Please enter your name.';
      isValid = false;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        amount: Number(amount),
        name,
        email,
        message,
      });
      setIsSubmitted(true);
    }
  };
  
  const handleClose = () => {
    // Reset form state on close
    setAmount(listing.price.toString());
    setName('');
    setEmail('');
    setMessage('');
    setErrors({ amount: '', name: '', email: '' });
    onClose();
  }

  return (
    <div 
        className="fixed inset-0 bg-content-100/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300"
        onClick={handleClose}
    >
      <div 
        className="bg-base-200 rounded-2xl shadow-2xl w-full max-w-lg relative border border-base-300 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        style={{ animationFillMode: 'forwards' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} className="absolute top-4 right-4 text-content-200 hover:text-content-100 transition-colors">
            <XIcon className="w-6 h-6" />
        </button>

        {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
                <div className="p-8">
                    <h2 className="text-2xl font-bold font-serif text-content-100">Make an Offer</h2>
                    <p className="text-content-200 mt-1">Your offer for <span className="font-semibold text-content-100">{listing.name}</span></p>
                </div>
                
                <div className="px-8 pb-8 space-y-4">
                     <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-content-100 mb-1">Offer Amount ($)</label>
                        <input type="number" name="amount" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)}
                            className={`w-full bg-base-100 border rounded-lg p-3 text-content-100 ${errors.amount ? 'border-red-500' : 'border-base-300'}`} />
                         {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                    </div>
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-content-100 mb-1">Your Name</label>
                        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}
                           className={`w-full bg-base-100 border rounded-lg p-3 text-content-100 ${errors.name ? 'border-red-500' : 'border-base-300'}`} />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-content-100 mb-1">Your Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                           className={`w-full bg-base-100 border rounded-lg p-3 text-content-100 ${errors.email ? 'border-red-500' : 'border-base-300'}`} />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                     <div>
                        <label htmlFor="message" className="block text-sm font-medium text-content-100 mb-1">Message to Founder <span className="text-content-200">(Optional)</span></label>
                        <textarea name="message" id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={3}
                           className="w-full bg-base-100 border border-base-300 rounded-lg p-3 text-content-100"></textarea>
                    </div>
                    <p className="text-xs text-content-200 text-center pt-2">This is a non-binding indication of interest. If the founder is interested, they will contact you directly.</p>
                </div>
                
                <div className="bg-base-100/50 p-6 flex justify-end space-x-4 rounded-b-2xl border-t border-base-300">
                    <button type="button" onClick={handleClose} className="px-6 py-2.5 rounded-full text-sm font-semibold bg-base-300 text-content-100 hover:bg-base-300/80 transition-colors">Cancel</button>
                    <button type="submit" className="px-6 py-2.5 rounded-full text-sm font-semibold bg-brand-primary text-white hover:opacity-90 transition-opacity">Send Offer</button>
                </div>
            </form>
        ) : (
            <div className="p-8 text-center">
                 <div className="flex justify-center mb-4">
                    <LogoIcon className="w-16 h-16"/>
                 </div>
                 <h2 className="text-2xl font-bold font-serif text-content-100">Offer Sent!</h2>
                 <p className="text-content-200 mt-2 max-w-sm mx-auto">
                    Your offer of <span className="font-semibold text-content-100">{formatCurrency(Number(amount))}</span> for <span className="font-semibold text-content-100">{listing.name}</span> has been sent. The founder will be in touch with you shortly.
                 </p>
                 <div className="mt-8">
                     <button onClick={handleClose} className="px-8 py-3 rounded-full text-sm font-semibold bg-brand-primary text-white hover:opacity-90 transition-opacity">
                        Close
                    </button>
                 </div>
            </div>
        )}
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

export default OfferModal;

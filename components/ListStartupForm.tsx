
import React, { useState } from 'react';
import type { StartupListing } from '../types';
import { Page } from '../types';
import SuccessModal from './SuccessModal';

interface ListStartupFormProps {
  onAddListing: (listing: Omit<StartupListing, 'id'>) => void;
  onNavigate: (page: Page) => void;
}

const STEPS = [
  { id: 1, name: 'Core Details' },
  { id: 2, name: 'The Narrative' },
  { id: 3, name: 'Financials & Metrics' },
  { id: 4, name: 'Assets & Technology' },
  { id: 5, name: 'About You' },
];

const FormSection: React.FC<{title: string, description: string, children: React.ReactNode}> = ({title, description, children}) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 py-8">
        <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-content-100">{title}</h3>
            <p className="mt-1 text-sm text-content-200">{description}</p>
        </div>
        <div className="md:col-span-2 space-y-6">
            {children}
        </div>
    </div>
)

const InputField: React.FC<{ label: string; name: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; placeholder?: string; required?: boolean; error?: string; }> = ({ label, name, value, onChange, type = "text", placeholder, required = true, error }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-content-100 mb-1">{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`block w-full bg-base-200 border rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm p-3 transition-colors ${error ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500/50' : 'border-base-300'}`}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
);

const TextAreaField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; placeholder?: string; required?: boolean; error?: string }> = ({ label, name, value, onChange, placeholder, required = true, error }) => (
     <div>
        <label htmlFor={name} className="block text-sm font-medium text-content-100 mb-1">{label}</label>
        <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={5}
            className={`block w-full bg-base-200 border rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm p-3 transition-colors ${error ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500/50' : 'border-base-300'}`}
        />
         {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
);

const SelectField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode; required?: boolean; error?: string }> = ({ label, name, value, onChange, children, required = true, error }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-content-100 mb-1">{label}</label>
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={`block w-full bg-base-200 border rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm p-3 appearance-none transition-colors ${error ? 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500/50' : 'border-base-300'}`}
        >
            {children}
        </select>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
);

const Stepper: React.FC<{currentStep: number}> = ({ currentStep }) => (
    <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
            {STEPS.map((step, stepIdx) => (
                <li key={step.name} className={`relative ${stepIdx !== STEPS.length - 1 ? 'pr-8 sm:pr-20' : ''} flex-1`}>
                    {step.id < currentStep ? (
                        <>
                             <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="h-0.5 w-full bg-brand-primary" />
                            </div>
                            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary">
                                <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </>
                    ) : step.id === currentStep ? (
                         <>
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="h-0.5 w-full bg-base-300" />
                            </div>
                            <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-primary bg-base-100">
                                <span className="h-2.5 w-2.5 rounded-full bg-brand-primary" />
                            </div>
                         </>
                    ) : (
                         <>
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="h-0.5 w-full bg-base-300" />
                            </div>
                            <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-base-300 bg-base-100" />
                        </>
                    )}
                </li>
            ))}
        </ol>
    </nav>
);

const ListStartupForm: React.FC<ListStartupFormProps> = ({ onAddListing, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    projectUrl: '',
    twitterUrl: '',
    category: '',
    description: '',
    problem: '',
    solution: '',
    targetAudience: '',
    businessType: '',
    techStack: '',
    mrr: '',
    users: '',
    price: '',
    lifetimeRevenue: '',
    paymentGatewayApiKey: '',
    whatYouGet: '',
    founderName: '',
    founderBio: '',
    founderTwitterUrl: ''
  });

  const categories = ['SaaS', 'AI', 'E-commerce', 'Mobile', 'Web App', 'Fintech', 'HealthTech', 'EdTech', 'Creator Economy', 'Developer Tools', 'Gaming', 'GreenTech', 'Other'];

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear specific error on change
    if (errors[name]) {
        setErrors(prev => ({...prev, [name]: ''}));
    }
  };
  
  const validateStep = () => {
    const newErrors: {[key: string]: string} = {};
    let fieldsToValidate: string[] = [];
    switch(currentStep) {
        case 1:
            fieldsToValidate = ['name', 'tagline', 'projectUrl', 'category', 'description'];
            break;
        case 2:
            fieldsToValidate = ['problem', 'solution', 'targetAudience', 'businessType'];
            break;
        case 3:
            fieldsToValidate = ['mrr', 'users', 'price', 'lifetimeRevenue'];
            break;
        case 4:
            fieldsToValidate = ['whatYouGet', 'techStack'];
            break;
        case 5:
            fieldsToValidate = ['founderName', 'founderBio'];
            break;
        default: break;
    }

    fieldsToValidate.forEach(field => {
        if (!formData[field as keyof typeof formData]?.trim()) {
            newErrors[field] = 'This field is required.';
        }
    });

    if (formData.twitterUrl && !formData.twitterUrl.startsWith('http')) newErrors.twitterUrl = 'Please enter a valid URL.';
    if (formData.founderTwitterUrl && !formData.founderTwitterUrl.startsWith('http')) newErrors.founderTwitterUrl = 'Please enter a valid URL.';

    if (currentStep === 3) {
        if(formData.mrr && (isNaN(Number(formData.mrr)) || Number(formData.mrr) < 0)) newErrors.mrr = 'Must be a positive number.';
        if(formData.users && (isNaN(Number(formData.users)) || Number(formData.users) < 0)) newErrors.users = 'Must be a positive number.';
        if(formData.price && (isNaN(Number(formData.price)) || Number(formData.price) < 0)) newErrors.price = 'Must be a positive number.';
        if(formData.lifetimeRevenue && (isNaN(Number(formData.lifetimeRevenue)) || Number(formData.lifetimeRevenue) < 0)) newErrors.lifetimeRevenue = 'Must be a positive number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < STEPS.length) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep()) return;

    const newListing: Omit<StartupListing, 'id'> = {
        name: formData.name,
        tagline: formData.tagline,
        projectUrl: formData.projectUrl,
        twitterUrl: formData.twitterUrl,
        paymentGatewayApiKey: formData.paymentGatewayApiKey,
        category: formData.category,
        description: formData.description,
        problem: formData.problem,
        solution: formData.solution,
        targetAudience: formData.targetAudience,
        businessType: formData.businessType as 'B2B' | 'B2C',
        techStack: formData.techStack.split(',').map(s => s.trim()),
        mrr: parseInt(formData.mrr, 10) || 0,
        users: parseInt(formData.users, 10) || 0,
        price: parseInt(formData.price, 10) || 0,
        lifetimeRevenue: parseInt(formData.lifetimeRevenue, 10) || 0,
        whatYouGet: formData.whatYouGet.split(',').map(s => s.trim()),
        founder: { 
            name: formData.founderName, 
            bio: formData.founderBio,
            founderTwitterUrl: formData.founderTwitterUrl,
        },
        qna: [],
        mrrVerified: false,
        usersVerified: false,
    };
    onAddListing(newListing);
    setIsSuccessModalOpen(true);
  };
  
  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    onNavigate(Page.Listings);
  };

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold font-serif text-content-100 tracking-tight">List Your Startup</h1>
        <p className="mt-2 text-lg text-content-200">Share your story and financials to attract the perfect buyer.</p>
      </div>
      
      <div className="mb-12 px-4">
        <Stepper currentStep={currentStep} />
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="border-t border-base-300">
            {currentStep === 1 && (
                <FormSection title="Core Details" description="This is the first impression buyers will have. Make it count.">
                    <InputField label="Startup Name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., AI Meeting Scribe" error={errors.name} />
                    <InputField label="Tagline" name="tagline" value={formData.tagline} onChange={handleChange} placeholder="A short, catchy one-liner." error={errors.tagline} />
                    <InputField label="Project URL" name="projectUrl" value={formData.projectUrl} onChange={handleChange} placeholder="https://example.com" type="url" error={errors.projectUrl} />
                    <InputField label="Twitter URL (Optional)" name="twitterUrl" value={formData.twitterUrl} onChange={handleChange} placeholder="https://x.com/yourstartup" type="url" required={false} error={errors.twitterUrl} />
                    <SelectField label="Category" name="category" value={formData.category} onChange={handleChange} error={errors.category}>
                        <option value="" disabled>Select a category</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </SelectField>
                    <TextAreaField label="Full Description" name="description" value={formData.description} onChange={handleChange} placeholder="Describe what your startup does in detail." error={errors.description} />
                </FormSection>
            )}

            {currentStep === 2 && (
                <FormSection title="The Narrative" description="Help buyers understand the 'why' behind your business.">
                    <TextAreaField label="Problem" name="problem" value={formData.problem} onChange={handleChange} placeholder="What specific problem does your startup solve?" error={errors.problem} />
                    <TextAreaField label="Solution" name="solution" value={formData.solution} onChange={handleChange} placeholder="How does your startup solve this problem uniquely?" error={errors.solution} />
                    <TextAreaField label="Target Audience" name="targetAudience" value={formData.targetAudience} onChange={handleChange} placeholder="e.g., Freelance designers, small e-commerce stores" error={errors.targetAudience} />
                    <SelectField label="Business Type" name="businessType" value={formData.businessType} onChange={handleChange} error={errors.businessType}>
                        <option value="" disabled>Select a business type</option>
                        <option value="B2B">B2B (Business-to-Business)</option>
                        <option value="B2C">B2C (Business-to-Consumer)</option>
                    </SelectField>
                </FormSection>
            )}

            {currentStep === 3 && (
                <FormSection title="Financials & Metrics" description="Provide key metrics. Honesty and accuracy are crucial here.">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="MRR ($)" name="mrr" value={formData.mrr} onChange={handleChange} type="number" placeholder="2500" error={errors.mrr} />
                        <InputField label="Lifetime Revenue ($)" name="lifetimeRevenue" value={formData.lifetimeRevenue} onChange={handleChange} type="number" placeholder="15000" error={errors.lifetimeRevenue} />
                        <InputField label="Users" name="users" value={formData.users} onChange={handleChange} type="number" placeholder="150" error={errors.users} />
                        <InputField label="Asking Price ($)" name="price" value={formData.price} onChange={handleChange} type="number" placeholder="75000" error={errors.price} />
                    </div>
                    <div>
                        <InputField label="Payment Gateway API Key (Read-only, Optional)" name="paymentGatewayApiKey" value={formData.paymentGatewayApiKey} onChange={handleChange} type="password" placeholder="pk_live_xxxxxxxxxx" required={false} error={errors.paymentGatewayApiKey} />
                        <p className="text-xs text-content-200 mt-1">Provide a read-only key from Stripe, etc., to verify revenue. For demo purposes only; this is not stored securely.</p>
                    </div>
                </FormSection>
            )}

            {currentStep === 4 && (
                <FormSection title="Assets & Technology" description="List what the buyer will receive and the technology that powers your startup.">
                    <InputField label="What's Included (comma-separated)" name="whatYouGet" value={formData.whatYouGet} onChange={handleChange} placeholder="Domain, Source Code, Customer List" error={errors.whatYouGet} />
                    <InputField label="Tech Stack (comma-separated)" name="techStack" value={formData.techStack} onChange={handleChange} placeholder="React, Node.js, Python" error={errors.techStack} />
                </FormSection>
            )}

            {currentStep === 5 && (
                <FormSection title="About You" description="Share a bit about yourself. Buyers want to know who is behind the business.">
                    <InputField label="Your Name" name="founderName" value={formData.founderName} onChange={handleChange} placeholder="e.g., Jane Doe" error={errors.founderName} />
                    <TextAreaField label="Your Bio" name="founderBio" value={formData.founderBio} onChange={handleChange} placeholder="A short bio about your experience and background." error={errors.founderBio} />
                    <InputField label="Your Twitter URL (Optional)" name="founderTwitterUrl" value={formData.founderTwitterUrl} onChange={handleChange} placeholder="https://x.com/yourprofile" type="url" required={false} error={errors.founderTwitterUrl} />
                </FormSection>
            )}
        </div>
        
        <div className="pt-8 flex justify-between items-center">
             {currentStep > 1 ? (
                <button 
                    type="button" 
                    onClick={handleBack}
                    className="bg-base-300 text-content-100 font-bold py-3 px-8 rounded-full hover:bg-base-300/80 transition-opacity text-lg"
                >
                    Back
                </button>
             ) : <div></div>}

             {currentStep < STEPS.length ? (
                <button 
                    type="button" 
                    onClick={handleNext}
                    className="bg-brand-primary text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity text-lg"
                >
                    Next
                </button>
             ) : (
                <button 
                    type="submit" 
                    className="bg-brand-primary text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity text-lg"
                >
                    Submit Listing
                </button>
             )}
        </div>
      </form>
      <SuccessModal 
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        listingName={formData.name}
      />
    </div>
  );
};

export default ListStartupForm;

import React from 'react';
import { motion } from 'motion/react';
import type { StartupListing } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { DomainIcon } from './icons/DomainIcon';
import { CodeIcon } from './icons/CodeIcon';
import { UsersIcon } from './icons/UsersIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import RelatedListingCard from './RelatedListingCard';
import { TwitterIcon } from './icons/TwitterIcon';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { DollarSignIcon } from './icons/DollarSignIcon';
import { BriefcaseIcon } from './icons/BriefcaseIcon';

interface ListingDetailProps {
  listing: StartupListing;
  listings: StartupListing[];
  onBack: () => void;
  onMakeOffer: (listing: StartupListing) => void;
  onViewDetails: (listing: StartupListing) => void;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD', 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(amount);
}

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="mb-8">
    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-primary mb-2">{title}</h3>
    <div className="h-px w-12 bg-brand-primary/30" />
  </div>
);

const MetricCard: React.FC<{ label: string, value: string | number, verified?: boolean, icon?: React.ReactNode }> = ({ label, value, verified, icon }) => (
  <div className="group">
    <div className="flex items-center space-x-2 mb-1">
      <span className="text-[10px] font-bold uppercase tracking-widest text-content-200">{label}</span>
      {verified && (
        <ShieldCheckIcon className="h-3 w-3 text-green-500" />
      )}
    </div>
    <div className="flex items-baseline space-x-2">
      <span className="text-2xl font-bold text-content-100 tracking-tight">{value}</span>
    </div>
  </div>
);

const AssetBadge: React.FC<{ icon: React.ReactNode, name: string }> = ({ icon, name }) => (
  <div className="flex items-center space-x-3 bg-base-200/50 border border-base-300/50 p-4 rounded-2xl hover:bg-base-200 transition-colors">
    <div className="text-content-200">{icon}</div>
    <span className="text-sm font-semibold text-content-100">{name}</span>
  </div>
);

const ListingDetail: React.FC<ListingDetailProps> = ({ listing, listings, onBack, onMakeOffer, onViewDetails }) => {
  const assetIcons: { [key: string]: React.ReactNode } = {
    'domain': <DomainIcon className="h-5 w-5" />,
    'code': <CodeIcon className="h-5 w-5" />,
    'customer': <UsersIcon className="h-5 w-5" />,
  }

  const getAssetIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('domain')) return assetIcons['domain'];
    if (lowerName.includes('code') || lowerName.includes('repository')) return assetIcons['code'];
    if (lowerName.includes('customer') || lowerName.includes('user')) return assetIcons['customer'];
    return assetIcons['domain'];
  }

  const relatedListings = listings
    .filter(l => l.id !== listing.id && l.category === listing.category)
    .slice(0, 4);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto pb-24"
    >
      {/* Navigation */}
      <button 
        onClick={onBack} 
        className="group mb-12 flex items-center space-x-2 text-content-200 hover:text-content-100 transition-colors"
      >
        <ChevronLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold uppercase tracking-widest">Back to Marketplace</span>
      </button>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {listing.category}
              </span>
              <span className="bg-content-100/5 text-content-100 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                {listing.businessType}
              </span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl font-bold font-serif text-content-100 tracking-tighter leading-[0.9] mb-6">
              {listing.name}
            </h1>
            <p className="text-xl sm:text-2xl text-content-200 font-medium leading-relaxed max-w-2xl">
              {listing.tagline}
            </p>
          </motion.div>

          {/* Key Metrics Grid */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-12 my-12 border-y border-base-300"
          >
            <MetricCard label="Asking Price" value={formatCurrency(listing.price)} />
            <MetricCard label="Monthly Revenue" value={formatCurrency(listing.mrr)} verified={listing.mrrVerified} />
            <MetricCard label="Lifetime Revenue" value={formatCurrency(listing.lifetimeRevenue)} />
            <MetricCard label="Active Users" value={listing.users.toLocaleString()} verified={listing.usersVerified} />
          </motion.div>

          {/* Main Content Sections */}
          <div className="space-y-20">
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <SectionHeader title="The Vision" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-content-100">The Problem</h4>
                  <p className="text-content-200 leading-relaxed">{listing.problem}</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-content-100">The Solution</h4>
                  <p className="text-content-200 leading-relaxed">{listing.solution}</p>
                </div>
              </div>
              <div className="mt-12 space-y-4">
                <h4 className="text-lg font-bold text-content-100">Business Summary</h4>
                <p className="text-content-200 leading-relaxed text-lg">{listing.description}</p>
              </div>
            </motion.section>

            <motion.section
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <SectionHeader title="Founder Insights" />
              <div className="space-y-8">
                {listing.qna.map((item, index) => (
                  <div key={index} className="bg-base-200/30 p-8 rounded-3xl border border-base-300/50">
                    <h4 className="text-lg font-bold text-content-100 mb-3 italic">"{item.question}"</h4>
                    <p className="text-content-200 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <SectionHeader title="Technical Foundation" />
              <div className="flex flex-wrap gap-3">
                {listing.techStack.map((tech, index) => (
                  <span key={index} className="bg-base-200 text-content-100 px-5 py-2 rounded-xl text-sm font-bold border border-base-300">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <SectionHeader title="Assets Included" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {listing.whatYouGet.map((item, index) => (
                  <AssetBadge key={index} icon={getAssetIcon(item)} name={item} />
                ))}
              </div>
            </motion.section>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="lg:col-span-4">
          <div className="lg:sticky top-32 space-y-6">
            <div className="bg-content-100 text-base-200 p-8 rounded-[2.5rem] shadow-2xl shadow-content-100/20">
              <div className="mb-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Acquisition Price</span>
                <div className="text-4xl font-bold mt-1 tracking-tighter">{formatCurrency(listing.price)}</div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => onMakeOffer(listing)}
                  className="w-full bg-brand-primary text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-brand-primary/20"
                >
                  Make an Offer
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  {listing.projectUrl && (
                    <a
                      href={listing.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-base-200/10 hover:bg-base-200/20 py-4 rounded-2xl transition-colors border border-base-200/20"
                    >
                      <BriefcaseIcon className="h-4 w-4" />
                      <span className="text-sm font-bold">Live Site</span>
                    </a>
                  )}
                  {listing.twitterUrl && (
                    <a
                      href={listing.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-base-200/10 hover:bg-base-200/20 py-4 rounded-2xl transition-colors border border-base-200/20"
                    >
                      <TwitterIcon className="h-4 w-4" />
                      <span className="text-sm font-bold">Twitter</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-base-200/10">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-primary to-orange-400 flex items-center justify-center text-xl font-bold">
                    {listing.founder.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{listing.founder.name}</div>
                    <div className="text-[10px] uppercase tracking-widest opacity-60">Founder</div>
                  </div>
                </div>
                <p className="text-xs mt-4 leading-relaxed opacity-70">
                  {listing.founder.bio}
                </p>
              </div>
            </div>

            <div className="p-8 bg-base-200/50 rounded-[2.5rem] border border-base-300/50">
              <h4 className="text-sm font-bold uppercase tracking-widest text-content-100 mb-4">Due Diligence</h4>
              <ul className="space-y-4">
                {[
                  'Verified Financial Statements',
                  'Source Code Review',
                  'Analytics Access',
                  'Customer List Verification'
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-xs font-medium text-content-200">
                    <CheckCircleIcon className="h-4 w-4 text-brand-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Listings */}
      {relatedListings.length > 0 && (
        <div className="mt-32 pt-20 border-t border-base-300">
          <SectionHeader title="Similar Opportunities" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedListings.map(related => (
              <RelatedListingCard key={related.id} listing={related} onViewDetails={onViewDetails} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ListingDetail;

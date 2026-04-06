
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface FilterButtonProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ children, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
      isActive 
        ? 'bg-content-100 text-base-200' 
        : 'bg-base-200 text-content-100 hover:bg-base-300/50'
    }`}
  >
    {children}
  </button>
);

interface ArrowButtonProps {
  onClick: () => void;
  direction: 'left' | 'right';
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ onClick, direction }) => (
    <button onClick={onClick} className="p-1 rounded-full bg-base-300/70 hover:bg-base-300 transition-colors flex-shrink-0 z-10">
      {direction === 'left' ? <ChevronLeftIcon className="h-5 w-5 text-content-100" /> : <ChevronRightIcon className="h-5 w-5 text-content-100" />}
    </button>
);

interface FiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  sortOption: string;
  onSortChange: (option: string) => void;
  categories: string[];
}

const Filters: React.FC<FiltersProps> = ({
  searchTerm,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  categories,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // This function is now more robust to handle sub-pixel rendering and edge cases.
  const checkArrows = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const tolerance = 1; // 1px tolerance for calculations
      const hasOverflow = el.scrollWidth > el.clientWidth + tolerance;
      
      setShowLeftArrow(el.scrollLeft > tolerance);

      const isScrolledToEnd = el.scrollLeft >= (el.scrollWidth - el.clientWidth - tolerance);
      setShowRightArrow(hasOverflow && !isScrolledToEnd);
    }
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    // A small delay can help ensure all styles and dimensions are settled before the first check.
    const timeoutId = setTimeout(() => {
        if (el) {
            checkArrows();
            el.addEventListener('scroll', checkArrows);
            window.addEventListener('resize', checkArrows);
        }
    }, 100);

    return () => {
        clearTimeout(timeoutId);
        if (el) {
            el.removeEventListener('scroll', checkArrows);
            window.removeEventListener('resize', checkArrows);
        }
    };
  }, [categories, checkArrows]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.8;
      el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-base-200 p-3 rounded-2xl shadow-sm border border-base-300/80">
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="relative w-full lg:max-w-xs xl:max-w-sm">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-content-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text"
            placeholder="Search by name or keyword..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-base-200 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-sm placeholder-content-200"
          />
        </div>
        
        <div className="w-full lg:flex-1 flex items-center gap-2 min-w-0">
          {showLeftArrow && <ArrowButton direction="left" onClick={() => handleScroll('left')} />}
          <div className="flex-1 overflow-hidden">
            <div
              ref={scrollContainerRef}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar"
              style={{ scrollBehavior: 'smooth' }}
            >
              {categories.map((category) => (
                <FilterButton 
                  key={category} 
                  isActive={activeCategory === category}
                  onClick={() => onCategoryChange(category)}
                >
                  {category}
                </FilterButton>
              ))}
            </div>
          </div>
          {showRightArrow && <ArrowButton direction="right" onClick={() => handleScroll('right')} />}
        </div>

        <div className="w-full lg:w-auto">
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full lg:w-auto bg-base-200 border border-base-300 rounded-lg text-sm font-medium text-content-100 focus:ring-brand-primary focus:border-brand-primary p-3 appearance-none"
            aria-label="Sort listings"
          >
            <option value="default">Sort by Relevance</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="mrr-desc">MRR: High to Low</option>
            <option value="users-desc">Users: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
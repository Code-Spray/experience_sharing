import { Search } from 'lucide-react';
import { CATEGORY_OPTIONS } from '../../../../serveses/categoryConfig.js';
import './FilterBar.css';

export function FilterBar({ activeCategory, onCategoryChange, searchQuery, onSearchChange }) {
  return (
    <div className="filter-bar">
      <div className="category-tabs" role="tablist" aria-label="تصنيفات التجارب">
        {CATEGORY_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={activeCategory === option.id}
            className={`category-tab ${activeCategory === option.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="search-box">
        <Search size={17} className="search-icon" aria-hidden="true" />
        <input
          type="search"
          className="search-input"
          placeholder="ابحث عن كورس، مجال، أو تجربة..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="بحث في التجارب"
        />
      </div>
    </div>
  );
}

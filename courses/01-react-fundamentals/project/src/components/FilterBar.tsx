import React from 'react';

type FilterOption = 'all' | 'active' | 'completed';

interface FilterBarProps {
  filter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  sortOption?: string;
  onSortChange?: (sort: string) => void;
}

function FilterBar({ filter, onFilterChange, sortOption, onSortChange }: FilterBarProps) {
  return (
    <div id="filter-bar">
      <button
        onClick={() => onFilterChange('all')}
        data-active={filter === 'all' ? 'true' : 'false'}
        className={filter === 'all' ? 'active' : ''}
      >
        All
      </button>
      <button
        onClick={() => onFilterChange('active')}
        data-active={filter === 'active' ? 'true' : 'false'}
        className={filter === 'active' ? 'active' : ''}
      >
        Active
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        data-active={filter === 'completed' ? 'true' : 'false'}
        className={filter === 'completed' ? 'active' : ''}
      >
        Completed
      </button>
      {onSortChange && (
        <select
          id="sort-order"
          value={sortOption ?? ''}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="">Recently Added</option>
          <option value="priority-high-low">Priority: High to Low</option>
          <option value="priority-low-high">Priority: Low to High</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      )}
    </div>
  );
}

export default FilterBar;
// src/components/SearchBar.jsx
export default function SearchBar({ search, setSearch, filter, setFilter }) {
  const propertyTypes = ['All', 'Villa', 'Apartment', 'Independent House', 'Row House', 'Bungalow', 'Studio'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-5 mb-10 relative z-10">
      <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-card dark:shadow-card-dark p-4 sm:p-5
                      border border-gray-100 dark:border-navy-700 flex flex-col sm:flex-row gap-3">

        {/* Search input */}
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            id="search-input"
            type="text"
            placeholder="Search by owner, location, or title…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm
                       bg-gray-50 dark:bg-navy-900 border border-gray-200 dark:border-navy-600
                       text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent
                       transition-all duration-200"
          />
        </div>

        {/* Property type filter */}
        <div className="relative">
          <select
            id="property-type-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none w-full sm:w-48 pl-4 pr-9 py-2.5 rounded-xl text-sm
                       bg-gray-50 dark:bg-navy-900 border border-gray-200 dark:border-navy-600
                       text-gray-800 dark:text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent
                       transition-all duration-200 cursor-pointer"
          >
            {propertyTypes.map((t) => (
              <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Clear button */}
        {(search || filter !== 'All') && (
          <button
            id="clear-filter-btn"
            onClick={() => { setSearch(''); setFilter('All'); }}
            className="px-4 py-2.5 rounded-xl text-sm font-medium
                       bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400
                       hover:bg-red-100 dark:hover:bg-red-900/30
                       transition-all duration-200 whitespace-nowrap"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

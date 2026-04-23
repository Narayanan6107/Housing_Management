// src/components/HouseGrid.jsx
import HouseCard from './HouseCard';

/* ── Loading skeleton ─────────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-navy-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-navy-700 animate-pulse">
      <div className="aspect-[16/10] bg-gray-200 dark:bg-navy-700" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-navy-700 rounded-full w-3/4" />
        <div className="h-3 bg-gray-100 dark:bg-navy-600 rounded-full w-1/2" />
        <div className="h-3 bg-gray-100 dark:bg-navy-600 rounded-full w-2/3" />
        <div className="flex gap-2 mt-4">
          <div className="h-7 bg-gray-200 dark:bg-navy-700 rounded-lg w-24" />
          <div className="h-7 bg-gray-200 dark:bg-navy-700 rounded-lg w-24" />
        </div>
      </div>
    </div>
  );
}

/* ── Empty state ──────────────────────────────────────────────────────────── */
function EmptyState({ search }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-navy-800 flex items-center justify-center mb-5">
        <svg className="w-10 h-10 text-gray-300 dark:text-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No properties found</h3>
      <p className="text-sm text-gray-400 dark:text-gray-500">
        {search ? `No results for "${search}". Try a different search.` : 'No listings available right now.'}
      </p>
    </div>
  );
}

/* ── Main Grid ────────────────────────────────────────────────────────────── */
export default function HouseGrid({ houses, loading, error, search, isAdmin, onEdit, onDelete, onCardClick }) {
  return (
    <section id="listings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 mt-6">
      {/* Error banner */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium flex items-center justify-center gap-2 border border-red-100 dark:border-red-900/30">
          <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error} &mdash; Showing demo data instead.
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : houses.length === 0
            ? <EmptyState search={search} />
            : houses.map((house) => (
                <HouseCard 
                  key={house._id} 
                  house={house} 
                  isAdmin={isAdmin} 
                  onEdit={onEdit} 
                  onDelete={onDelete} 
                  onCardClick={onCardClick}
                />
              ))
        }
      </div>
    </section>
  );
}

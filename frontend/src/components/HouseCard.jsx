export default function HouseCard({ house, isAdmin, onEdit, onDelete, onCardClick }) {
  const {
    loanNo, address, locationUrl, imageUrls, videoUrls, phone, email
  } = house;

  const displayImage = imageUrls && imageUrls.length > 0 ? imageUrls[0] : null;
  const imageCount = imageUrls ? imageUrls.length : 0;
  
  const displayVideo = videoUrls && videoUrls.length > 0 ? videoUrls[0] : null;
  const videoCount = videoUrls ? videoUrls.length : 0;

  return (
    <article className="group bg-white dark:bg-navy-800 rounded-2xl overflow-hidden
                        shadow-card dark:shadow-card-dark
                        hover:shadow-card-hover dark:hover:shadow-card-dark-hover
                        border border-gray-100 dark:border-navy-700
                        transition-all duration-300 hover:-translate-y-1 flex flex-col relative w-full h-full">

      {/* ── Image Header ─────────────────────────────────────────────────── */}
      <div 
        className="relative w-full h-[220px] overflow-hidden shrink-0 cursor-pointer bg-gray-100 dark:bg-navy-900 flex items-center justify-center"
        onClick={() => onCardClick?.(house)}
      >
        {displayImage ? (
          <img
            src={displayImage}
            alt={`Property in ${address}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        ) : (
          <svg className="w-12 h-12 text-gray-300 dark:text-navy-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent pointer-events-none" />

        {/* Media Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
           {imageCount > 1 && (
              <span className="px-2.5 py-1 rounded-full bg-navy-900/80 text-white text-[11px] font-semibold backdrop-blur-sm border border-white/10 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {imageCount} Photos
              </span>
           )}
        </div>

        {/* ── Admin Controls Overlay ─────────────────────────────────────── */}
        {isAdmin && (
          <div className="absolute top-3 right-3 flex gap-2">
           <button onClick={(e) => { e.stopPropagation(); onEdit(house); }} className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-gold-50 hover:text-gold-600 transition-all shadow-md flex items-center justify-center p-0 m-0 z-10" title="Edit Property">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
           </button>
           <button onClick={(e) => { e.stopPropagation(); onDelete(house._id); }} className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-red-500 hover:bg-red-50 hover:text-red-600 transition-all shadow-md flex items-center justify-center p-0 m-0 z-10" title="Delete Property">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
           </button>
          </div>
        )}

        {/* Video link button on Image */}
        {displayVideo && (
          <a
            href={displayVideo} target="_blank" rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-red-500 hover:border-red-500 transition-all duration-200 hover:scale-110 shadow-lg group-hover:animate-pulse"
            title={`Watch ${videoCount > 1 ? videoCount : 'Video'} Tour${videoCount > 1 ? 's' : ''}`}
          >
            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </a>
        )}
      </div>

      {/* ── Card Details ───────────────────────────────────────────────────── */}
      <div className="p-5 flex flex-col flex-1 h-full max-h-full justify-between">
        <div className="flex flex-col h-full gap-2 overflow-hidden">
          {/* Admin specific: Loan Number */}
          {isAdmin && loanNo && (
            <div className="flex items-center gap-2 mb-2 shrink-0 text-sm text-gold-600 dark:text-gold-400 font-bold bg-gold-50 dark:bg-gold-500/10 w-fit px-2.5 py-1 rounded-md">
              <span className="opacity-80 font-semibold text-xs tracking-wide uppercase">Loan No</span>
              <span className="font-mono tracking-wider">{loanNo}</span>
            </div>
          )}

          {/* Address lines - Scrollable if long */}
          <div className="flex-1 overflow-y-auto pr-1 text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed custom-scrollbar relative">
             <div className="flex items-start gap-1">
               <svg className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
               <span>{address}</span>
             </div>
          </div>
          
          {locationUrl && (
             <a href={locationUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-navy-500 dark:text-navy-400 hover:text-gold-500 hover:underline font-semibold flex items-center gap-1 w-fit shrink-0 mt-1">
               Open Map <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
             </a>
          )}
        </div>

        {/* ── Contact Row ──────────────────────────────────────────────── */}
        <div className="border-t border-gray-100 dark:border-navy-700/50 pt-3 mt-3 shrink-0 flex items-center justify-between gap-2">
          {/* Phone */}
          <a
            href={`tel:${phone}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-navy-50 dark:bg-navy-900 text-navy-700 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-800 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
            <span className="truncate max-w-[80px] sm:max-w-none">{phone}</span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-gold-50 dark:bg-gold-500/10 text-gold-700 dark:text-gold-400 hover:bg-gold-100 dark:hover:bg-gold-500/20 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
            <span className="truncate max-w-[80px] sm:max-w-none">Email</span>
          </a>
        </div>
      </div>
    </article>
  );
}

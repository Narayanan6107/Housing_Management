import { useState } from 'react';

export default function HouseDetailsModal({ house, isOpen, onClose, isAdmin }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen || !house) return null;

  const { street, city, district, state, address, locationUrl, imageUrls, videoUrls, phone, email, loanNo } = house;
  const fullAddress = street ? `${street}, ${city}, ${district}, ${state}` : address;
  
  // Safe filtering just in case there are empty strings
  const images = imageUrls?.filter(u => u.trim() !== '') || [];
  const videos = videoUrls?.filter(u => u.trim() !== '') || [];

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Only allow clicking outside to close
  const handleBackdropClick = (e) => {
    if (e.target.id === 'modal-backdrop') {
      onClose();
    }
  };

  return (
    <div 
      id="modal-backdrop"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-navy-950/80 backdrop-blur-md animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-navy-900 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-slide-up border border-white/20 dark:border-navy-700">
        
        {/* Header Options */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          {locationUrl && (
            <a 
               href={locationUrl} target="_blank" rel="noopener noreferrer"
               className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white flex items-center justify-center transition-all shadow-lg"
               title="Open Location in Google Maps"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </a>
          )}
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/40 hover:bg-red-500/80 backdrop-blur-md text-white flex items-center justify-center transition-all shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* ── Image Carousel ─────────────────────────────────────────── */}
        <div className="relative w-full h-[40vh] sm:h-[50vh] xl:h-[60vh] bg-navy-950 shrink-0 group flex items-center justify-center">
          {images.length > 0 ? (
            <>
              <img
                src={images[currentSlide]}
                alt={`Property Slide ${currentSlide + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />

              {images.length > 1 && (
                <>
                  {/* Left Arrow */}
                  <button 
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-6 h-6 pr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                  </button>

                  {/* Right Arrow */}
                  <button 
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-6 h-6 pl-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </button>

                  {/* Indicators */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`h-2 rounded-full transition-all ${currentSlide === i ? 'w-8 bg-gold-400' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
             <div className="flex flex-col items-center justify-center text-white/30 gap-4">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-sm font-semibold tracking-wider uppercase">No Media Available</span>
             </div>
          )}
        </div>

        {/* ── Details Panel ─────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar bg-gray-50 dark:bg-navy-900 border-t border-gray-100 dark:border-navy-800">
          
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-snug mb-6">
            {fullAddress}
          </h2>

          <div className="flex flex-col sm:flex-row gap-6">
            {/* Contact Information */}
            <div className="flex-1 space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Contact Details</h3>
              
              <div className="flex flex-col gap-3 border-l-2 border-gold-500 pl-4 py-1">
                <a href={`tel:${phone}`} className="flex items-center gap-3 text-gray-800 dark:text-gray-200 hover:text-gold-600 dark:hover:text-gold-400 font-medium transition-colors w-fit">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-navy-800 flex items-center justify-center text-navy-500 dark:text-navy-300">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  {phone}
                </a>

                <a href={`mailto:${email}`} className="flex items-center gap-3 text-gray-800 dark:text-gray-200 hover:text-gold-600 dark:hover:text-gold-400 font-medium transition-colors w-fit">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-navy-800 flex items-center justify-center text-navy-500 dark:text-navy-300">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  {email}
                </a>
              </div>

              {isAdmin && loanNo && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl flex items-center gap-3 w-fit">
                  <span className="text-red-500 dark:text-red-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-widest leading-none">Admin Only System ID</span>
                    <span className="font-mono font-bold text-gray-900 dark:text-white">{loanNo}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Video Tours (Standard Links) */}
            {videos.length > 0 && (
              <div className="flex-1 space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Videos</h3>
                <div className="flex flex-col gap-3">
                  {videos.map((url, idx) => (
                    <a 
                      key={idx}
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 bg-white dark:bg-navy-800 rounded-2xl shadow-sm border border-gray-100 dark:border-navy-700 hover:border-gold-400 dark:hover:border-gold-500 transition-all hover:shadow-md"
                    >
                      <div className="flex items-center gap-3 text-gray-800 dark:text-gray-200 font-semibold group-hover:text-gold-600 dark:group-hover:text-gold-400">
                        <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-500/10 text-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                           <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                        </div>
                        Watch Video {idx + 1}
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-gold-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

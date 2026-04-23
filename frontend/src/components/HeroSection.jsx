// src/components/HeroSection.jsx
export default function HeroSection({ totalCount }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-700 to-navy-900 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-navy-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 text-gold-300 text-xs font-semibold tracking-widest uppercase mb-6 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse-soft" />
          Trusted Housing Loan Partner
        </span>

        {/* Heading */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 animate-slide-up">
          Find Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
            Dream Home
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in">
          Explore verified property listings and get instant home loan approvals.
          Your perfect home is just a click away.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-center mt-10 animate-fade-in">
          {[
            { value: totalCount || '50+', label: 'Properties Listed' },
            { value: '₹500Cr+', label: 'Loans Disbursed' },
            { value: '98%', label: 'Approval Rate' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-2xl font-bold text-gold-400">{value}</div>
              <div className="text-xs text-gray-400 font-medium mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-8 sm:h-10 fill-gray-50 dark:fill-navy-950">
          <path d="M0,40 C360,0 1080,40 1440,0 L1440,40 Z" />
        </svg>
      </div>
    </section>
  );
}

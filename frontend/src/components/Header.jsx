// src/components/Header.jsx
import { useState } from 'react';

export default function Header({ darkMode, toggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-navy-950/90 border-b border-gray-100 dark:border-navy-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ─────────────────────────────────────────────────── */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-navy-900 dark:text-white leading-tight tracking-tight">
                HavenLoans
              </h1>
              <p className="text-[10px] text-gold-500 font-semibold tracking-widest uppercase -mt-0.5">
                Property Finance
              </p>
            </div>
          </div>

          {/* ── Desktop Nav ───────────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-7">
            {['Listings', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gold-500 dark:hover:text-gold-400 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* ── Actions ───────────────────────────────────────────────── */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              id="dark-mode-toggle"
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className="w-9 h-9 rounded-xl flex items-center justify-center
                         bg-gray-100 dark:bg-navy-800
                         hover:bg-gray-200 dark:hover:bg-navy-700
                         text-gray-600 dark:text-gray-300
                         transition-all duration-200 hover:scale-110 active:scale-95"
            >
              {darkMode ? (
                /* Sun icon */
                <svg className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                /* Moon icon */
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* CTA */}
            <a
              href="tel:+911800000000"
              id="header-cta"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl
                         bg-gradient-to-r from-gold-400 to-gold-500
                         text-white text-sm font-semibold shadow-md
                         hover:from-gold-300 hover:to-gold-400
                         transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Us
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-navy-800"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mobile Nav ────────────────────────────────────────────────── */}
        {menuOpen && (
          <nav className="md:hidden py-3 border-t border-gray-100 dark:border-navy-800 space-y-1">
            {['Listings', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

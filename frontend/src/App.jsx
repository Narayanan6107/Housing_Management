import { useState, useEffect, useMemo } from 'react';
import './App.css';

import HouseGrid from './components/HouseGrid';
import LoginModal from './components/LoginModal';
import HouseFormModal from './components/HouseFormModal';
import HouseDetailsModal from './components/HouseDetailsModal';

import { fetchHouses, createHouse, updateHouse, deleteHouse } from './services/api';
import { sampleHouses } from './data/sampleHouses';

/* ── App ─────────────────────────────────────────────────────────────────── */
const KERALA_DISTRICTS = [
  'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 
  'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 
  'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'
];

export default function App() {
  const [districtFilter, setDistrictFilter] = useState('Thiruvananthapuram');
  // ── Dark mode (default: light) ──────────────────────────────────────────
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('property-theme');
    return saved === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('property-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('property-theme', 'light');
    }
  }, [darkMode]);

  // ── Authentication state ────────────────────────────────────────────────
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('property-admin') === 'true';
  });
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLogin = () => {
    setIsAdmin(true);
    localStorage.setItem('property-admin', 'true');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('property-admin');
  };

  // ── Data fetching ───────────────────────────────────────────────────────
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHouses = async () => {
    setLoading(true);
    try {
      const data = await fetchHouses();
      setHouses(Array.isArray(data) ? data : data.data ?? []);
      setError(null);
    } catch (err) {
      setError('Could not reach backend.');
      setHouses(sampleHouses);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHouses();
  }, []);

  // ── CRUD Operations ─────────────────────────────────────────────────────
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHouse, setEditingHouse] = useState(null);

  const handleCreateNew = () => {
    setEditingHouse(null);
    setIsFormOpen(true);
  };

  const handleEdit = (house) => {
    setEditingHouse(house);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    
    // If backend isn't reachable (using demo data), we just update frontend state for demo purposes
    if (error) {
      setHouses(prev => prev.filter(h => h._id !== id));
      return;
    }

    try {
      await deleteHouse(id);
      loadHouses(); // Refresh data
    } catch (err) {
      alert('Failed to delete property: ' + err.message);
    }
  };

  const handleFormSubmit = async (formData) => {
    if (error) {
       // Demo data fallback mode handling
       if (editingHouse) {
         setHouses(prev => prev.map(h => h._id === editingHouse._id ? { ...formData, _id: h._id } : h));
       } else {
         setHouses(prev => [{ ...formData, _id: Date.now().toString() }, ...prev]);
       }
       return;
    }

    // Real API mode
    if (editingHouse) {
      await updateHouse(editingHouse._id, formData);
    } else {
      await createHouse(formData);
    }
    
    // Automatically switch the home screen filter to the district we just updated
    if (formData.district) {
      setDistrictFilter(formData.district);
    }
    
    loadHouses(); // Refresh data
  };

  // ── Search & filter ─────────────────────────────────────────────────────
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return houses.filter((h) => {
      // District matching: 
      // If a district is selected, it must match.
      // If 'All Districts' is selected, everyone must show.
      const matchesDistrict = !districtFilter || h.district === districtFilter;
      
      const matchesSearch =
        !q ||
        h.loanNo?.toLowerCase().includes(q) ||
        h.street?.toLowerCase().includes(q) ||
        h.city?.toLowerCase().includes(q) ||
        h.district?.toLowerCase().includes(q) ||
        h.address?.toLowerCase().includes(q); // support legacy address field

      return matchesDistrict && matchesSearch;
    });
  }, [houses, search, districtFilter]);

  // ── Details View ────────────────────────────────────────────────────────
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleCardClick = (house) => {
    setSelectedHouse(house);
    setIsDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-950 transition-colors duration-300 flex flex-col p-4 sm:p-6 lg:p-8">
      
      <div className="max-w-7xl mx-auto w-full mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex-1 whitespace-nowrap">
          Property Management
        </h1>
        
        <div className="flex flex-wrap items-center justify-end gap-3 w-full sm:w-auto">
          {/* Admin Controls */}
          

          {/* Search & Filter Group */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto order-last sm:order-none mt-2 sm:mt-0">
            {/* District Filter */}
            <select 
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl text-sm bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400 shadow-sm"
            >
              {isAdmin && <option value="">All Districts (Kerala)</option>}
              {KERALA_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            <div className="relative flex-1 sm:w-64 md:w-72">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                id="search-input"
                type="text"
                placeholder="Search by loan no, street, or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm
                           bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-600
                           text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent
                           shadow-sm transition-all duration-200"
              />
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <button
            id="dark-mode-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                       bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-600 shadow-sm
                       hover:bg-gray-50 dark:hover:bg-navy-700
                       text-gray-600 dark:text-gray-300
                       transition-all duration-200"
          >
            {darkMode ? (
              <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          {isAdmin ? (
            <div className="flex items-center gap-3">
              <button
                onClick={handleCreateNew}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold-500 hover:bg-gold-400 text-white text-sm font-semibold rounded-xl shadow-md transition-colors"
                title="Add New Property"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                <span className="hidden sm:inline">Add Property</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-200 dark:bg-navy-800 hover:bg-gray-300 dark:hover:bg-navy-700 text-gray-800 dark:text-gray-200 text-sm font-semibold rounded-xl transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="px-4 py-2 bg-navy-600 hover:bg-navy-500 text-white text-sm font-semibold rounded-xl shadow-md transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </div>
      
      <hr className="w-full max-w-7xl mx-auto border-gray-200 dark:border-navy-700 mb-8" />

      <main className="flex-1 w-full max-w-7xl mx-auto">
        <HouseGrid 
          houses={filtered} 
          loading={loading} 
          error={error} 
          search={search}
          isAdmin={isAdmin}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCardClick={handleCardClick}
        />
      </main>

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLogin} 
      />
      <HouseFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmit={handleFormSubmit}
        initialData={editingHouse}
      />
      <HouseDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        house={selectedHouse}
        isAdmin={isAdmin}
      />
    </div>
  );
}

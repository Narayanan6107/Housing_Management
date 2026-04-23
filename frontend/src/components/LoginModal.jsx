import { useState } from 'react';

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Hardcoded check for demo purposes
    if (username === 'admin' && password === 'admin') {
      onLogin(); // triggers the callback to open the admin state
      setUsername('');
      setPassword('');
      onClose();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-slide-up border border-gray-100 dark:border-navy-700">
        
        <div className="p-5 border-b border-gray-100 dark:border-navy-700 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Admin Login</h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              autoFocus
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white dark:bg-navy-900 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white dark:bg-navy-900 text-gray-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-gradient-to-r from-gold-400 to-gold-600 text-white font-semibold rounded-xl hover:from-gold-300 hover:to-gold-500 transition-all shadow-md active:scale-95"
          >
            Login
          </button>
          
          <p className="text-xs text-center text-gray-400 mt-2">Use admin / admin for demo</p>
        </form>

      </div>
    </div>
  );
}

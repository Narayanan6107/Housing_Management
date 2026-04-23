import { useState, useEffect } from 'react';
import { convertGoogleDriveUrl } from '../services/api';

export default function HouseFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const districts = [
    'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 
    'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 
    'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'
  ];

  const [formData, setFormData] = useState({
    loanNo: '',
    street: '',
    city: '',
    district: '',
    state: 'Kerala',
    locationUrl: '',
    imageUrls: [''],
    videoUrls: [''],
    phone: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);

  // Populate data when editing
  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        ...initialData,
        imageUrls: initialData.imageUrls?.length ? initialData.imageUrls : [''],
        videoUrls: initialData.videoUrls?.length ? initialData.videoUrls : ['']
      });
    } else if (isOpen) {
      setFormData({
        loanNo: '',
        street: '',
        city: '',
        district: '',
        state: 'Kerala',
        locationUrl: '',
        imageUrls: [''],
        videoUrls: [''],
        phone: '',
        email: '',
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, field, value) => {
    setFormData((prev) => {
      const newArr = [...prev[field]];
      // Auto-convert Google Drive links only for images
      newArr[index] = field === 'imageUrls' ? convertGoogleDriveUrl(value) : value;
      return { ...prev, [field]: newArr };
    });
  };

  const addArrayItem = (field, max) => {
    if (formData[field].length < max) {
      setFormData((prev) => ({ ...prev, [field]: [...prev[field], ''] }));
    }
  };

  const removeArrayItem = (index, field) => {
    setFormData((prev) => {
      const newArr = [...prev[field]];
      newArr.splice(index, 1);
      return { ...prev, [field]: newArr };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Filter out empty URL strings before submission
      const payload = {
        ...formData,
        imageUrls: formData.imageUrls.filter(u => u.trim() !== ''),
        videoUrls: formData.videoUrls.filter(u => u.trim() !== ''),
      };
      await onSubmit(payload);
      onClose();
    } catch (err) {
      alert(err.message || 'Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = "w-full p-2 border border-gray-300 dark:border-navy-600 rounded-lg text-sm bg-white dark:bg-navy-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-colors";
  const labelClass = "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-xl w-full max-w-2xl my-auto animate-slide-up border border-gray-100 dark:border-navy-700 max-h-[90vh] flex flex-col">
        
        <div className="p-5 border-b border-gray-100 dark:border-navy-700 flex items-center justify-between shrink-0">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {initialData ? 'Edit Property Details' : 'Add Property'}
          </h3>
          <button type="button" onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Loan No & Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Loan Number *</label>
              <input required type="text" name="loanNo" value={formData.loanNo} onChange={handleChange} className={fieldClass} placeholder="e.g. LN-12345" />
            </div>
            
            <div>
              <label className={labelClass}>Phone *</label>
              <input required type="text" name="phone" value={formData.phone} onChange={handleChange} className={fieldClass} placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className={labelClass}>Email *</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className={fieldClass} placeholder="owner@email.com" />
            </div>
          </div>

          <hr className="border-gray-100 dark:border-navy-700" />

          {/* Location Area */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className={labelClass}>Street / Building / House No *</label>
                <input required type="text" name="street" value={formData.street} onChange={handleChange} className={fieldClass} placeholder="e.g. 123, Rose Villa..." />
              </div>
              <div>
                <label className={labelClass}>City / Area *</label>
                <input required type="text" name="city" value={formData.city} onChange={handleChange} className={fieldClass} placeholder="e.g. Hitech City" />
              </div>
              <div>
                <label className={labelClass}>District *</label>
                <select required name="district" value={formData.district} onChange={handleChange} className={fieldClass}>
                  <option value="">Select District</option>
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>State</label>
                <input readOnly type="text" name="state" value={formData.state} className={`${fieldClass} bg-gray-50 cursor-not-allowed`} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Google Maps Profile/Location URL</label>
              <input type="url" name="locationUrl" value={formData.locationUrl} onChange={handleChange} className={fieldClass} placeholder="https://maps.google.com/..." />
            </div>
          </div>

          <hr className="border-gray-100 dark:border-navy-700" />

          {/* Dynamic Images */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelClass}>Images (Google Drive Links, max 10)</label>
              {formData.imageUrls.length < 10 && (
                <button type="button" onClick={() => addArrayItem('imageUrls', 10)} className="text-xs text-gold-500 hover:text-gold-600 font-semibold flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg> Add Image
                </button>
              )}
            </div>
            <div className="space-y-2">
              {formData.imageUrls.map((url, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input type="url" value={url} onChange={(e) => handleArrayChange(i, 'imageUrls', e.target.value)} className={fieldClass} placeholder={`Paste Google Drive Link ${i + 1}`} />
                  <button type="button" onClick={() => removeArrayItem(i, 'imageUrls')} className="text-red-400 hover:text-red-500 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Videos */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelClass}>Videos (Google Drive Links, max 5)</label>
              {formData.videoUrls.length < 5 && (
                <button type="button" onClick={() => addArrayItem('videoUrls', 5)} className="text-xs text-gold-500 hover:text-gold-600 font-semibold flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg> Add Video
                </button>
              )}
            </div>
            <div className="space-y-2">
              {formData.videoUrls.map((url, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input type="url" value={url} onChange={(e) => handleArrayChange(i, 'videoUrls', e.target.value)} className={fieldClass} placeholder={`Paste Google Drive Link ${i + 1}`} />
                  <button type="button" onClick={() => removeArrayItem(i, 'videoUrls')} className="text-red-400 hover:text-red-500 shrink-0">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-white dark:bg-navy-800 pb-2">
            <button type="button" onClick={onClose} disabled={loading} className="px-5 py-2 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-700 transition">Cancel</button>
            <button type="submit" disabled={loading} className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-navy-600 to-navy-800 dark:from-navy-500 dark:to-navy-700 text-white hover:opacity-90 transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? 'Saving...' : (initialData ? 'Save Property' : 'Create Property')}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

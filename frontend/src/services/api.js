// src/services/api.js
// All backend calls go through this service.
// The base URL is read from the .env file so you can switch between dev / prod easily.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Fetch all house listings from MongoDB (via Express backend).
 * GET /api/houses
 */
export async function fetchHouses() {
  const res = await fetch(`${BASE_URL}/houses`);
  if (!res.ok) throw new Error(`Failed to fetch houses: ${res.status}`);
  return res.json();        // Expected: Array of house objects
}

/**
 * Fetch a single house by its MongoDB _id.
 * GET /api/houses/:id
 */
export async function fetchHouseById(id) {
  const res = await fetch(`${BASE_URL}/houses/${id}`);
  if (!res.ok) throw new Error(`House not found: ${res.status}`);
  return res.json();
}

/**
 * Create a new house listing.
 * POST /api/houses
 */
export async function createHouse(houseData) {
  const res = await fetch(`${BASE_URL}/houses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(houseData),
  });
  if (!res.ok) throw new Error(`Failed to create house: ${res.status}`);
  return res.json();
}

/**
 * Update an existing house listing.
 * PUT /api/houses/:id
 */
export async function updateHouse(id, houseData) {
  const res = await fetch(`${BASE_URL}/houses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(houseData),
  });
  if (!res.ok) throw new Error(`Failed to update house: ${res.status}`);
  return res.json();
}

/**
 * Delete (soft-delete) a house listing.
 * DELETE /api/houses/:id
 */
export async function deleteHouse(id) {
  const res = await fetch(`${BASE_URL}/houses/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Failed to delete house: ${res.status}`);
  return res.json();
}

/**
 * Build a full image URL from the path returned by the backend.
 * The backend serves images via: /uploads/<filename>
 */
export function getImageUrl(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;   // Already absolute
  const serverRoot = BASE_URL.replace('/api', '');
  return `${serverRoot}${imagePath}`;
}

/**
 * Converts a standard Google Drive shareable link into a direct viewable link.
 * Used for both Images and Videos.
 * Example in:  https://drive.google.com/file/d/1abc123/view?usp=sharing
 * Example out: https://drive.google.com/uc?export=view&id=1abc123
 */
export function convertGoogleDriveUrl(url) {
  if (!url) return '';
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    // thumbnail endpoint works without Google login in browser (requires file shared as "Anyone with link")
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }
  return url; // return as-is if pattern doesn't match
}

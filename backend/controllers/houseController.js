// controllers/houseController.js – CRUD handlers for house listings

const House = require('../models/House');

// ─── GET /api/houses ─────────────────────────────────────────────────────────
// Returns all active listings.
const getHouses = async (req, res) => {
  try {
    const filter = { isActive: true };
    const houses = await House.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: houses.length, data: houses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET /api/houses/:id ─────────────────────────────────────────────────────
const getHouseById = async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house || !house.isActive) {
      return res.status(404).json({ success: false, message: 'House not found' });
    }
    res.json({ success: true, data: house });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── POST /api/houses ────────────────────────────────────────────────────────
// Creates a new house listing.
// imageUrl should be passed as a string (e.g. Cloudinary URL) once ready.
const createHouse = async (req, res) => {
  try {
    const house = await House.create(req.body);
    res.status(201).json({ success: true, data: house });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ─── PUT /api/houses/:id ─────────────────────────────────────────────────────
const updateHouse = async (req, res) => {
  try {
    const house = await House.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!house) {
      return res.status(404).json({ success: false, message: 'House not found' });
    }
    res.json({ success: true, data: house });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ─── DELETE /api/houses/:id ──────────────────────────────────────────────────
// Soft-delete: sets isActive = false instead of removing the document.
const deleteHouse = async (req, res) => {
  try {
    const house = await House.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!house) {
      return res.status(404).json({ success: false, message: 'House not found' });
    }
    res.json({ success: true, message: 'Listing removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getHouses, getHouseById, createHouse, updateHouse, deleteHouse };

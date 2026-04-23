// routes/houseRoutes.js – Express router for /api/houses

const express = require('express');
const router = express.Router();
const {
  getHouses,
  getHouseById,
  createHouse,
  updateHouse,
  deleteHouse,
} = require('../controllers/houseController');

// GET  /api/houses          – list all (with optional filters)
// POST /api/houses          – create a new listing
router.route('/').get(getHouses).post(createHouse);

// GET    /api/houses/:id    – single listing
// PUT    /api/houses/:id    – update
// DELETE /api/houses/:id    – soft-delete
router.route('/:id').get(getHouseById).put(updateHouse).delete(deleteHouse);

module.exports = router;

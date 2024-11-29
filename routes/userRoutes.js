const express = require('express');
const { getUserProfile, getAllUsers } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { checkPermission } = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/profile', authenticateToken, getUserProfile);
router.get('/all', authenticateToken, checkPermission('read:all'), getAllUsers);

module.exports = router;
const express = require('express');
const router = express.Router();
const recoController = require('../controllers/recoController');
// Importa correctamente el middleware

// Aplica el middleware authenticateToken antes de cada ruta
router.post('/createRecommendation', recoController.createRecommendation);
router.post('/recommendations',recoController.getAllRecommendations);
router.post('/updateRecommendation/:id', recoController.updateRecommendation);
router.post('/deleteRecommendation/:id', recoController.deleteRecommendation);
router.post('/getRecommendation/:id', recoController.getRecommendation);

module.exports = router;


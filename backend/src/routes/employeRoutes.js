const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const employeController = require('../controllers/employeController');

// Validation des données
const employeValidation = [
  body('nom').trim().isLength({ min: 2 }),
  body('nombre_jours').isInt({ min: 0 }),
  body('taux_journalier').isFloat({ min: 0 })
];

router.get('/', employeController.getAllEmployes);
router.post('/', employeValidation, employeController.createEmploye);
router.put('/:id', employeValidation, employeController.updateEmploye);
router.delete('/:id', employeController.deleteEmploye);

// Route pour les statistique
router.get('/stats', employeController.getStats);

module.exports = router;
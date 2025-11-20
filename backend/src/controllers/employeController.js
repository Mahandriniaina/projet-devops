const Employe = require('../models/Employe');
const { validationResult } = require('express-validator');

exports.getAllEmployes = async (req, res, next) => {
  try {
    const employes = await Employe.getAll();
    res.json(employes);
  } catch (err) {
    next(err);
  }
};

exports.createEmploye = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nom, nombre_jours, taux_journalier } = req.body;
    const newId = await Employe.create(nom, nombre_jours, taux_journalier);
    res.status(201).json({ id: newId });
  } catch (err) {
    next(err);
  }
};

exports.updateEmploye = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Employe.update(id, req.body);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

exports.deleteEmploye = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Employe.delete(id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const stats = await Employe.getStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
};
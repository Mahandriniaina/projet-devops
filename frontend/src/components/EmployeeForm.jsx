import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EmployeeForm = ({ onSubmit, employeeToEdit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    days: '',
    rate: ''
  });

  useEffect(() => {
    if (employeeToEdit) {
      setFormData({
        name: employeeToEdit.name,
        days: employeeToEdit.days,
        rate: employeeToEdit.rate
      });
    }
  }, [employeeToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: employeeToEdit?.id,
      days: Number(formData.days),
      rate: Number(formData.rate)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <TextField
        label="Nom complet"
        variant="outlined"
        fullWidth
        color="#fcfdff69"
        margin="normal"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      
      <TextField
        label="Nombre de Jours"
        type="number"
        variant="outlined"
        fullWidth
        color="#fcfdff69"
        margin="normal"
        value={formData.days}
        onChange={(e) => setFormData({...formData, days: e.target.value})}
        inputProps={{ min: 0 }}
        required
      />
      
      <TextField
        label="Taux journalier (%)"
        type="number"
        variant="outlined"
        fullWidth
        color="#fcfdff69"
        margin="normal"
        value={formData.rate}
        onChange={(e) => setFormData({...formData, rate: e.target.value})}
        inputProps={{ min: 0, step: 0.01 }}
        required
      />
      
      <div className="form-actions">
        <Button variant="outlined" onClick={onClose} color="#fcfdff69">
          Annuler
        </Button>
        <Button type="submit" variant="contained" color="#fcfdff69">
          {employeeToEdit ? 'Mettre à jour' : 'Créer'}
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
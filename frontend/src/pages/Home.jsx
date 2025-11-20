import React, { useState, useEffect } from 'react';
import {  AnimatePresence } from 'framer-motion';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeTable from '../components/EmployeeTable';
import SalaryChart from '../components/SalaryChart';
import DeleteConfirmation from '../components/DeleteConfirmation';
import Modal from '../components/Modal';
import { v4 as uuidv4 } from 'uuid';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import '../styles/global.css';

const fabStyle = {
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
  transition: 'transform 0.3s, box-shadow 0.3s',
};

const Home = () => {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });

  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  // Calcul du salaire
  const calculateSalary = (days, rate) => days * rate;

  // Persistance des données
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  // Calcul des statistiques
  const calculateStats = () => {
    if (employees.length === 0) return { total: 0, min: 0, max: 0 };
    
    const salaries = employees.map(e => e.salary);
    return {
      total: salaries.reduce((a, b) => a + b, 0),
      min: Math.min(...salaries),
      max: Math.max(...salaries)
    };
  };

  // Gestion CRUD
  const handleAddOrUpdateEmployee = (employeeData) => {
    const newEmployee = {
      ...employeeData,
      salary: calculateSalary(employeeData.days, employeeData.rate),
      id: employeeData.id || uuidv4()
    };

    setEmployees(prev => 
      employeeData.id 
        ? prev.map(e => e.id === employeeData.id ? newEmployee : e)
        : [...prev, newEmployee]
    );

    setIsModalOpen(false);
    setEmployeeToEdit(null);
  };

  const handleEditEmployee = (employee) => {
    setEmployeeToEdit(employee);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteCandidate(id);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = () => {
    setEmployees(prev => prev.filter(e => e.id !== deleteCandidate));
    setIsDeleteAlertOpen(false);
    setDeleteCandidate(null);
  };

  const cancelDelete = () => {
    setIsDeleteAlertOpen(false);
    setDeleteCandidate(null);
  };

  // Style dynamique du bouton
  const dynamicFabStyle = {
    ...fabStyle,
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    boxShadow: isHovered 
      ? '0 6px 12px rgba(0,0,0,0.4)' 
      : '0 4px 8px rgba(0,0,0,0.3)',
  };

  return (
    <div className="employee-management-container">
      <h1>GESTION DES SALAIRES</h1>

      <EmployeeTable 
        employees={employees}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteClick}
      />

      <div className="salary-stats">
        <h3>Statistiques des salaires :</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Total</span>
            <span className="stat-value">
              {calculateStats().total.toFixed(2)} Ariary
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Minimal</span>
            <span className="stat-value">
              {calculateStats().min.toFixed(2)} Ariary
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Maximal</span>
            <span className="stat-value">
              {calculateStats().max.toFixed(2)} Ariary
            </span>
          </div>
        </div>
      </div>

      <SalaryChart stats={calculateStats()} />

      <AnimatePresence>
        <DeleteConfirmation
          isOpen={isDeleteAlertOpen}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      </AnimatePresence>

      <Tooltip title="Ajouter un employé" arrow placement="left">
        <Fab 
          color="#fcfdff69" 
          aria-label="Ajouter employé"
          style={dynamicFabStyle}
          onClick={() => setIsModalOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="modal-title">
          {employeeToEdit ? "Modifier employé" : "Nouvel employé"}
        </h2>
        <EmployeeForm
          onSubmit={handleAddOrUpdateEmployee}
          employeeToEdit={employeeToEdit}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Home;
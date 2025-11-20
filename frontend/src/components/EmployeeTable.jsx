import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} className="employee-table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell align="right">Nombre de Jours</TableCell>
            <TableCell align="right">Taux Journalier (%)</TableCell>
            <TableCell align="right">Salaire (Ariary)</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell align="right">{employee.days}</TableCell>
              <TableCell align="right">{employee.rate.toFixed(2)}</TableCell>
              <TableCell align="right">{employee.salary.toFixed(2)}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => onEdit(employee)}>
                  <EditIcon color="#fcfdff69" />
                </IconButton>
                <IconButton onClick={() => onDelete(employee.id)}>
                  <DeleteIcon color="error"/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
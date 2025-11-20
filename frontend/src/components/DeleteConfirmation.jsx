import { motion, AnimatePresence } from 'framer-motion';
import Button from '@mui/material/Button';

const DeleteConfirmation = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="delete-confirmation-overlay"
        >
          <motion.div 
            className="delete-confirmation-content"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <h3>Confirmer la suppression</h3>
            <p>Êtes-vous sûr de vouloir supprimer cet employé ?</p>
            
            <div className="confirmation-buttons">
              <Button 
                variant="contained" 
                color="error"
                onClick={onConfirm}
              >
                Confirmer
              </Button>
              
              <Button 
                variant="outlined" 
                color="#fcfdff69"
                onClick={onCancel}
              >
                Annuler
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmation;
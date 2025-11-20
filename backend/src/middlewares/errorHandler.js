// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error('\x1b[31m%s\x1b[0m', '❌ Erreur:', err.stack); // Message en rouge
    
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message || 'Erreur interne du serveur',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  };
  
  module.exports = errorHandler;
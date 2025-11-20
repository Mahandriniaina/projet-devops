const pool = require('../config/db');

class Employe {
  static async getAll() {
    const [rows] = await pool.query(`
      SELECT *, nombre_jours * taux_journalier AS salaire 
      FROM Employe
    `);
    return rows;
  }

  static async create(nom, nombre_jours, taux_journalier) {
    const [result] = await pool.query(
      'INSERT INTO Employe SET ?',
      { nom, nombre_jours, taux_journalier }
    );
    return result.insertId;
  }

  static async update(id, data) {
    await pool.query('UPDATE Employe SET ? WHERE numEmp = ?', [data, id]);
    return true;
  }

  static async delete(id) {
    await pool.query('DELETE FROM Employe WHERE numEmp = ?', [id]);
    return true;
  }

  static async getStats() {
    const [rows] = await pool.query(`
      SELECT 
        SUM(nombre_jours * taux_journalier) AS total,
        MIN(nombre_jours * taux_journalier) AS minimum,
        MAX(nombre_jours * taux_journalier) AS maximum
      FROM Employe
    `);
    return rows[0];
  }
}

module.exports = Employe;
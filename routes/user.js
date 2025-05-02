const express = require('express');
const router = express.Router();
const pool = require('../backend/db');
const bcrypt = require('bcryptjs');

// GET semua user
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST user baru
router.post('/users', async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !role || !password) {
    return res.status(400).json({ message: "Semua field wajib diisi!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, hashedPassword, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Gagal menambahkan user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/users/:id', async (req, res) => {
  const { username, email, role } = req.body;
  const id = req.params.id;

  try {
    const result = await pool.query(
      'UPDATE users SET username=$1, email=$2, role=$3 WHERE id=$4 RETURNING *',
      [username, email, role, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Gagal update user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/users/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.status(204).send(); // sukses tanpa isi
  } catch (err) {
    console.error('Gagal hapus user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../backend/db');  // koneksi ke DB

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // 🧪 Log input dari frontend
  console.log("Login input:", username, password);

  try {
    // Ambil user dari database berdasarkan username/email
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $1',
      [username]
    );

    // 🧪 Log hasil query
    console.log("Query result:", result.rows);

    if (result.rows.length === 0) {
      console.log("User not found");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // 🧪 Log user dari DB
    console.log("User from DB:", user);

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password);

    // 🧪 Log hasil bcrypt
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Buat token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      'secretkey',
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout route (dummy untuk hapus token di sisi client)
router.post('/logout', (req, res) => {
  // Tidak perlu hapus session karena pakai JWT, cukup kirim response sukses
  res.status(200).json({ message: 'Logout successful' });
});


module.exports = router;

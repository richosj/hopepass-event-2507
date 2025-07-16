const express = require('express');
const router = express.Router();
const db = require('../models/db');

// POST /api/verify
router.post('/verify', async (req, res) => {
  console.log('verify', req.body);
  const { code } = req.body;

  const result = await db.query('SELECT * FROM event_codes WHERE code = $1', [code]);
  const row = result.rows[0];

  if (!row) return res.status(404).json({ valid: false });
  if (row.is_used) return res.status(400).json({ valid: true, used: true });

  res.json({ valid: true, prize: row.prize_type });
});

// POST /api/use
router.post('/use', async (req, res) => {
  const { code } = req.body;
  await db.query('UPDATE event_codes SET is_used = true, used_at = NOW() WHERE code = $1', [code]);
  res.json({ success: true });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../models/db');
const auth = require('../middlewares/auth');
const path = require('path');

// 로그인 페이지
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

// 로그인 처리
router.post('/login', express.urlencoded({ extended: true }), (req, res) => {
  const { id, pw } = req.body;
  if (id === process.env.ADMIN_ID && pw === process.env.ADMIN_PASS) {
    res.cookie('admin', id, { httpOnly: true });
    return res.redirect('/admin/dashboard');
  }
  res.status(401).send('로그인 실패');
});

// 대시보드
router.get('/dashboard', auth, async (req, res) => {
  const result = await db.query('SELECT * FROM event_codes ORDER BY id DESC');
  let html = `
    <h1>🎯 난수 코드 관리</h1>
    <form method="POST" action="/admin/add">
      <input name="code" placeholder="코드 (8자리)" required />
      <select name="prize_type">
        <option value="none">꽝</option>
        <option value="small">소</option>
        <option value="big">대</option>
      </select>
      <button type="submit">등록</button>
    </form>
    <hr />
    <ul>
  `;
  for (const row of result.rows) {
    html += `<li>${row.code} - ${row.prize_type} - ${row.is_used ? '✅ 사용됨' : '❌ 미사용'}</li>`;
  }
  html += `</ul>`;
  res.send(html);
});

// 코드 등록
router.post('/add', auth, express.urlencoded({ extended: true }), async (req, res) => {
  const { code, prize_type } = req.body;
  try {
    await db.query('INSERT INTO event_codes (code, prize_type) VALUES ($1, $2)', [code, prize_type]);
    res.redirect('/admin/dashboard');
  } catch (err) {
    res.status(400).send('이미 존재하는 코드거나 오류 발생');
  }
});

module.exports = router; // 👈 이거 반드시 있어야 함

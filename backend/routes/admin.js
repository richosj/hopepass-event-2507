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
const FRONT_URL = process.env.FRONT_URL?.trim();

router.post('/login', express.urlencoded({ extended: true }), (req, res) => {
  console.log('로그인 시도', req.body);

  const { id, pw } = req.body;
  const admin = req.cookies?.admin;
  const expected = process.env.ADMIN_ID?.trim();
  const isDev = req.hostname === 'localhost' || process.env.NODE_ENV === 'development';

  // ✅ 이미 로그인 상태면 리다이렉트만 응답
  if (admin && expected && admin === expected) {
    return res.json({
      success: true,
      alreadyLoggedIn: true,
      redirectTo: `${FRONT_URL}/admin/dashboard`,
    });
  }

  if (id === expected && pw === process.env.ADMIN_PASS) {
    res.cookie('admin', id, {
      httpOnly: true,
      path: '/',
      sameSite: 'None',
      secure: true
    });

    console.log('로그인 성공');

    return res.json({
      success: true,
      redirectTo: `${FRONT_URL}/admin/dashboard`,
    });
  }

  console.log('로그인 실패');
  res.status(401).json({ success: false, message: '아이디 또는 비밀번호가 잘못되었습니다.' });
});


// 관리자 대시보드 React 진입 (React는 app.js에서 정적 파일로 제공함)
router.get('/dashboard', auth, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.post('/logout', (req, res) => {
  res.clearCookie('admin', { path: '/' });
  res.json({ success: true });
});


// 관리자 코드 목록 API (React에서 호출)
router.get('/codes', auth, async (req, res) => {
  const { code, used, rank, page = 1, limit = 15 } = req.query;
  const offset = (page - 1) * limit;

  const conditions = [];
  const params = [];
  let i = 1;

  if (code) {
    conditions.push(`code ILIKE $${i++}`);
    params.push(`%${code}%`);
  }
  if (used === 'true') {
    conditions.push(`is_used = true`);
  } else if (used === 'false') {
    conditions.push(`is_used = false`);
  }
  if (rank) {
    conditions.push(`prize_type = $${i++}`);
    params.push(rank);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const dataQuery = `SELECT * FROM event_codes ${where} ORDER BY id DESC LIMIT $${i++} OFFSET $${i++}`;
  params.push(limit, offset);

  const countQuery = `SELECT COUNT(*) FROM event_codes ${where}`;
  const countRes = await db.query(countQuery, params.slice(0, params.length - 2));
  const dataRes = await db.query(dataQuery, params);

  const statsRes = await db.query(`
    SELECT prize_type, COUNT(*) as count
    FROM event_codes
    WHERE is_used = true
    GROUP BY prize_type
  `);

  const rankStats = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  statsRes.rows.forEach(r => {
    rankStats[r.prize_type] = parseInt(r.count, 10);
  });

  const usedCountRes = await db.query(`SELECT COUNT(*) FROM event_codes WHERE is_used = true`);
  const unusedCountRes = await db.query(`SELECT COUNT(*) FROM event_codes WHERE is_used = false`);

  res.json({
    data: dataRes.rows,
    total: parseInt(countRes.rows[0].count, 10),
    stats: {
      ranks: rankStats,
      used: parseInt(usedCountRes.rows[0].count, 10),
      unused: parseInt(unusedCountRes.rows[0].count, 10)
    }
  });
});

// 코드에 사용자 할당
router.post('/assign', auth, async (req, res) => {
  const { id, name } = req.body
  if (!id || !name) return res.status(400).json({ error: 'ID와 이름이 필요합니다.' })
  try {
    await db.query(
      'UPDATE event_codes SET assigned_to = $1 WHERE id = $2',
      [name, id]
    )
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'DB 업데이트 실패' })
  }
})

module.exports = router;

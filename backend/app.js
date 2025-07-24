require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const apiRoutes = require('./routes/api');         // API 엔드포인트
const adminRoutes = require('./routes/admin');     // 관리자 기능 API
const requireAdmin = require('./middlewares/auth');

const app = express();

// ✅ 1. 정적 파일 서빙 (index.html은 예외 처리)
app.use((req, res, next) => {
  const skipIndex = ['/', '/index.html'];
  if (skipIndex.includes(req.path)) return next();
  express.static(path.join(__dirname, 'public'))(req, res, next);
});

// ✅ 2. CORS
app.use(cors({
  origin: 'https://heemangpass.co.kr',
  credentials: true
}));

// ✅ 3. 기본 미들웨어
app.use(express.json());
app.use(cookieParser());

// ✅ 4. API 라우팅
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

// ✅ 5. 로그인 페이지 (인증 없이 접근 가능)
app.get('/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// ✅ 6. 관리자 SPA 라우팅 (인증 필요)
app.get('/admin/*', requireAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ 7. 메인 포함 나머지 모든 경로 인증
app.get('*', requireAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ 8. 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

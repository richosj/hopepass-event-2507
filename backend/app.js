require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const apiRoutes = require('./routes/api');         // API 엔드포인트
const adminRoutes = require('./routes/admin');     // 관리자 기능 API

const app = express();

// ✅ CORS 설정 - 프론트 주소 허용
app.use(cors({
  origin: 'https://heemangpass.co.kr', // 프론트 배포 주소
  credentials: true
}));

// ✅ 기본 미들웨어
app.use(express.json());
app.use(cookieParser());

// ✅ React 앱 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'public')));

// ✅ API 라우팅
app.use('/api', apiRoutes);          // 일반 API
app.use('/admin', adminRoutes);      // 인증/대시보드 관련 API

// ✅ 관리자 SPA 라우팅 처리 (React에서 /admin/* 경로 대응)
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ 나머지 SPA 라우팅 처리 (예: /, /about 등)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// ✅ 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
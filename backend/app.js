require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admin');

const app = express();

// ✅ CORS 설정 - 실제 배포 주소 명시
app.use(cors({
  origin: 'https://heemangpass.co.kr',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ✅ 정적 파일 서빙 (React 빌드 결과)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ API 라우팅
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

// ✅ 나머지 라우팅은 React index.html로 처리
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admin');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// 정적 파일 서빙 (React 빌드된 결과)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send('서버 정상 작동 중'));

// API 라우팅
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

// React로 관리자 페이지 SPA 진입점 제공
app.get('/admin/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

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

// 👉 React 빌드 파일 서빙
app.use(express.static(path.join(__dirname, 'public')));

// 👉 API 라우팅
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

// 👉 모든 경로는 React SPA index.html로 응답 (중요!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
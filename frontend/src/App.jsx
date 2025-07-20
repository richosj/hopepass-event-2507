import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Event from './components/Event';
import Footer from './components/Footer';
import LuckGrab from './components/LuckGrab';
import PrizeList from './components/PrizeList';
import Visual from './components/Visual';
import AdminDashboard from './pages/AdminDashboard'; // 관리자 페이지



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div id="App">
            <Visual />
            <LuckGrab />
            <PrizeList />
            <Event />
            <Footer />
          </div>
        } />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

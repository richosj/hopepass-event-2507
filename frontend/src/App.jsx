import { ScrollTrigger } from 'gsap/all';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Lenis from '@studio-freight/lenis';
import AdminRoute from './components/AdminRoute';
import Footer from './components/Footer';
import LuckGrab from './components/LuckGrab';
import PrizeList from './components/PrizeList';
import Roulette from './components/Roulette';
import Visual from './components/Visual';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  useEffect(() => {
    // ✨ Lenis 스크롤 초기화
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value) : lenis.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      pinType: document.body.style.transform ? 'transform' : 'fixed'
    });

    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // ⏱️ 자동 로그아웃 로직 추가
    const checkLoginTimeout = () => {
      const loginTime = localStorage.getItem('adminLoginTime');
      const now = Date.now();
      const EXPIRE_TIME = 30 * 60 * 1000; // 30분

      if (loginTime && now - loginTime > EXPIRE_TIME) {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminLoginTime');
        window.location.href = '/admin/login';
      }
    };

    const intervalId = setInterval(checkLoginTimeout, 60000); // 1분마다 체크

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div id="App">
            <Visual />
            <LuckGrab />
            <PrizeList />
            <Roulette />
            <Footer />
          </div>
        } />
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import Lenis from '@studio-freight/lenis';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Footer from './components/Footer';
import LuckGrab from './components/LuckGrab';
import PrizeList from './components/PrizeList';
import Roulette from './components/Roulette';
import Visual from './components/Visual';
import NotFound from './pages/NotFound';

const MainLayout = () => {
  const location = useLocation();

  // ✅ 현재 URL의 파라미터 읽기
  const searchParams = new URLSearchParams(location.search);
  const season = searchParams.get('season');

  // ✅ 허용할 season 값 (필요하면 여러 개 추가 가능)
  const validSeasons = ['2'];

  // ✅ Lenis + ScrollTrigger 초기화
  useEffect(() => {
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
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? 'transform' : 'fixed',
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = time => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, []);

  
  // ✅ 정상 페이지 렌더링
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div id="App">
            <Visual />
            <LuckGrab />
            <PrizeList />
            <Roulette />
            <Footer />
          </div>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainLayout;

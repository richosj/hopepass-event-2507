import Lenis from '@studio-freight/lenis';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import LuckGrab from './components/LuckGrab';
import PrizeList from './components/PrizeList';
import Roulette from './components/Roulette';
import Visual from './components/Visual';

const MainLayout = () => {
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

  return (
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
    </Routes>
  );
};

export default MainLayout;

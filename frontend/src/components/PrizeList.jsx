import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect } from 'react';

import './PrizeList.scss';

gsap.registerPlugin(ScrollTrigger)

const PrizeList = () => {

  useEffect(() => {
    ScrollTrigger.matchMedia({
      // PC만 적용
      '(min-width: 1001px)': () => {
        const targets = [
          '.prize-title',
         
        ];
  
        gsap.set(targets, { opacity: 0, y: 100 });
        gsap.to(targets, {
          scrollTrigger: {
            trigger: '.luck__inner',
            start: 'top 50%',
            toggleActions: 'play none none none',
          },
          opacity: 1,
          y: 0,
          duration:1.2,
          ease: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
          stagger: 0.3,
        });
        // mission-item 순차 등장
        gsap.utils.toArray('.prize-item').forEach((el, i) => {
          gsap.set(el, { opacity: 0, y: 100 });
          gsap.to(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.1,
            ease: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
          });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);


  return (
    <div className="prize">
      <div className="prize-inner">
        <div className="prize-title">
          <h2><img src="/src/assets/prize/prize-title.png" alt="" /></h2>
        </div>
        <div className="prize__list">
          <div className="prize-item item-large">
            <div className="item"><img src="/src/assets/prize/prize-item-01.png" alt="" /></div>
            <div className="background">
              <img src="/src/assets/prize/prize-01.png" alt="" />
            </div>
          </div>
          <div className='prize-item-grid'>
            <div className='prize-item prize-item-02'>
              <div className="item"><img src="/src/assets/prize/prize-item-02.png" alt="" /></div>
                <div className="background">
                  <img src="/src/assets/prize/prize-02.png" alt="" />
                </div>
            </div>
            <div className='prize-item prize-item-03'>
              <div className="item"><img src="/src/assets/prize/prize-item-03.png" alt="" /></div>
                <div className="background">
                  <img src="/src/assets/prize/prize-03.png" alt="" />
                </div>
            </div>
            <div className='prize-item prize-item-04'>
              <div className="item"><img src="/src/assets/prize/prize-item-04.png" alt="" /></div>
                <div className="background">
                  <img src="/src/assets/prize/prize-04.png" alt="" />
                </div>
            </div>
            <div className='prize-item prize-item-05'>
              <div className="item"><img src="/src/assets/prize/prize-item-05.png" alt="" /></div>
                <div className="background">
                  <img src="/src/assets/prize/prize-05.png" alt="" />
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="prize-mobile"><img src="/src/assets/prize/priz-mobile.png" alt="" /></div>
    </div>
  );
};

export default PrizeList;
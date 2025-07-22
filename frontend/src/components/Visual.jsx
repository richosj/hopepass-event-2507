import React from 'react';
import { Link } from 'react-router-dom';
import './Visual.scss';

const Visual = () => {
  return (
    <div className="visual">
      <Link to="/admin/dashboard">관리자 페이지</Link>
      <div className="visual__inner">
        <div className="visual__container">
          <div className='icon-01 icon-position'>
            <img className='pc' src="/src/assets/visual/emoticon-1.png" alt="" />
            <img className='mobile' src="/src/assets/visual/emoticon-mobile-1.png" alt="" />
          </div>
          <div className='icon-02 icon-position'>
            <img className='pc' src="/src/assets/visual/emoticon-2.png" alt="" />
            <img className='mobile' src="/src/assets/visual/emoticon-mobile-2.png" alt="" />
          </div>
          <div className="visual__title">
            <div className="pc">
              <span className="off"><img src="/src/assets/visual/title-off.png" alt="" /></span>
            </div>
            <div className="mobile">
              <span className="off"><img src="/src/assets/visual/title-mobile.png" alt="" /></span>
            </div>
          </div>
          <div className="visual__info">
            <dl>
              <dt>희망패스 미션 기간</dt>
              <dd>2025.08.04 ~ 2025.08.31</dd>
            </dl>
            <dl>
              <dt>희망패스 룰렛 이벤트 기간</dt>
              <dd>2025.09.01 ~ 2025.09.30</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visual;
import React from 'react';
import './Visual.scss';

const Visual = () => {
  return (
    <div className="visual">
      <div className="visual__inner">
        <div className="visual__container">
          <div className='icon-01 icon-position'><i aria-label="닌텐도 이모티콘"><img src="/src/assets/visual/emoticon-1.png" alt="" /></i></div>
          <div className='icon-02 icon-position'><i aria-label="편지 이모티콘"><img src="/src/assets/visual/emoticon-2.png" alt="" /></i></div>
          <div className="visual__title">
            <span className="off"><img src="/src/assets/visual/title-off.png" alt="" /></span>
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
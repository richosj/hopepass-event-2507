import React from 'react';
import './LuckGrab.scss';

const LuckGrab = () => {
  return (
    <div className="luck">
      <div className="luck__inner">
        <div className="luck__container">
          <div className="luck__title">
            <span><img src="/src/assets/lucky/title.png" alt="" /></span>
          </div>

          <div className="luck__step">
            <img src="/src/assets/lucky/step.png" alt="" />
            <div className="luck__step-text">
              <p>
                * 희망ON 드로우 희망 한마디, 희망 플러스 이벤트 참여자는<br />
                기존에 전달 받은 난수번호로 바로 참여 가능합니다.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LuckGrab;
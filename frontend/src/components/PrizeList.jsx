import React from 'react';
import './PrizeList.scss';

const PrizeList = () => {
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
    </div>
  );
};

export default PrizeList;
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

          <div className="luck__info">
            <div className="luck__info-text">
            응모권 등록을 위한 난수번호는 희망패스 미션 기간 종료 후<br />
            룰렛 이벤트 시작일에 희망스튜디오 <b>가입 이메일</b>을 통해 <b>순차적으로 발송</b>됩니다.
            </div>
          </div>

          <div className="luck__mission">
            <div className="luck__mission-title">
              <div className="title">
                <img src="/src/assets/lucky/mission-title.png" alt="" />
                <span className="bubble">
                  <img src="/src/assets/lucky/mission-title-bubble.png" alt="" />
                </span>
              </div>
            </div>

            <div className="luck__mission-list">
              {/* 미션 01 */}
              <div className="luck__mission-item">
                <div className="box">
                  <div className="mission-icon">
                    <img src="/src/assets/lucky/mission-icon-01.png" alt="" />
                  </div>
                  <div className="mission-content">
                    <div className="mission-header">
                      <div className="mission-number">MISSION. 1</div>
                      <div className="roulette-chance">
                        <img src="/src/assets/lucky/roulette-chance.png" alt="" />
                      </div>
                    </div>
                    
                    <div className="mission-details">
                      <div className="desc">
                        <div className="mission-title">
                          <h3>희망스튜디오 회원 가입</h3>
                          <div className="target-audience">8월 신규 가입자 대상</div>
                        </div>
                        
                        <div className="mission-description">
                          희망을 전하는 첫 걸음에 함께 해주세요.
                        </div>
                        
                        <div className="mission-note">
                          *연내, 기존 가입자들을 위한 이벤트 추가 실행 예정
                        </div>
                      </div>

                      <div className="mission-actions">
                        <button className="btn-go-mission">미션 하러 가기</button>
                        <button className="btn-certify-mission">미션 인증하기</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 미션 02 */}
              <div className="luck__mission-item">
                <div className="box">
                  <div className="mission-icon">
                    <img src="/src/assets/lucky/mission-icon-02.png" alt="" />
                  </div>
                  <div className="mission-content">
                    <div className="mission-header">
                      <div className="mission-number">MISSION. 2</div>
                      <div className="roulette-chance">
                        <img src="/src/assets/lucky/roulette-chance.png" alt="" />
                      </div>
                    </div>
                    
                    <div className="mission-details">
                      <div className="desc">
                        <div className="mission-title">
                          <h3>FUNding 참여하기</h3>
                        </div>
                        
                        <div className="mission-description">
                        사회문제 해결을 위한 FUNding에 참여해 주세요.
                        </div>
                      </div>

                      <div className="mission-actions">
                        <button className="btn-go-mission">미션 하러 가기</button>
                        <button className="btn-certify-mission">미션 인증하기</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 미션 03 */}
              <div className="luck__mission-item">
                <div className="box">
                  <div className="mission-icon">
                    <img src="/src/assets/lucky/mission-icon-03.png" alt="" />
                  </div>
                  <div className="mission-content">
                    <div className="mission-header">
                      <div className="mission-number">MISSION. 3</div>
                      <div className="roulette-chance">
                        <img src="/src/assets/lucky/roulette-chance.png" alt="" />
                      </div>
                    </div>
                    
                    <div className="mission-details">
                      <div className="desc">
                        <div className="mission-title">
                          <h3>CREATing 참여하기</h3>
                        </div>
                        
                        <div className="mission-description">
                        사회문제 해결 아이디어를 제안해 주세요.
                        </div>
                      
                      </div>

                      <div className="mission-actions">
                        <button className="btn-go-mission">미션 하러 가기</button>
                        <button className="btn-certify-mission">미션 인증하기</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 미션 04 */}
              <div className="luck__mission-item">
                <div className="box">
                  <div className="mission-icon">
                    <img src="/src/assets/lucky/mission-icon-04.png" alt="" />
                  </div>
                  <div className="mission-content">
                    <div className="mission-header">
                      <div className="mission-number">MISSION. 4</div>
                      <div className="roulette-chance">
                        <img src="/src/assets/lucky/roulette-chance.png" alt="" />
                      </div>
                    </div>
                    
                    <div className="mission-details">
                      <div className="desc">
                        <div className="mission-title">
                          <h3>희망스튜디오 카카오톡 친구맺기</h3>
                        </div>
                        
                        <div className="mission-description">
                        카카오톡 희망스튜디오 채널 친구 추가를 해주세요.
                        </div>
                      </div>

                      <div className="mission-actions">
                        <button className="btn-go-mission">미션 하러 가기</button>
                        <button className="btn-certify-mission">미션 인증하기</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 미션 05 */}
              <div className="luck__mission-item">
                <div className="box">
                  <div className="mission-icon">
                    <img src="/src/assets/lucky/mission-icon-05.png" alt="" />
                  </div>
                  <div className="mission-content">
                    <div className="mission-header">
                      <div className="mission-number">MISSION. 5</div>
                      <div className="roulette-chance">
                        <img src="/src/assets/lucky/roulette-chance.png" alt="" />
                      </div>
                    </div>
                    
                    <div className="mission-details">
                      <div className="desc">
                        <div className="mission-title">
                          <h3>희망스튜디오 뉴스레터 구독하기</h3>
                        </div>
                        
                        <div className="mission-description">
                        희망스튜디오 뉴스레터 ‘희망ON’을 구독해주세요.
                        </div>
                        
                      </div>

                      <div className="mission-actions">
                        <button className="btn-go-mission">미션 하러 가기</button>
                        <button className="btn-certify-mission">미션 인증하기</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              


            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default LuckGrab;
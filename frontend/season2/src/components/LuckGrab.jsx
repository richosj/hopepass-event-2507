import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect } from 'react';

import './LuckGrab.scss';

gsap.registerPlugin(ScrollTrigger)

const LuckGrab = () => {

  useEffect(() => {
    ScrollTrigger.matchMedia({
      // PC만 적용
      '(min-width: 1001px)': () => {
        const targets = [
          '.luck__title',
          '.luck__step',
          '.luck__step-text',
          '.luck__info',
          '.luck__mission-title',
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
          //stagger: 0.3,
        });
        // mission-item 순차 등장
        gsap.utils.toArray('.luck__mission-item').forEach((el, i) => {
          gsap.set(el, { opacity: 0, y: 100 });
          gsap.to(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            //delay: i * 0.1,
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
    <div className="luck">
      <div className="luck__inner">
        <div className="luck__container">
          <div className="luck__title">
            <span className='pc'><img src="/assets/lucky/title.png" alt="" /></span>
            <span className='mobile'><img src="/assets/lucky/mobile-title.png" alt="" /></span>
          </div>

          <div className="luck__step">
            <img className='pc' src="/assets/lucky/step.png" alt="" />
            <img className='mobile' src="/assets/lucky/mobile-step.png" alt="" />
            <div className="luck__step-text">
              <p>
              응모권 등록을 위한 난수번호는 희망패스 미션 인증 후<br />
              룰렛 참여 기간동안 희망스튜디오 가입 이메일을 통해 순차적으로 발송됩니다.
              </p>
            </div>
          </div>

          <div className="luck__info">
            <div className="luck__info-text">
              <p>희망연성술 미션 누적 참여 수에 따라 룰렛 참여권이 추가로 지급됩니다!</p>
              <ul className="luck__info-list">
                <li>1개 참여 시: 룰렛 참여권 <em>1개</em> 지급</li>
                <li>2개 참여 시: 룰렛 참여권 <em>3개</em> 지급</li>
                <li>3개 참여 시: 룰렛 참여권 <em>10개</em> 지급</li>
              </ul>
            </div>
          </div>

          <div className="luck__mission">
            <div className="luck__mission-title">
              <div className="title pc">
                <img src="/assets/lucky/mission-title.png" alt="" />
                <span className="bubble">
                  <img src="/assets/lucky/mission-title-bubble.png" alt="" />
                </span>
              </div>
              <div className='mobile'>
                <img src="/assets/lucky/mobile-mission-title-new.png" alt="" />
                <img src="/assets/lucky/mobile-mission-title-new2.png" alt="" />
              </div>
            </div>

            <div className='sub-title'>
              <img src="/assets/lucky/mission-title02.png" alt="" />
            </div>
            
            <div className="luck__mission-list">
              {/* 미션 01 */}
              <div className="luck__mission-item">
                <div className="box">
                  <div className="mission-icon">
                    <img src="/assets/lucky/mission-icon-01.png" alt="" />
                  </div>
                  <div className="mission-content">
                    <div className="mission-header">
                      <div className="mission-number"><span>MISSION. 1</span><em>희망의 양피지 획득</em></div>
                      <div className="roulette-chance">
                        <img src="/assets/lucky/roulette-chance.png" alt="" />
                      </div>
                    </div>
                    
                    <div className="mission-details">
                      <div className="desc">
                        <div className="mission-title">
                          <h3>FUNding 참여하기</h3>
                          <div className="target-audience">현재 진행중인 콘텐츠만 해당</div>
                        </div>
                        
                        <div className="mission-description">
                        "새로운 연금술사가 되기 위해 당신은 희망의 양피지를 손에 넣었습니다. <br />
                        이 양피지는 아이들의 내일을 써 내려갈 연금술의 시작입니다."
                        </div>
                      </div>

                      <div className="mission-actions">
                        <a href="https://www.heemangstudio.org/hope/campaignList/funding#page1&filterCampaignType=funding&orderBy=regdateDesc&sort=regDate" className="btn-go-mission" target='_blank'>미션 하러 가기</a>
                        <a href="https://naver.me/G6QLy7q1" className="btn-certify-mission" target='_blank'>미션 인증하기</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mobile-box">
                  <img src="/assets/lucky/mission-mobile-01.png" alt="" />
                  <a href="https://www.heemangstudio.org/hope/campaignList/funding#page1&filterCampaignType=funding&orderBy=regdateDesc&sort=regDate" className='btn-go-mission' target='_blank'>미션 하러 가기</a>
                  <a href="https://naver.me/G6QLy7q1" className='btn-certify-mission' target='_blank'>미션 인증하기</a>
                </div>
              </div>

              {/* 미션 02 */}
              <div className="luck__mission-item">
                <div className="box">
                  <div className="mission-icon">
                    <img src="/assets/lucky/mission-icon-02.png" alt="" />
                  </div>
                  <div className="mission-content">
                    <div className="mission-header">
                      <div className="mission-number"><span>MISSION. 2</span><em>희망의 잉크 획득</em></div>
                      <div className="roulette-chance">
                        <img src="/assets/lucky/roulette-chance.png" alt="" />
                      </div>
                    </div>
                    
                    <div className="mission-details">
                      <div className="desc">
                        <div className="mission-title">
                          <h3>응원 댓글 달기</h3>
                          <div className="target-audience">이미지 댓글 가능</div>
                        </div>
                        
                        <div className="mission-description">
                        "당신의 응원이 모여 다양한 희망의 빛깔을 담은 잉크가 만들어졌습니다. <br />
                        이 잉크는 연금술에 가장 강력한 힘을 부여합니다."
                        </div>
                      </div>
                      
                      <div className="mission-actions">
                        <a href="https://www.heemangstudio.org/hope/campaignList/funding#page1&filterCampaignType=funding&orderBy=regdateDesc&sort=regDate" className="btn-go-mission" target='_blank'>미션 하러 가기</a>
                        <a href="https://naver.me/xsliYcBN" className="btn-certify-mission" target='_blank'>미션 인증하기</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mobile-box">
                  <img src="/assets/lucky/mission-mobile-02.png" alt="" />
                  <a href="https://www.heemangstudio.org/hope/campaignList/funding#page1&filterCampaignType=funding&orderBy=regdateDesc&sort=regDate" className='btn-go-mission' target='_blank'>미션 하러 가기</a>
                  <a href="https://naver.me/xsliYcBN" className='btn-certify-mission' target='_blank'>미션 인증하기</a>
                </div>
              </div>
              {/* 미션 03 */}
              <div className="luck__mission-item">
                <div className="box">
                  <div className="mission-icon">
                    <img src="/assets/lucky/mission-icon-03.png" alt="" />
                  </div>
                  <div className="mission-content">
                    <div className="mission-header">
                      <div className="mission-number"><span>MISSION. 3</span><em>희망의 깃펜 획득</em></div>
                      <div className="roulette-chance">
                        <img src="/assets/lucky/roulette-chance.png" alt="" />
                      </div>
                    </div>
                    
                    <div className="mission-details">
                      <div className="desc">
                        <div className="mission-title">
                          <h3>희망스튜디오 카카오톡 친구 맺기</h3>
                        </div>
                        
                        <div className="mission-description">
                        "무궁무진한 희망을 써 내려갈 수 있는 깃펜이 제작되었습니다. <br />
                        이 깃펜은 다른 재료들과 합쳐져 더 큰 희망을 창조합니다."
                        </div>
                      
                      </div>

                      <div className="mission-actions">
                        <a href="https://pf.kakao.com/_xhxidEG" className="btn-go-mission" target='_blank'>미션 하러 가기</a>
                        <a href="https://naver.me/x9zwcS2Y" className="btn-certify-mission" target='_blank'>미션 인증하기</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mobile-box">
                  <img src="/assets/lucky/mission-mobile-03.png" alt="" />
                  <a href="httpshttps://pf.kakao.com/_xhxidEG" className='btn-go-mission' target='_blank'>미션 하러 가기</a>
                  <a href="https://naver.me/x9zwcS2Y" className='btn-certify-mission' target='_blank'>미션 인증하기</a>
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

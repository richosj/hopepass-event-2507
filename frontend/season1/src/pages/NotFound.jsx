import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.scss'; // 스타일 분리

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/', { replace: true });
    navigate(0); // 강제 새로고침
  };

  return (
    <div className="not-found">
        
        <section className="wrapper">

            <div className="container">

                <div id="scene" className="scene" data-hover-only="false">
                    <div className="circle" data-depth="1.2"></div>

                    <div className="one" data-depth="0.9">
                        <div className="content">
                            <span className="piece"></span>
                            <span className="piece"></span>
                            <span className="piece"></span>
                        </div>
                    </div>

                    <div className="two" data-depth="0.60">
                        <div className="content">
                            <span className="piece"></span>
                            <span className="piece"></span>
                            <span className="piece"></span>
                        </div>
                    </div>

                    <div className="three" data-depth="0.40">
                        <div className="content">
                            <span className="piece"></span>
                            <span className="piece"></span>
                            <span className="piece"></span>
                        </div>
                    </div>

                    <p className="p404" data-depth="0.50">404</p>
                    <p className="p404" data-depth="0.10">404</p>

                </div>

                <div className="text">
                    <article>
                        <p>잘못된 페이지입니다.</p>
                        <button onClick={goHome}>홈으로 가기</button>
                    </article>
                </div>

            </div>
        </section>
    </div>
  );
};

export default NotFound;
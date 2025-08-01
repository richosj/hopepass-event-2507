import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import './Roulette.scss'

const Popup = ({ type = 'info', img, onClose }) => {
  const handleClick = () => {
    if (type === 'success') {
      window.open('https://naver.me/xoQtcIHD', '_blank')
    }
    onClose()
  }

  return (
    
    <div className={`popup ${type}`}>
      <div className="popup-inner">
        <img src={img} alt="" />
        <button onClick={handleClick}>확인</button>
      </div>
    </div>
  )
}

const Roulette = () => {
  const [ticket, setTicket] = useState('')
  const [loading, setLoading] = useState(false)
  const [rotDeg, setRotDeg] = useState(0)
  const [popup, setPopup] = useState(null) // 팝업 상태 관리

  const wheelRef = useRef(null)

  const handleTicket = async () => {
    setLoading(true)
    setPopup(null)
  
    try {
      //const { data } = await axios.post('http://localhost:3000/api/spin', { code: ticket })
      const { data } = await axios.post(`${import.meta.env.VITE_API_BASE}/api/spin`, { code: ticket }, {
        withCredentials: true
      });
      
  
      if (!data.success) {
        if (data.reason === 'invalid') {
          setPopup({
            type: 'error',
            img: '/assets/popup/invalid.png',
          })
        } else if (data.reason === 'used') {
          setPopup({
            type: 'error',
            img: '/assets/popup/invalid.png',
          })
        } else {
          setPopup({
            type: 'error',
            img: '/assets/popup/invalid.png',
          })
        }
        return
      }
  
      spinToRank(data.rank)
      setTimeout(() => {
        setPopup({
          type: 'success',
          img: `/assets/popup/rank-${data.rank}.png`,
        })
        setTicket('')
      }, 5000)
  
    } catch (err) {
      setPopup({
        type: 'error',
        img: '/assets/popup/invalid.png',
      })
    } finally {
      setLoading(false)
    }
  }
  

  const spinToRank = (rank) => {
    const degPerSegment = 360 / 5
    const stopDeg = (rank - 1) * degPerSegment
    const fullRotations = 8 * 360
    const totalDeg = fullRotations - stopDeg

    const wheel = wheelRef.current
    wheel.style.transition = 'none'
    wheel.style.transform = `rotate(0deg)`

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        wheel.style.transition = 'transform 4s ease-out'
        wheel.style.transform = `rotate(${totalDeg}deg)`
      })
    })
  }
  const closePopup = () => setPopup(null)


  
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('476cb5899651b46c8bcd17c9a7af4fc0');
    }

    window.Kakao.Share.createDefaultButton({
      container: '#kakao-share-btn',
      objectType: 'feed',
      content: {
        title: '희망패스 희망On드로우 이벤트',
        description: '희망패스 꽝 없는 룰렛 참여하기 이벤트에 오신것을 환영합니다.',
        imageUrl: 'https://heemangpass.co.kr/kakao.jpg',
        link: {
          mobileWebUrl: 'https://heemangpass.co.kr',
          webUrl: 'https://heemangpass.co.kr',
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: 'https://heemangpass.co.kr',
            webUrl: 'https://heemangpass.co.kr',
          },
        },
      ],
    });
  }, []);

  
  const handleShare = async () => {
    const env = detectEnvironment();
    const url = 'https://heemangpass.co.kr';
  
    if (navigator.share) {
      try {
        await navigator.share({
          title: '희망패스 희망On드로우 이벤트',
          text: '희망패스 꽝 없는 룰렛 참여하기 이벤트에 오신것을 환영합니다.',
          url,
        });
        console.log('공유 성공');
      } catch (err) {
        console.warn('공유 실패', err);
      }
    } else {
      if (env.isWindows) {
        alert('Chrome 최신 버전 또는 모바일 기기에서 공유 기능을 이용해 주세요.');
      } else if (env.isMac && env.isSafari) {
        alert('Safari는 공유 기능을 지원하지만, 현재 사용 중인 버전에서는 제한이 있을 수 있습니다.');
      } else if (env.isMac) {
        alert('macOS에서는 Safari 브라우저에서만 공유 기능이 정상적으로 작동합니다.');
      } else {
        alert('현재 환경에서는 공유 기능이 지원되지 않습니다.');
      }
      
      try {
        await navigator.clipboard.writeText(url);
        alert(`공유할 링크가 복사되었습니다:\n${url}`);
      } catch {
        alert(`링크 복사에 실패했습니다. 아래 링크를 수동으로 복사해 주세요:\n${url}`);
      }
    }
  };
  
  const detectEnvironment = () => {
    const ua = navigator.userAgent.toLowerCase();
    return {
      isWindows: navigator.platform.startsWith('Win'),
      isMac: navigator.platform.startsWith('Mac'),
      isAndroid: ua.includes('android'),
      isIOS: /iphone|ipad|ipod/.test(ua),
      isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
      isChrome: ua.includes('chrome') && !ua.includes('edg'),
      isEdge: ua.includes('edg'),
      isFirefox: ua.includes('firefox'),
    };
  };


  return (
    <>
      {popup && (
        <Popup
          type={popup.type}
          img={popup.img}
          onClose={closePopup}
        />
      )}

      <div className="roulette">
        <div className="roulette-inner">
          <div className="roulette-title">
            <h2>
              <img className='pc' src="/assets/roulette/roulette-title.png" alt="" />
              <img className='mobile' src="/assets/roulette/roulette-title-mobile.png" alt="" />
            </h2>
          </div>
          <div className="roulette-input">
            <div className="input-mobile mobile"><img src="/assets/roulette/input.png" alt="" /></div>
            <input
              value={ticket}
              onChange={e => setTicket(e.target.value)}
              maxLength={12}
              placeholder="응모권 번호 12자리를 입력해주세요."
            />
            <button onClick={handleTicket} disabled={loading}>
              룰렛 돌리기
            </button>
          </div>

          <div className="wheel">
            <div className="pointer">
              <img src="/assets/roulette/pointer.png" alt="" className='pc' />
              <img src="/assets/roulette/pointer-mobile.png" alt="" className='mobile' />
            </div>
            <div
              className="wheel-inner"
              ref={wheelRef}
              style={{ transform: `rotate(${rotDeg}deg)` }}
            >
              <img src="/assets/roulette/wheel.png" alt=""
               />
            </div>
          </div>
          <div className="wheel-text">
            <div className="pc"><img src="/assets/roulette/txt-pc.png" alt="" /></div>
            <div className="mobile"><img src="/assets/roulette/txt-mobile.png" alt="" /></div>
          </div>

          
        <div className="footer__share">
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https://heemangpass.co.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="facebook"
          >
            <img src="/assets/icon/facebook.png" alt="" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="instar"
          >
            <img src="/assets/icon/instar.png" alt="" />
          </a>
          
          <button className='kakao' id="kakao-share-btn">
            <img src="/assets/icon/kakao.png" alt="" />
          </button>
          <button className='share' onClick={handleShare}>
            <img src="/assets/icon/share.png" alt="" />
          </button>
        </div>


          <div className="deco deco-1"><img src="/assets/roulette/deco-1.png" alt="" /></div>
          <div className="deco deco-2"><img src="/assets/roulette/deco-2.png" alt="" /></div>
          <div className="deco deco-3"><img src="/assets/roulette/deco-3.png" alt="" /></div>
          <div className="deco deco-4"><img src="/assets/roulette/deco-4.png" alt="" /></div>
          <div className="deco deco-5"><img src="/assets/roulette/deco-5.png" alt="" /></div>
        </div>
      </div>
    </>
  )
}

export default Roulette;

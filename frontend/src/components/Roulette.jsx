import axios from 'axios'
import React, { useRef, useState } from 'react'
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
      const { data } = await axios.post('http://localhost:3000/api/spin', { code: ticket })
  
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
            img: '/assets/popup/error.png',
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
        img: '/assets/popup/error.png',
      })
    } finally {
      setLoading(false)
    }
  }
  

  const spinToRank = (rank) => {
    const baseDegPerSegment = 360 / 5
    const segmentIndex = rank - 1
    const stopDeg = 360 - (segmentIndex * baseDegPerSegment)
    const fullRotations = 8 * 360 // 8바퀴

    const totalDeg = fullRotations + stopDeg

    setRotDeg(prev => prev + totalDeg)

    
  }

  const closePopup = () => setPopup(null)

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

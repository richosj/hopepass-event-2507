import axios from 'axios'
import React, { useRef, useState } from 'react'
import './Event.scss'

const Event = () => {
  const [ticket, setTicket] = useState('')
  const [valid, setValid] = useState(null)
  const [usedBefore, setUsedBefore] = useState(false)
  const [usedAfter, setUsedAfter] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [prizeRank, setPrizeRank] = useState(null)
  const [rotDeg, setRotDeg] = useState(0)

  const wheelRef = useRef(null)

  const handleTicket = async () => {
    setLoading(true)
    setError(null)
    setValid(null)
    setUsedBefore(false)
    setUsedAfter(false)
    setPrizeRank(null)

    try {
      const { data } = await axios.post('http://localhost:3000/api/spin', { code: ticket })
      const rank = data.rank

      setValid(true)
      setUsedAfter(true)
      setPrizeRank(rank)

      spinToRank(rank)
    } catch (err) {
      if (err.response?.status === 404) {
        setValid(false)
      } else if (err.response?.data?.message === 'already used') {
        setValid(true)
        setUsedBefore(true)
      } else {
        setError(err.response?.data?.message || err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const spinToRank = (rank) => {
    const baseDegPerSegment = 360 / 5
    const segmentIndex = rank - 1
    const targetDeg = 360 * 5 + (360 - segmentIndex * baseDegPerSegment)  // 5바퀴 돌고 해당 등수 위치에 멈춤

    setRotDeg(targetDeg)
  }

  return (
    <div className="event">
      <input
        value={ticket}
        onChange={e => setTicket(e.target.value)}
        maxLength={12}
        placeholder="응모권 번호 12자리를 입력해주세요."
      />
      <button onClick={handleTicket} disabled={loading}>
        {loading ? '검증 중…' : '룰렛 돌리는 중…'}
      </button>

      <div className="pointer"></div>
      <div
        className="wheel"
        ref={wheelRef}
        style={{ transform: `rotate(${rotDeg}deg)` }}
      >
        {[1, 2, 3, 4, 5].map((rank, i) => {
          const rotate = (i * 72)  // 360/5
          return (
            <div
              key={rank}
              className="segment"
              style={{ transform: `rotate(${rotate}deg)` }}
            >
              {rank}
            </div>
          )
        })}
      </div>

      {valid === false && <p className="error">유효하지 않은 번호야</p>}
      {valid && usedBefore && <p className="error">이미 사용된 번호야</p>}
      {usedAfter && <p className="success">🎉 {prizeRank}등 당첨! 코드 사용 처리 완료!</p>}
      {error && <p className="error">에러: {error}</p>}
    </div>
  )
}

export default Event

import axios from 'axios'
import React, { useState } from 'react'
import './Event.scss'

const Event = () => {
  const [ticket, setTicket] = useState('')
  const [valid, setValid] = useState(null)      // true | false
  const [usedBefore, setUsedBefore] = useState(false)
  const [usedAfter, setUsedAfter] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [counts, setCounts] = useState({1:0,2:0,3:0,4:0,5:0});

  const spinWheel = (counts) => {
    return new Promise(resolve => {
      
      const baseProb = { 1: 0.1, 2: 2, 3: 5, 4: 10, 5: 82.9 }
      const limits   = { 1: 1, 2: 2, 3: 5, 4: 20 }
      let redistribute = 0
      let total = 0
      const probs = {}

      for (let rank = 1; rank <= 4; rank++) {
        if ((counts[rank] || 0) >= limits[rank]) {
          probs[rank] = 0
          redistribute += baseProb[rank]
        } else {
          probs[rank] = baseProb[rank]
          total += baseProb[rank]
        }
      }

      probs[5] = baseProb[5] + redistribute
      total += probs[5]

      const rand = Math.random() * total
      let cum = 0
      for (let rank = 1; rank <= 5; rank++) {
        cum += probs[rank]
        if (rand <= cum) {
          resolve(rank)
          console.log(rank)
          return
        }
      }
      resolve(5)
    })
  }


  const handleTicket = async () => {
    setLoading(true)
    setError(null)
    setValid(null)
    setUsedBefore(false)
    setUsedAfter(false)

    try {
      const { data: { valid, used } } = await axios.post(
        'http://localhost:3000/api/verify',
        { code: ticket }
      )
      setValid(valid)
      setUsedBefore(used)
      if (!valid || used) return

      // 룰렛 스핀
      await spinWheel()
      // 사용 처리
      await axios.post('http://localhost:3000/api/mark-used', { code: ticket })
      setUsedAfter(true)
    } catch (err) {
      if (err.response?.status === 404) {
        // 404 → 유효하지 않은 번호
        setValid(false)
      } else {
        setError(err.response?.data?.message || err.message)
      }
    } finally {
      setLoading(false)
    }
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
        {loading ? '검증 중…' : '룰렛 돌리기'}
      </button>

      <button onClick={spinWheel}>룰렛 돌리기</button>
      

      {valid === false && <p className="error">유효하지 않은 번호야</p>}
      {valid && usedBefore && <p className="error">이미 사용된 번호야</p>}
      {valid && !usedBefore && loading && <p className="success">룰렛 돌리는 중…</p>}
      {usedAfter && <p className="success">룰렛 완료! 코드 사용 처리했어.</p>}
      {error && <p className="error">에러: {error}</p>}
    </div>
  )
}

export default Event

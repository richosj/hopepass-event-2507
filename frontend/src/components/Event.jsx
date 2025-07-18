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

  const spinWheel = () =>
    new Promise(resolve => {
      console.log('spinWheel')
      // 룰렛 애니메이션 끝나면 resolve()
      resolve()
    })

  const handleTicket = async () => {
    // if (ticket.length !== 12) {
    //   setValid(false)
    //   return
    // }
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

      {valid === false && <p className="error">유효하지 않은 번호야</p>}
      {valid && usedBefore && <p className="error">이미 사용된 번호야</p>}
      {valid && !usedBefore && loading && <p className="success">룰렛 돌리는 중…</p>}
      {usedAfter && <p className="success">룰렛 완료! 코드 사용 처리했어.</p>}
      {error && <p className="error">에러: {error}</p>}
    </div>
  )
}

export default Event

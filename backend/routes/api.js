const express = require('express')
const router = express.Router()
const db = require('../models/db')

// 룰렛 확률
const baseProb = { 1: 0.1, 2: 2, 3: 5, 4: 10, 5: 82.9 }
const limits = { 1: 1, 2: 2, 3: 5, 4: 20 }

router.post('/spin', async (req, res) => {
  const { code } = req.body
  const client = await db.connect()

  try {
    await client.query('BEGIN')

    const result = await client.query(
      'SELECT * FROM event_codes WHERE code = $1 FOR UPDATE',
      [code]
    )
    const row = result.rows[0]

    // ✅ 코드 없음 → 404 ❌ → 200으로 보내기
    if (!row) {
      await client.query('ROLLBACK')
      return res.json({ success: false, reason: 'invalid' })  // 🔥 여기 고침
    }

    // ✅ 이미 사용됨 → 400 ❌ → 200으로 보내기
    if (row.is_used) {
      await client.query('ROLLBACK')
      return res.json({ success: false, reason: 'used' })  // 🔥 여기 고침
    }

    // 등수별 사용 수
    const countResult = await client.query(`
      SELECT prize_type, COUNT(*) as count
      FROM event_codes
      WHERE is_used = true
      GROUP BY prize_type
    `)
    const usedCounts = { 1: 0, 2: 0, 3: 0, 4: 0 }
    countResult.rows.forEach(r => {
      const rank = parseInt(r.prize_type, 10)
      if (rank >= 1 && rank <= 4) {
        usedCounts[rank] = parseInt(r.count, 10)
      }
    })

    // 확률 계산
    let total = 0
    let redistribute = 0
    const probs = {}

    for (let rank = 1; rank <= 4; rank++) {
      if (usedCounts[rank] >= limits[rank]) {
        probs[rank] = 0
        redistribute += baseProb[rank]
      } else {
        probs[rank] = baseProb[rank]
        total += baseProb[rank]
      }
    }

    probs[5] = baseProb[5] + redistribute
    total += probs[5]

    // 룰렛 결과
    const rand = Math.random() * total
    let cum = 0
    let chosenRank = 5

    for (let rank = 1; rank <= 5; rank++) {
      cum += probs[rank]
      if (rand <= cum) {
        chosenRank = rank
        break
      }
    }

    // 응모권 사용 처리 + 당첨 등수 기록
    await client.query(
      `UPDATE event_codes
       SET is_used = true, used_at = NOW(), prize_type = $1
       WHERE code = $2`,
      [chosenRank, code]
    )

    await client.query('COMMIT')
    res.json({ success: true, rank: chosenRank })
  } catch (err) {
    await client.query('ROLLBACK')
    console.error(err)
    res.status(500).json({ message: 'internal error' })
  } finally {
    client.release()
  }
})

module.exports = router

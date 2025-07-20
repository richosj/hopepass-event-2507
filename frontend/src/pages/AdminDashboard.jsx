// src/pages/AdminDashboard.jsx
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AdminDashboard = () => {
  const [codes, setCodes] = useState([])
  const [page, setPage] = useState(1)
  const [limit] = useState(20)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState({ code: '', used: '', rank: '' })
  const [stats, setStats] = useState({ ranks: {}, used: 0, unused: 0 })
  const [assignName, setAssignName] = useState({})

  const fetchCodes = async () => {
    try {
      const params = { ...filters, page, limit }
      const { data } = await axios.get('/admin/codes', { params })
      setCodes(data.data)
      setTotal(data.total)
      setStats(data.stats)
    } catch (err) {
      console.error('관리자 데이터 로딩 실패', err)
    }
  }

  const handleAssign = async (id) => {
    if (!assignName[id]) return
    try {
      await axios.post(`/admin/assign`, { id, name: assignName[id] })
      setAssignName(prev => ({ ...prev, [id]: '' }))
      fetchCodes()
    } catch (err) {
      alert('할당 실패')
    }
  }

  useEffect(() => { fetchCodes() }, [page, filters])

  const handleChange = e => setFilters({ ...filters, [e.target.name]: e.target.value })

  const totalPages = Math.ceil(total / limit)
  const maxPagesToShow = 10
  const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2))
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🎯 난수 코드 관리자</h2>

      {/* 필터 */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          name="code"
          value={filters.code}
          onChange={handleChange}
          placeholder="코드 검색"
        />
        <select name="used" onChange={handleChange} value={filters.used}>
          <option value="">사용여부 전체</option>
          <option value="true">✅ 사용</option>
          <option value="false">❌ 미사용</option>
        </select>
        <select name="rank" onChange={handleChange} value={filters.rank}>
          <option value="">등수 전체</option>
          {[1, 2, 3, 4, 5].map(r => (
            <option key={r} value={r}>{r}등</option>
          ))}
        </select>
      </div>

      {/* 통계 */}
      <div style={{ marginBottom: '1rem' }}>
        <strong>총 사용됨:</strong> {stats.used} / <strong>미사용:</strong> {stats.unused}
        <div>
          {Object.entries(stats.ranks).map(([rank, count]) => (
            <span key={rank} style={{ marginRight: 10 }}>{rank}등: {count}</span>
          ))}
        </div>
      </div>

      {/* 코드 목록 */}
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>코드</th>
            <th>등수</th>
            <th>사용여부</th>
            <th>사용자</th>
            <th>사용일시</th>
            <th>할당</th>
          </tr>
        </thead>
        <tbody>
          {codes.map(code => (
            <tr key={code.id}>
              <td>{code.id}</td>
              <td>{code.code}</td>
              <td>{code.prize_type || '-'}</td>
              <td>{code.is_used ? '✅' : '❌'}</td>
              <td>{code.assigned_to || '-'}</td>
              <td>{code.used_at ? new Date(code.used_at).toLocaleString() : '-'}</td>
              <td>
                {!code.assigned_to && (
                  <div>
                    <input
                      type="text"
                      value={assignName[code.id] || ''}
                      onChange={e => setAssignName({ ...assignName, [code.id]: e.target.value })}
                      placeholder="이름 입력"
                    />
                    <button onClick={() => handleAssign(code.id)}>할당</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이징 */}
      <div style={{ marginTop: '1rem' }}>
        {startPage > 1 && <button onClick={() => setPage(1)}>{'<<'}</button>}
        {startPage > 1 && <button onClick={() => setPage(page - 1)}>{'<'}</button>}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            disabled={p === page}
            style={{ marginRight: 5 }}
          >
            {p}
          </button>
        ))}
        {endPage < totalPages && <button onClick={() => setPage(page + 1)}>{'>'}</button>}
        {endPage < totalPages && <button onClick={() => setPage(totalPages)}>{'>>'}</button>}
      </div>
    </div>
  )
}

export default AdminDashboard

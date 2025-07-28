// src/pages/AdminDashboard.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../admin-bootstrap.scss';


const AdminDashboard = () => {
  const [codes, setCodes] = useState([])
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState({ code: '', used: '', rank: '' })
  const [stats, setStats] = useState({ ranks: {}, used: 0, unused: 0 })
  const [assignName, setAssignName] = useState({})

  const fetchCodes = async () => {
    try {
      const params = { ...filters, page, limit }
      const { data } = await axios.get('/admin/codes', { params, withCredentials: true })
      setCodes(data.data)
      setTotal(data.total)
      setStats(data.stats)
    } catch (err) {
      console.error('관리자 데이터 로딩 실패', err)
  
      if (err.response?.status === 401) {
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.')
        window.location.href = '/admin/login'
      }
    }
  }

  const handleAssign = async (id) => {
    if (!assignName[id]) return
    try {
      await axios.post(`/admin/assign`, { id, name: assignName[id] })
      setAssignName(prev => ({ ...prev, [id]: '' }))
      fetchCodes()
    } catch (err) {
      console.error('할당 실패:', err)
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
    <>
    <div className='admin-scope'>
      <div className="container-fluid">
        <div className="row">
          {/* <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
            
          </div> */}
          <div className="container">
            <div className="px-md-4">
              <div className="admin-header">
                <h2>난수 코드 관리자</h2>
                <button
                  className="btn btn-outline-danger"
                  onClick={async () => {
                    await axios.post('/admin/logout', {}, { withCredentials: true }) // ✅ 쿠키 포함해서 요청
                    localStorage.removeItem('adminLoggedIn');
                    localStorage.removeItem('adminLoginTime');
                    window.location.href = '/admin/login';
                  }}
                >
                  로그아웃
                </button>

              </div>

              {/* 통계 */}
            <div className='alert alert-primary'>
              <strong>총 사용됨:</strong> {stats.used} / <strong>미사용:</strong> {stats.unused}
              <div>
                {Object.entries(stats.ranks).map(([rank, count]) => (
                  <span key={rank} style={{ marginRight: 10 }}>{rank}등: {count}</span>
                ))}
              </div>
            </div>


              <div className='pb-3'>
                <div className="input-group">
                  <select className="form-select" name="used" onChange={handleChange} value={filters.used}>
                    <option value="">사용여부 전체</option>
                    <option value="true">사용</option>
                    <option value="false">미사용</option>
                  </select>
                  <select className="form-select" name="rank" onChange={handleChange} value={filters.rank}>
                    <option value="">등수 전체</option>
                    {[1, 2, 3, 4, 5].map(r => (
                      <option key={r} value={r}>{r}등</option>
                    ))}
                  </select>
                  <input
                    className="form-control"
                    name="code"
                    value={filters.code}
                    onChange={handleChange}
                    placeholder="코드 검색"
                  />
                </div>
                
              </div>

            
            {/* 코드 목록 */}
            <table className="table table-bordered">
              <thead>
                <tr className="table-secondary">
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
                    <td>
                      {code.prize_type ? (
                        <span className="badge badge-info">{code.prize_type}등</span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>
                      <span className={`badge ${code.is_used ? 'badge-success' : 'badge-warning'}`}>
                        {code.is_used ? '사용' : '미사용'}
                      </span>
                    </td>
                    <td>{code.assigned_to || '-'}</td>
                    <td>{code.used_at ? new Date(code.used_at).toLocaleString() : '-'}</td>
                    <td>
                      
                        <div className='input-group w-100'>
                        <input
                          type="text"
                          className='form-control'
                          value={assignName[code.id] ?? code.assigned_to ?? ''}
                          onChange={e => setAssignName({ ...assignName, [code.id]: e.target.value })}
                          placeholder="이름 입력"
                        />
                        <button
                          className='btn btn-secondary'
                          onClick={() => handleAssign(code.id)}
                          disabled={
                            assignName[code.id] === undefined || assignName[code.id] === code.assigned_to
                          }
                        >
                          {code.assigned_to ? '수정' : '할당'}
                        </button>
                      </div>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 페이징 */}
            <nav className="d-flex justify-content-center pt-5">
              <ul className="pagination">
              {startPage > 1 && <li className="page-item"><button className="page-link" onClick={() => setPage(1)}>{'처음'}</button></li>}
              {startPage > 1 && <li className="page-item"><button className="page-link" onClick={() => setPage(page - 1)}>{'이전'}</button></li>}
              {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(p => (
                <li className="page-item" key={p}>
                <button
                  className={`page-link ${p === page ? 'active' : ''}`}
                  key={p}
                  onClick={() => setPage(p)}
                  disabled={p === page}
                >
                  {p}
                </button></li>
              ))}
              {endPage < totalPages && <li className="page-item"><button className="page-link" onClick={() => setPage(page + 1)}>{'다음'}</button></li>}
              {endPage < totalPages && <li className="page-item"><button className="page-link" onClick={() => setPage(totalPages)}>{'끝'}</button></li>}
              </ul>
            </nav>

            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AdminDashboard

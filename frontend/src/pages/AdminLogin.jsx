import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('🔑 로그인 시도:', id, pw)

    if (id === 'admin' && pw === '1234') {
      console.log('✅ 로그인 성공')
      localStorage.setItem('adminLoggedIn', 'true')
      navigate('/admin/dashboard')
    } else {
      console.log('❌ 로그인 실패')
      alert('ID: admin / PW: 1234 로 입력해')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="password"
        placeholder="PW"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <button type="submit">로그인</button>
    </form>
  )
}

export default AdminLogin

import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
  const [checking, setChecking] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    axios
      .get('/admin/codes', { withCredentials: true }) // 인증 필요 API 요청
      .then(() => setAuthorized(true))
      .catch(() => setAuthorized(false))
      .finally(() => setChecking(false))
  }, [])

  if (checking) return null
  return authorized ? children : <Navigate to="/admin/login" />
}

export default AdminRoute

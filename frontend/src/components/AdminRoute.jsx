import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true'
  return isLoggedIn ? children : <Navigate to="/admin/login" />
}

export default AdminRoute

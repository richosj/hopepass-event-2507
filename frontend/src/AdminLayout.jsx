import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';

const AdminLayout = () => {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AdminLayout;

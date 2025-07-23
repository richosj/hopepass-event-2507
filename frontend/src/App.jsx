import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import MainLayout from './MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
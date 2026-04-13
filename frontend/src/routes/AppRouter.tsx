import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LoginPage from '../pages/login/LoginPage';
import RecoveryPage from '../pages/recovery/RecoveryPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import LogsPage from '../pages/logs/LogsPage';
import UsersPage from '../pages/users/UsersPage';
import SectorsPage from '../pages/sectors/SectorsPage';
 
const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/recovery" element={<RecoveryPage />} />

      {/* Private Routes (Wrapped in MainLayout) */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/logs" element={<LogsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/sectors" element={<SectorsPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;

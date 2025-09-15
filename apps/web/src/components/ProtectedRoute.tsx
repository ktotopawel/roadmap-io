import type { ReactElement } from 'react';
import { useAppSelector } from '../store/hooks.ts';
import { Navigate, Outlet } from 'react-router-dom';
import AppRoutes from '../config/constants/AppRoutes.ts';

const ProtectedRoute = (): ReactElement => {
  const isLoggedIn = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isLoggedIn) {
    return <Navigate to={AppRoutes.LOGIN} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

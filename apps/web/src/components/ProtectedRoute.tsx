import type { ReactElement, ReactNode } from 'react';
import { useAppSelector } from '../store/hooks.ts';
import { Navigate } from 'react-router-dom';
import AppRoutes from '../config/constants/AppRoutes.ts';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps): ReactElement => {
  const isLoggedIn = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isLoggedIn) {
    return <Navigate to={AppRoutes.LOGIN} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

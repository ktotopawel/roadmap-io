import Test from './pages/Test';
import { Route, Routes } from 'react-router-dom';
import type { ReactElement } from 'react';
import LoginPage from './pages/Auth/LoginPage.tsx';
import AppRoutes from './config/constants/AppRoutes.ts';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import appRoutes from './config/constants/AppRoutes.ts';

const Router = (): ReactElement => {
  return (
    <Routes>
      <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path={appRoutes.TEST} element={<Test />} />
      </Route>
    </Routes>
  );
};

export default Router;

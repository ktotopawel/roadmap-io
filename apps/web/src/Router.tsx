import Test from './pages/Test';
import { Route, Routes } from 'react-router-dom';
import type { ReactElement } from 'react';
import LoginPage from './pages/Auth/LoginPage.tsx';
import AppRoutes from './config/constants/AppRoutes.ts';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import HomePage from './pages/Home/HomePage.tsx';
import MagicLinkHandler from './pages/Auth/MagicLinkHandler.tsx';

const Router = (): ReactElement => {
  return (
    <Routes>
      <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
      <Route path={AppRoutes.MAGIC_LINK} element={<MagicLinkHandler />} />
      <Route element={<ProtectedRoute />}>
        <Route path={AppRoutes.TEST} element={<Test />} />
        <Route path={AppRoutes.HOME} element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default Router;

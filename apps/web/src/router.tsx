import { createBrowserRouter } from 'react-router-dom';
import AppRoutes from './config/constants/AppRoutes.ts';
import LoginPage from './pages/Auth/LoginPage.tsx';
import MagicLinkHandler from './pages/Auth/MagicLinkHandler.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import MainLayout from './pages/MainLayout.tsx';
import HomePage from './pages/Home/HomePage.tsx';
import Test from './pages/Test.tsx';

const router = createBrowserRouter([
  { path: AppRoutes.LOGIN, element: <LoginPage /> },
  { path: AppRoutes.MAGIC_LINK, element: <MagicLinkHandler /> },
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: AppRoutes.HOME, element: <HomePage /> },
      { path: AppRoutes.TEST, element: <Test /> },
    ],
  },
]);

export default router;

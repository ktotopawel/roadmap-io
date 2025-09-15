import Test from './pages/Test';
import { Route, Routes } from 'react-router-dom';
import type { ReactElement } from 'react';
import LoginPage from './pages/Auth/LoginPage.tsx';

const Router = (): ReactElement => {
  return (
    <Routes>
      <Route path="/test" element={<Test />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default Router;

import Test from './pages/Test';
import { Route, Routes } from 'react-router-dom';
import type { ReactElement } from 'react';

const Router = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Test />} />
    </Routes>
  );
};

export default Router;

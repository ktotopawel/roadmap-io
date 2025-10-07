import NavBar from '../components/NavBar.tsx';
import { Outlet } from 'react-router-dom';
import type { ReactElement } from 'react';

const MainLayout = (): ReactElement => {
  return (
    <div className={'bg-neutral-900 max-w-screen min-h-screen p-2'}>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

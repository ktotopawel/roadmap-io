import NavBar from '../components/NavBar.tsx';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <NavBar></NavBar>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;

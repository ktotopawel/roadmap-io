import Router from './Router';
import NavBar from './components/NavBar.tsx';
import type { ReactElement } from 'react';

function App(): ReactElement {
  return (
    <div className={'bg-black/90 min-h-screen text-white'}>
      <NavBar />
      <Router></Router>
    </div>
  );
}

export default App;

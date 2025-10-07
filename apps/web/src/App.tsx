import Router from './router.tsx';
import type { ReactElement } from 'react';

function App(): ReactElement {
  return (
    <div className={'bg-black/90 min-h-screen text-white'}>
      <Router></Router>
    </div>
  );
}

export default App;

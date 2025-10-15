import type { ReactElement } from 'react';
import RoadmapList from './RoadmapList.tsx';

const HomePage = (): ReactElement => {
  return (
    <div className={'pt-4 grid grid-cols-2 gap-4'}>
      <RoadmapList />
    </div>
  );
};

export default HomePage;

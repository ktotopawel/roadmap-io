import { type ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import StatusEnum from '../../config/Status.enum.ts';
import { fetchRoadmapList } from '../../store/slices/roadmaps.slice.ts';
import { CircleNotchIcon, XCircleIcon } from '@phosphor-icons/react';
import RoadmapListEntry from './components/RoadmapListEntry.tsx';

const RoadmapList = (): ReactElement => {
  const dispatch = useAppDispatch();

  const roadmapList = useAppSelector((state) => state.roadmaps.roadmapsList);
  const isLoading = useAppSelector((state) => state.roadmaps.status === StatusEnum.LOADING);

  useEffect(() => {
    void dispatch(fetchRoadmapList());
  }, [dispatch]);

  return (
    <div className={'text-white'}>
      {isLoading && (
        <div className="">
          <CircleNotchIcon className={'animate-spin'} />
          <p>Loading...</p>
        </div>
      )}
      {!isLoading && roadmapList && roadmapList.length !== 0 ? (
        roadmapList.map((r) => (
          <RoadmapListEntry
            title={r.title}
            description={r.description}
            complexity={r.relativeComplexity}
            progress={r.progress}
            key={r.id}
          />
        ))
      ) : (
        <div className="">
          <XCircleIcon className={'fill-red-500'} />
          <p>No roadmaps available.</p>
        </div>
      )}
    </div>
  );
};

export default RoadmapList;
